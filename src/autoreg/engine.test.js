// backend/src/autoreg/engine.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { applyReadiness } from './engine.js';
import { DEFAULT_WORKOUTS } from '../data/defaultWorkouts.js';

test('applyReadiness reduces first compound sets and locks RIR=2 when RPE >= 8', () => {
  const bjj = {
    rounds_count: 5,
    rpe_intensity: 9,
    body_stress_tags: [],
  };

  const plan = applyReadiness(DEFAULT_WORKOUTS.C, bjj);

  assert.equal(plan.workout.exercises[0].adjusted_sets, 3);
  assert.equal(plan.workout.exercises[0].recommended_rir, 2);
});

test('applyReadiness swaps RDL to Tier C when lombar stress tag is present', () => {
  const bjj = {
    rounds_count: 4,
    rpe_intensity: 7,
    body_stress_tags: ['lombar'],
  };

  const plan = applyReadiness(DEFAULT_WORKOUTS.C, bjj);
  const rdl = plan.workout.exercises.find((e) => e.slug === 'rdl_terra_romeno');

  assert.equal(rdl.auto_swapped_to_tier, 'C');
});
