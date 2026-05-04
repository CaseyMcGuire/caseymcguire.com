-- atlas:import ai_chat.sql

CREATE TYPE ai_chat_message_role AS ENUM ('user', 'assistant', 'system', 'tool');

CREATE TABLE ai_chat_message (
  id bigserial PRIMARY KEY,
  chat_id bigint NOT NULL,
  role ai_chat_message_role NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT ai_chat_message_chat_id_fk FOREIGN KEY (chat_id) REFERENCES ai_chat (id) ON DELETE CASCADE
);
CREATE INDEX ai_chat_message_chat_id_id_idx ON ai_chat_message (chat_id, id);
