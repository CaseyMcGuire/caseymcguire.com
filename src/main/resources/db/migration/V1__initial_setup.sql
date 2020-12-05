CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  role varchar(45),
  password VARCHAR(60) NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title TEXT,
  contents TEXT,
  CONSTRAINT fk_id FOREIGN KEY (user_id) REFERENCES users (id)
);