CREATE TABLE IF NOT EXISTS wikis (
  id   SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL
);

ALTER TABLE wikis
  ADD CONSTRAINT wikis_name_unique UNIQUE ("name");

CREATE TABLE IF NOT EXISTS wiki_folders (
  id               SERIAL PRIMARY KEY,
  "name"           TEXT NOT NULL,
  display_order    TEXT NOT NULL,
  wiki_id          INT  NOT NULL,
  parent_folder_id INT  NULL
);

ALTER TABLE wiki_folders
  ADD CONSTRAINT wiki_folders_wiki_id_id_unique UNIQUE (wiki_id, id);

CREATE TABLE IF NOT EXISTS wiki_pages (
  id                 SERIAL PRIMARY KEY,
  wiki_id            INT  NOT NULL,
  parent_folder_fk_id INT NULL,
  "name"             TEXT NOT NULL,
  "content"          TEXT NOT NULL,
  display_order      TEXT NOT NULL,
  created_at         TIMESTAMP NOT NULL,
  updated_at         TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS wiki_users (
  id      SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  wiki_id INT NOT NULL,
  CONSTRAINT fk_wiki_users_user_id__id
    FOREIGN KEY (user_id)
      REFERENCES users (id)
      ON DELETE RESTRICT
      ON UPDATE RESTRICT,
  CONSTRAINT fk_wiki_users_wiki_id__id
    FOREIGN KEY (wiki_id)
      REFERENCES wikis (id)
      ON DELETE RESTRICT
      ON UPDATE RESTRICT
);

ALTER TABLE wiki_users
  ADD CONSTRAINT wiki_users_user_id_wiki_id_unique UNIQUE (user_id, wiki_id);

ALTER TABLE wiki_folders
  ADD CONSTRAINT fk_wiki_folders_wiki_id__id
    FOREIGN KEY (wiki_id)
      REFERENCES wikis (id)
      ON DELETE RESTRICT
      ON UPDATE RESTRICT;

ALTER TABLE wiki_folders
  ADD CONSTRAINT fk_wiki_folders_parent_folder_id__id
    FOREIGN KEY (parent_folder_id)
      REFERENCES wiki_folders (id)
      ON DELETE RESTRICT
      ON UPDATE RESTRICT;

ALTER TABLE wiki_pages
  ADD CONSTRAINT fk_wiki_pages_wiki_id__id
    FOREIGN KEY (wiki_id)
      REFERENCES wikis (id)
      ON DELETE RESTRICT
      ON UPDATE RESTRICT;

ALTER TABLE wiki_pages
  ADD CONSTRAINT fk_wiki_pages_parent_folder_fk_id__id
    FOREIGN KEY (parent_folder_fk_id)
      REFERENCES wiki_folders (id)
      ON DELETE RESTRICT
      ON UPDATE RESTRICT;

ALTER TABLE wiki_pages
  ADD CONSTRAINT fk_wiki_pages_wiki_id_parent_folder_fk_id__wiki_id_id
    FOREIGN KEY (wiki_id, parent_folder_fk_id)
      REFERENCES wiki_folders (wiki_id, id)
      ON DELETE RESTRICT
      ON UPDATE RESTRICT;
