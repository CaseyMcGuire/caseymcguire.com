-- atlas:import users.sql

-- create "workout" table
CREATE TABLE "workout" (
  "id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "description" text NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);
