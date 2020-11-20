CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL UNIQUE,
  is_admin BOOLEAN,
  password VARCHAR(60) NOT NULL,
  email TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS posts (
  id serial NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  title TEXT,
  contents TEXT,
  PRIMARY KEY (id),
  CONSTRAINT fk_id FOREIGN KEY (user_id) REFERENCES users (id)
);