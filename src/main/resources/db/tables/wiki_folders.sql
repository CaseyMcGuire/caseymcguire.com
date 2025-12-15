-- atlas:import wikis.sql

-- create "wiki_folders" table
CREATE TABLE "wiki_folders" (
  "id" serial NOT NULL,
  "name" text NOT NULL,
  "display_order" text NOT NULL,
  "wiki_id" integer NOT NULL,
  "parent_folder_id" integer NULL,
  "is_root" boolean NOT NULL DEFAULT false,
  PRIMARY KEY ("id"),
  CONSTRAINT "wiki_folders_wiki_id_id_unique" UNIQUE ("wiki_id", "id"),
  CONSTRAINT "fk_wiki_folders_parent_folder_id__id" FOREIGN KEY ("parent_folder_id") REFERENCES "wiki_folders" ("id") ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT "fk_wiki_folders_wiki_id__id" FOREIGN KEY ("wiki_id") REFERENCES "wikis" ("id") ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT "wiki_folders_root_parent_consistency" CHECK (((is_root = true) AND (parent_folder_id IS NULL)) OR ((is_root = false) AND (parent_folder_id IS NOT NULL)))
);
-- create index "uq_wiki_root_folder" to table: "wiki_folders"
CREATE UNIQUE INDEX "uq_wiki_root_folder" ON "wiki_folders" ("wiki_id") WHERE (is_root = true);
