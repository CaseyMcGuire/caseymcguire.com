-- atlas:import users.sql

CREATE TABLE ai_chat (
  id bigserial PRIMARY KEY,
  conversation_id uuid UNIQUE NOT NULL,
  title text NOT NULL,
  user_id integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_chat_user_id__id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE INDEX ai_chat_user_id_updated_at_idx ON ai_chat (user_id, updated_at DESC);
