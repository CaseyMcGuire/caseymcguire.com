-- atlas:import users.sql
-- atlas:import wikis.sql

-- create "wiki_users" table
CREATE TABLE "wiki_users" (
  "id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "wiki_id" integer NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "wiki_users_user_id_wiki_id_unique" UNIQUE ("user_id", "wiki_id"),
  CONSTRAINT "fk_wiki_users_user_id__id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT "fk_wiki_users_wiki_id__id" FOREIGN KEY ("wiki_id") REFERENCES "wikis" ("id") ON UPDATE RESTRICT ON DELETE RESTRICT
);
