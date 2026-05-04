-- add column "conversation_id" to table: "ai_chat"
ALTER TABLE "ai_chat" ADD COLUMN "conversation_id" uuid NOT NULL;
-- create index "ai_chat_conversation_id_key" to table: "ai_chat"
ALTER TABLE "ai_chat" ADD CONSTRAINT "ai_chat_conversation_id_key" UNIQUE ("conversation_id");