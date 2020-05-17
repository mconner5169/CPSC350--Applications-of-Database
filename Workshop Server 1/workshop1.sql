DROP DATABASE workshop1;

CREATE DATABASE workshop1;
\c workshop1

CREATE TABLE attendees (
	id serial PRIMARY KEY,
	attendee TEXT NOT NULL,
	workshop TEXT
);

INSERT INTO attendees (attendee, workshop) VALUES 
	('Ahmed Abdelali', 'Self-Driving Cars'),
	('Clara Weick', 'Machine Learning'),
	('James Archer', 'Modern Javascript'),
	('Linda Park', 'MongoDB'),
	('Roz Billingsley', 'Self-Driving Cars');
GRANT SELECT, INSERT ON attendees to workshop1;
GRANT USAGE on attendees_id_seq to workshop1;
--kmqzx9Un