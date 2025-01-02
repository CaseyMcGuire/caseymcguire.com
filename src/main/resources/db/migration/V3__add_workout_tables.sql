CREATE TABLE IF NOT EXISTS workout (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS workout_set (
  id SERIAL PRIMARY KEY,
  workout_id INTEGER NOT NULL,
  description TEXT,
  exercise_type TEXT NOT NULL,
  num_reps INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  unit_of_mass VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  CONSTRAINT fk_workout FOREIGN KEY (workout_id) REFERENCES workout (id)
);