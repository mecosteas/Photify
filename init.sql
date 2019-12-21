/* Schema for photify.db */
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username varchar NOT NULL UNIQUE,
  email varchar NOT NULL UNIQUE,
  password varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS imageposts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title varchar NOT NULL,
  description varchar NOT NULL,
  fk_userid INTEGER NOT NULL,
  photopath varchar NOT NULL,
  FOREIGN KEY (fk_userid) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
  id INTEGER NOT NULL PRIMARY KEY,
  comment varchar NOT NULL,
  fk_postid INTEGER unsigned NOT NULL,
  fk_userid INTEGER unsigned NOT NULL,
  FOREIGN KEY (fk_postid) REFERENCES imageposts (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (fk_userid) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);
