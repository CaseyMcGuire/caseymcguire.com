-- create enum type "ai_chat_message_role"
CREATE TYPE "ai_chat_message_role" AS ENUM ('user', 'assistant', 'system', 'tool');
-- create "ai_chat" table
CREATE TABLE "ai_chat" (
  "id" bigserial NOT NULL,
  "title" text NOT NULL,
  "user_id" integer NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_chat_user_id__id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);
-- create index "ai_chat_user_id_updated_at_idx" to table: "ai_chat"
CREATE INDEX "ai_chat_user_id_updated_at_idx" ON "ai_chat" ("user_id", "updated_at" DESC);
-- create "ai_chat_message" table
CREATE TABLE "ai_chat_message" (
  "id" bigserial NOT NULL,
  "chat_id" bigint NOT NULL,
  "message_index" integer NOT NULL,
  "role" "ai_chat_message_role" NOT NULL,
  "content" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  CONSTRAINT "ai_chat_message_chat_id_message_index_unique" UNIQUE ("chat_id", "message_index"),
  CONSTRAINT "ai_chat_message_chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "ai_chat" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);
