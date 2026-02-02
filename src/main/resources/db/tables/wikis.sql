-- create "wikis" table
CREATE TABLE "wikis" (
  "id" serial NOT NULL,
  "name" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  CONSTRAINT "wikis_name_unique" UNIQUE ("name")
);
