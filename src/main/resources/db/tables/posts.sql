-- atlas:import users.sql

-- create "posts" table
CREATE TABLE "posts" (
  "id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "title" text NULL,
  "contents" text NULL,
  "published_date" date NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);
