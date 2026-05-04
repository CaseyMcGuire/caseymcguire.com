-- drop unique constraint on (chat_id, message_index)
ALTER TABLE "ai_chat_message" DROP CONSTRAINT "ai_chat_message_chat_id_message_index_unique";
-- drop column "message_index" from table: "ai_chat_message"
ALTER TABLE "ai_chat_message" DROP COLUMN "message_index";
-- create index "ai_chat_message_chat_id_id_idx" to table: "ai_chat_message"
CREATE INDEX "ai_chat_message_chat_id_id_idx" ON "ai_chat_message" ("chat_id", "id");