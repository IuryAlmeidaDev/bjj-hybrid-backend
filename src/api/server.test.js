// backend/src/api/server.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createAppServer } from './server.js';

test('POST /api/bjj-sessions adjusts subsequent GET /api/workouts/A/readiness', async () => {
  const server = createAppServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    // 1. Log intense BJJ roll (RPE 9, shoulder tag)
    const postRes = await fetch(`${baseUrl}/api/bjj-sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rounds_count: 5,
        rpe_intensity: 9,
        body_stress_tags: ['ombro'],
      }),
    });
    assert.equal(postRes.status, 201);

    // 2. Fetch Workout A readiness
    const getRes = await fetch(`${baseUrl}/api/workouts/A/readiness`);
    assert.equal(getRes.status, 200);
    const plan = await getRes.json();

    assert.equal(plan.workout.exercises[0].adjusted_sets, 3);
    const supinoReto = plan.workout.exercises.find((e) => e.slug === 'supino_reto');
    assert.equal(supinoReto.auto_swapped_to_tier, 'B');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
