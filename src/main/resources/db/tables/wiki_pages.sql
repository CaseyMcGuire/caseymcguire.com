-- atlas:import wiki_folders.sql
-- atlas:import wikis.sql

-- create "wiki_pages" table
CREATE TABLE "wiki_pages" (
  "id" serial NOT NULL,
  "wiki_id" integer NOT NULL,
  "parent_folder_fk_id" integer NOT NULL,
  "name" text NOT NULL,
  "content" text NOT NULL,
  "display_order" text NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_wiki_pages_parent_folder_fk_id__id" FOREIGN KEY ("parent_folder_fk_id") REFERENCES "wiki_folders" ("id") ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT "fk_wiki_pages_wiki_id__id" FOREIGN KEY ("wiki_id") REFERENCES "wikis" ("id") ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT "fk_wiki_pages_wiki_id_parent_folder_fk_id__wiki_id_id" FOREIGN KEY ("wiki_id", "parent_folder_fk_id") REFERENCES "wiki_folders" ("wiki_id", "id") ON UPDATE RESTRICT ON DELETE RESTRICT
);
