CREATE TABLE IF NOT EXISTS exercise (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

ALTER TABLE workout_set
  ADD COLUMN exercise_id INTEGER,
  ADD CONSTRAINT fk_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id);