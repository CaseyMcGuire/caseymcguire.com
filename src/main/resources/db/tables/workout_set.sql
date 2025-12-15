-- atlas:import exercise.sql
-- atlas:import workout.sql

-- create "workout_set" table
CREATE TABLE "workout_set" (
  "id" serial NOT NULL,
  "workout_id" integer NOT NULL,
  "description" text NULL,
  "exercise_type" text NOT NULL,
  "num_reps" integer NOT NULL,
  "weight" integer NOT NULL,
  "unit_of_mass" character varying(50) NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL,
  "exercise_id" integer NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_exercise" FOREIGN KEY ("exercise_id") REFERENCES "exercise" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "fk_workout" FOREIGN KEY ("workout_id") REFERENCES "workout" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);
