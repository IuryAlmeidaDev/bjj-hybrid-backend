// backend/src/api/server.js
import http from 'node:http';
import { applyReadiness } from '../autoreg/engine.js';
import { DEFAULT_WORKOUTS } from '../data/defaultWorkouts.js';

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
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(payload));
}

export function createAppServer(initialWorkouts = DEFAULT_WORKOUTS) {
  const state = {
    workouts: initialWorkouts,
    bjjSessions: [],
    loggedSets: [],
  };

  const server = http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      res.end();
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    if (req.method === 'GET' && url.pathname === '/api/health') {
      sendJson(res, 200, { status: 'ok', service: 'bjj-hybrid-node-api' });
      return;
    }

    // GET /api/workouts/:code/readiness
    const readinessMatch = url.pathname.match(/^\/api\/workouts\/([a-zA-Z])\/readiness$/);
    if (req.method === 'GET' && readinessMatch) {
      const code = readinessMatch[1].toUpperCase();
      const workout = state.workouts[code];
      if (!workout) {
        sendJson(res, 404, { error: 'Workout not found' });
        return;
      }
      const lastBjj =
        state.bjjSessions.length > 0
          ? state.bjjSessions[state.bjjSessions.length - 1]
          : null;
      const plan = applyReadiness(workout, lastBjj);
      sendJson(res, 200, plan);
      return;
    }

    // POST & GET /api/bjj-sessions
    if (url.pathname === '/api/bjj-sessions') {
      if (req.method === 'POST') {
        try {
          const body = await readJsonBody(req);
          const record = {
            id: `bjj_${Date.now()}`,
            rounds_count: Number(body.rounds_count || 0),
            round_duration_min: Number(body.round_duration_min || 6),
            rpe_intensity: Number(body.rpe_intensity || 5),
            body_stress_tags: Array.isArray(body.body_stress_tags) ? body.body_stress_tags : [],
            notes: body.notes || '',
            created_at: new Date().toISOString(),
          };
          state.bjjSessions.push(record);
          sendJson(res, 201, record);
        } catch (err) {
          sendJson(res, 400, { error: 'Invalid JSON payload' });
        }
        return;
      }

      if (req.method === 'GET') {
        sendJson(res, 200, state.bjjSessions);
        return;
      }
    }

    // POST /api/sets
    if (req.method === 'POST' && url.pathname === '/api/sets') {
      try {
        const body = await readJsonBody(req);
        state.loggedSets.push(body);
        sendJson(res, 201, { saved: true, set: body });
      } catch (err) {
        sendJson(res, 400, { error: 'Invalid JSON payload' });
      }
      return;
    }

    sendJson(res, 404, { error: 'Route not found' });
  });

  return server;
}
