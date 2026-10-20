// backend/src/db/repository.js
import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_WORKOUTS } from '../data/defaultWorkouts.js';

const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000001';

export function createRepository({
  databaseUrl = process.env.DATABASE_URL,
  persistFilePath = null,
  initialWorkouts = DEFAULT_WORKOUTS,
} = {}) {
  let pgPool = null;

  // Lazy load pg.Pool if databaseUrl is provided
  async function getPool() {
    if (!databaseUrl) return null;
    if (!pgPool) {
      const pg = await import('pg');
      const Pool = pg.default?.Pool || pg.Pool;
      pgPool = new Pool({ connectionString: databaseUrl });
    }
    return pgPool;
  }

  // Load initial local state (from file if configured, otherwise fresh memory)
  let localState = {
    workouts: structuredClone(initialWorkouts),
    bjjSessions: [],
    loggedSets: [],
  };

  if (persistFilePath && fs.existsSync(persistFilePath)) {
    try {
      const saved = JSON.parse(fs.readFileSync(persistFilePath, 'utf-8'));
      if (Array.isArray(saved.bjjSessions)) localState.bjjSessions = saved.bjjSessions;
      if (Array.isArray(saved.loggedSets)) localState.loggedSets = saved.loggedSets;
    } catch {
      // Ignore corrupt local cache
    }
  }

  function saveLocalState() {
    if (!persistFilePath) return;
    try {
      fs.mkdirSync(path.dirname(persistFilePath), { recursive: true });
      fs.writeFileSync(
        persistFilePath,
        JSON.stringify(
          {
            bjjSessions: localState.bjjSessions,
            loggedSets: localState.loggedSets,
          },
          null,
          2
        ),
        'utf-8'
      );
    } catch {
      // Non-fatal in read-only environments
    }
  }

  return {
    async getWorkoutByCode(code) {
      const pool = await getPool();
      if (pool) {
        try {
          const wRes = await pool.query('SELECT * FROM workouts WHERE code = $1 LIMIT 1', [code]);
          if (wRes.rows.length > 0) {
            const workout = wRes.rows[0];
            const exRes = await pool.query(
              'SELECT * FROM exercises WHERE workout_id = $1 ORDER BY sort_order ASC',
              [workout.id]
            );
            const exercises = [];
            for (const ex of exRes.rows) {
              const altRes = await pool.query(
                'SELECT * FROM exercise_alternatives WHERE exercise_id = $1 ORDER BY tier ASC',
                [ex.id]
              );
              exercises.push({
                ...ex,
                alternatives: altRes.rows,
              });
            }
            return { ...workout, exercises };
          }
        } catch {
          // Fallback to local seed if DB query fails
        }
      }
      return localState.workouts[code] || null;
    },

    async getLatestBjjSession() {
      const pool = await getPool();
      if (pool) {
        try {
          const res = await pool.query(
            'SELECT * FROM bjj_sessions ORDER BY created_at DESC LIMIT 1'
          );
          if (res.rows.length > 0) return res.rows[0];
        } catch {
          // Fallback to local state
        }
      }
      return localState.bjjSessions.length > 0
        ? localState.bjjSessions[localState.bjjSessions.length - 1]
        : null;
    },

    async listBjjSessions() {
      const pool = await getPool();
      if (pool) {
        try {
          const res = await pool.query(
            'SELECT * FROM bjj_sessions ORDER BY created_at DESC LIMIT 30'
          );
          return res.rows;
        } catch {
          // Fallback to local state
        }
      }
      return localState.bjjSessions;
    },

    async createBjjSession(payload) {
      const record = {
        id: `bjj_${Date.now()}`,
        user_id: DEFAULT_USER_ID,
        rounds_count: Number(payload.rounds_count || 0),
        round_duration_min: Number(payload.round_duration_min || 6),
        rpe_intensity: Number(payload.rpe_intensity || 5),
        body_stress_tags: Array.isArray(payload.body_stress_tags) ? payload.body_stress_tags : [],
        notes: payload.notes || '',
        created_at: new Date().toISOString(),
      };

      const pool = await getPool();
      if (pool) {
        try {
          const res = await pool.query(
            `INSERT INTO bjj_sessions (user_id, rounds_count, round_duration_min, rpe_intensity, body_stress_tags, notes)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [
              record.user_id,
              record.rounds_count,
              record.round_duration_min,
              record.rpe_intensity,
              record.body_stress_tags,
              record.notes,
            ]
          );
          if (res.rows.length > 0) {
            localState.bjjSessions.push(res.rows[0]);
            saveLocalState();
            return res.rows[0];
          }
        } catch {
          // Fallback to local state
        }
      }

      localState.bjjSessions.push(record);
      saveLocalState();
      return record;
    },

    async createSetLog(payload) {
      const setRecord = {
        id: `set_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        workout_code: payload.workout_code || 'A',
        exercise_id: payload.exercise_id,
        exercise_slug: payload.exercise_slug || '',
        chosen_tier: payload.chosen_tier || 'A',
        set_number: Number(payload.set_number || 1),
        weight_kg: Number(payload.weight_kg || 0),
        reps_done: Number(payload.reps_done || 0),
        rir: Number(payload.rir ?? 2),
        created_at: new Date().toISOString(),
      };

      localState.loggedSets.push(setRecord);
      saveLocalState();
      return setRecord;
    },

    async listSetLogs() {
      return localState.loggedSets;
    },

    async resetAll() {
      localState.bjjSessions = [];
      localState.loggedSets = [];
      saveLocalState();
    },

    async close() {
      if (pgPool) {
        await pgPool.end();
        pgPool = null;
      }
    },
  };
}
