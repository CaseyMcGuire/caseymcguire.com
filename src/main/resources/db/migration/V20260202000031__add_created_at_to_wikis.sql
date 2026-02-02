-- modify "wikis" table
ALTER TABLE "wikis" ADD COLUMN "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
