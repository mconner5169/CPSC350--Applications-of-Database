DROP DATABASE workshop2;

CREATE DATABASE workshop2;
\c workshop2

CREATE TABLE users (
	username TEXT PRIMARY KEY,
	firstname TEXT,
	lastname TEXT,
	email TEXT
);

CREATE TABLE workshops (
	title TEXT,
	date TEXT,
	location TEXT,
	maxseats NUMERIC,
	instructor TEXT,
	PRIMARY KEY (title, date, location)
);

CREATE TABLE linking (
	id serial PRIMARY KEY,
	title TEXT,
	date TEXT,
	location TEXT,
	maxseats NUMERIC,
	instructor TEXT,
	username TEXT,
	FOREIGN KEY (title, date, location) references workshops (title, date, location),
	FOREIGN KEY (username) references users (username)
);
GRANT SELECT, INSERT, DELETE ON users to workshop2;
GRANT SELECT, INSERT, DELETE ON workshops to workshop2;
GRANT SELECT, INSERT, DELETE ON linking to workshop2;
GRANT SELECT, USAGE, UPDATE ON linking_id_seq to workshop2;
--4vvdpgmk
