// backend/src/api/server.js
import http from 'node:http';
import { applyReadiness } from '../autoreg/engine.js';
import { DEFAULT_WORKOUTS } from '../data/defaultWorkouts.js';
import { createRepository } from '../db/repository.js';
import { getLiveAppHtml } from '../ui/liveAppHtml.js';

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(payload));
}

export function createAppServer(initialWorkouts = DEFAULT_WORKOUTS, options = {}) {
  const repo = createRepository({
    initialWorkouts,
    databaseUrl: options.databaseUrl ?? process.env.DATABASE_URL,
    persistFilePath: options.persistFilePath ?? null,
  });

  const server = http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      res.end();
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/app')) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(getLiveAppHtml());
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/health') {
      const lastBjj = await repo.getLatestBjjSession();
      const sets = await repo.listSetLogs();
      sendJson(res, 200, {
        status: 'ok',
        service: 'bjj-hybrid-node-api',
        storage: process.env.DATABASE_URL ? 'postgresql' : 'local-persistent',
        bjj_sessions_logged: lastBjj ? 1 : 0,
        sets_logged: sets.length,
      });
      return;
    }

    // GET /api/workouts -> returns all 3 workouts (A, B, C) with readiness applied
    if (req.method === 'GET' && url.pathname === '/api/workouts') {
      const lastBjj = await repo.getLatestBjjSession();
      const workoutA = await repo.getWorkoutByCode('A');
      const workoutB = await repo.getWorkoutByCode('B');
      const workoutC = await repo.getWorkoutByCode('C');

      const planA = applyReadiness(workoutA, lastBjj);
      const planB = applyReadiness(workoutB, lastBjj);
      const planC = applyReadiness(workoutC, lastBjj);

      sendJson(res, 200, {
        readiness_summary: planA.readiness_summary,
        last_bjj_session: lastBjj,
        workouts: {
          A: planA.workout,
          B: planB.workout,
          C: planC.workout,
        },
      });
      return;
    }

    // GET /api/workouts/:code/readiness
    const readinessMatch = url.pathname.match(/^\/api\/workouts\/([a-zA-Z])\/readiness$/);
    if (req.method === 'GET' && readinessMatch) {
      const code = readinessMatch[1].toUpperCase();
      const workout = await repo.getWorkoutByCode(code);
      if (!workout) {
        sendJson(res, 404, { error: 'Workout not found' });
        return;
      }
      const lastBjj = await repo.getLatestBjjSession();
      const plan = applyReadiness(workout, lastBjj);
      sendJson(res, 200, {
        ...plan,
        last_bjj_session: lastBjj,
      });
      return;
    }

    // POST, GET & DELETE /api/bjj-sessions
    if (url.pathname === '/api/bjj-sessions') {
      if (req.method === 'POST') {
        try {
          const body = await readJsonBody(req);
          const record = await repo.createBjjSession(body);
          sendJson(res, 201, record);
        } catch {
          sendJson(res, 400, { error: 'Invalid JSON payload' });
        }
        return;
      }

      if (req.method === 'GET') {
        const list = await repo.listBjjSessions();
        sendJson(res, 200, list);
        return;
      }

      if (req.method === 'DELETE') {
        await repo.resetAll();
        sendJson(res, 200, { cleared: true });
        return;
      }
    }

    // POST & GET /api/sets
    if (url.pathname === '/api/sets') {
      if (req.method === 'POST') {
        try {
          const body = await readJsonBody(req);
          const savedSet = await repo.createSetLog(body);
          sendJson(res, 201, { saved: true, set: savedSet });
        } catch {
          sendJson(res, 400, { error: 'Invalid JSON payload' });
        }
        return;
      }

      if (req.method === 'GET') {
        const sets = await repo.listSetLogs();
        sendJson(res, 200, sets);
        return;
      }
    }

    sendJson(res, 404, { error: 'Route not found' });
  });

  server.on('close', () => {
    repo.close().catch(() => {});
  });

  return server;
}
