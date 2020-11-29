CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  is_admin BOOLEAN,
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

CREATE TABLE IF NOT EXISTS user_roles (
  user_role_id SERIAL PRIMARY KEY,
  user_id INTEGER,
  role varchar(45) NOT NULL,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);