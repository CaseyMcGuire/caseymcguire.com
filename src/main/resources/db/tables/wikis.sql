-- create "wikis" table
CREATE TABLE "wikis" (
  "id" serial NOT NULL,
  "name" text NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "wikis_name_unique" UNIQUE ("name")
);
