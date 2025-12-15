-- create "users" table
CREATE TABLE "users" (
  "id" serial NOT NULL,
  "role" character varying(45) NULL,
  "password" character varying(60) NOT NULL,
  "email" text NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "users_email_key" UNIQUE ("email")
);
