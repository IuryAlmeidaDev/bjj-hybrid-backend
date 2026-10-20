CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE workouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    tag VARCHAR(50) NOT NULL,
    day_of_week INT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
    slug VARCHAR(60) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    target_muscle VARCHAR(100) NOT NULL,
    default_sets INT NOT NULL DEFAULT 4,
    reps_range VARCHAR(30) NOT NULL,
    rest_seconds INT NOT NULL DEFAULT 90,
    video_url TEXT NOT NULL,
    bjj_benefit TEXT NOT NULL,
    sort_order INT NOT NULL
);

CREATE TABLE exercise_alternatives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    tier VARCHAR(1) NOT NULL CHECK (tier IN ('B', 'C')),
    name VARCHAR(100) NOT NULL,
    equipment VARCHAR(50) NOT NULL,
    reason_to_use TEXT NOT NULL,
    video_url TEXT NOT NULL
);

CREATE TABLE workout_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    fatigue_level_before INT NOT NULL DEFAULT 0
);

CREATE TABLE session_sets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES workout_sessions(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    chosen_alternative_id UUID REFERENCES exercise_alternatives(id) ON DELETE SET NULL,
    set_number INT NOT NULL,
    weight_kg NUMERIC(6,2) NOT NULL,
    reps_done INT NOT NULL,
    rir INT NOT NULL DEFAULT 2
);

CREATE TABLE bjj_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_date DATE NOT NULL DEFAULT CURRENT_DATE,
    rounds_count INT NOT NULL,
    round_duration_min INT NOT NULL DEFAULT 6,
    rpe_intensity INT NOT NULL CHECK (rpe_intensity BETWEEN 1 AND 10),
    body_stress_tags TEXT[] NOT NULL DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE optimized_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    generation_number INT NOT NULL,
    fitness_score NUMERIC(8,4) NOT NULL,
    plan_payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_exercises_workout ON exercises(workout_id, sort_order);
CREATE INDEX idx_alternatives_exercise ON exercise_alternatives(exercise_id);
CREATE INDEX idx_bjj_sessions_user_date ON bjj_sessions(user_id, session_date DESC);
