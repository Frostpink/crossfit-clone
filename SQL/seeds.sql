BEGIN;

-- ATHLETES
INSERT INTO athletes (name, date_of_birth, gender, height, weight, nationality) 
VALUES 
    ('Sansone Donaway',  '2000-05-24', 'male',       171.4,  89.6, 'Canada'    ),
    ('Milissent Prazer', '1999-02-26', 'female',     155.4,  69.0, 'Canada'    ),
    ('Kippy Toman',      '1991-04-03', 'female',     154.1,  73.5, 'États-Unis'),
    ('Garvy Eakens',     '1999-01-03', 'male',       168.5,  96.1, 'France'    ),
    ('Scotti Sleford',   '1995-08-02', 'male',       179.2,  99.6, 'États-Unis'),
    ('Nicolis Brickham', '1977-02-12', 'non-binary', 178.4,  80.1, 'Canada'    ),
    ('Rolfe Pigram',     '1986-03-07', 'male',       175.5,  75.0, 'Canada'    );

-- LOGINS
INSERT INTO logins (athlete_id, email, password)
SELECT (select id from athletes where name = 'Milissent Prazer'), 'mprazer@mefit.ca', 'goodpassword';

INSERT INTO logins (athlete_id, email, password)
SELECT id, 'sdonaway@mefit.ca', 'random-password'
FROM athletes WHERE name = 'Sansone Donaway';

-- ADDRESSES
INSERT INTO addresses (street_number, street, city, postal_code, province)
VALUES ('4493', 'Bayfield St', 'Richmond Hill', 'L4C3Y2', 'Ontario'),
       ('1495', 'Main St', 'Moosomin', 'S0G3N0', 'Saskatchewan');

-- CONTACT PERSONS
INSERT INTO contact_persons (name, email, phone)
VALUES ('Jeff Fotti', 'jfotti@rush.ca', '111-222-3333'),
	   ('Andrew Forward', 'aforward@mefit.ca', '434-111-1234');

-- PARTNERS
WITH contact AS (
	SELECT id
	FROM contact_persons
	WHERE name = 'Jeff Fotti'
), address AS (
  	SELECT id
  	FROM addresses
  	WHERE street_number = '1495' 
  		and street = 'Main St' 
  		and city = 'Moosomin' 
  		and postal_code = 'S0G3N0' 
  		and province = 'Saskatchewan'
)
INSERT INTO partners (name, contact_person_id, address_id)
SELECT 'Crossfit Rush', contact.id, address.id
FROM contact CROSS JOIN address;

-- COMPETITIONS
WITH partner AS (
  	SELECT contact_person_id, address_id, id
  	FROM partners
  	WHERE name = 'Crossfit Rush'
)
INSERT INTO competitions (name, start_date, end_date, amount_events, contact_person_id, address_id, partner_id)
SELECT 'Mars Competition 2021', '2021-03-13', '2021-03-13', 2, *
FROM partner;

WITH partner AS (
  	SELECT contact_person_id, address_id, id
  	FROM partners
  	WHERE name = 'Crossfit Rush'
)
INSERT INTO competitions (name, start_date, end_date, amount_events, contact_person_id, address_id, partner_id)
SELECT 'Mai Competition 2021', '2021-05-13', '2021-05-14', 2, *
FROM partner;

-- REGISTRATIONS
WITH athlete AS (
 	SELECT id
  	FROM athletes
  	WHERE name = 'Sansone Donaway'
), competition AS (
 	SELECT id
  	FROM competitions
  	WHERE name = 'Mars Competition 2021'
)
INSERT INTO registrations (competition_id, athlete_id)
SELECT competition.id, athlete.id
from athlete CROSS JOIN competition;

WITH athlete AS (
 	SELECT id
  	FROM athletes
  	WHERE name = 'Milissent Prazer'
), competition AS (
 	SELECT id
  	FROM competitions
  	WHERE name = 'Mars Competition 2021'
)
INSERT INTO registrations (competition_id, athlete_id)
SELECT competition.id, athlete.id
from athlete CROSS JOIN competition;

-- EVENTS
WITH competition AS (
  	SELECT id
  	FROM competitions
  	WHERE name = 'Mars Competition 2021'
)
INSERT INTO events (competition_id, name)
SELECT competition.id, '10 km run'
FROM competition;

-- RESULTS
WITH event AS (
  	SELECT competition_id, name 
  	FROM events
  	WHERE name = '10 km run'
  		AND competition_id = (SELECT id FROM competitions WHERE competitions.name = 'Mars Competition 2021')
), athlete AS (
  	SELECT athlete_id
  	FROM participants
  	WHERE competition_id = (select competition_id from event)
  		AND athlete_name = 'Milissent Prazer'
)
INSERT INTO results (competition_id, event_name, athlete_id, time)
SELECT event.competition_id, event.name, athlete.athlete_id, 5
FROM event CROSS JOIN athlete;

-- CAPACITY
WITH competition AS (
  	SELECT id as competition_id
  	FROM competitions
  	WHERE name = 'Mars Competition 2021'
)
INSERT INTO capacity (competition_id, gender, capacity)
SELECT *, 'female', 2
FROM competition;

WITH competition AS (
  	SELECT id as competition_id
  	FROM competitions
  	WHERE name = 'Mars Competition 2021'
)
INSERT INTO capacity (competition_id, gender, capacity)
SELECT *, 'male', 3
FROM competition;

-- REGISTER (WITH CAPACITY CHECK)
WITH competition AS (
  	SELECT id AS competition_id
  	FROM competitions
  	WHERE name = 'Mars Competition 2021'
), athlete AS (
  	SELECT id AS athlete_id, gender
  	FROM athletes
  	WHERE name = 'Kippy Toman'
), cap AS ( -- get capacity for certain competition/gender
  	SELECT capacity
  	FROM capacity 
  	WHERE competition_id = (SELECT competition_id FROM competition)
  		AND gender = (SELECT gender FROM athlete)
), amount AS ( -- get amount of participants in a competition (based on gender)
  	SELECT count(athlete_id) AS amount
  	FROM participants
  	INNER JOIN athletes ON athletes.id = participants.athlete_id
  	WHERE competition_id = (SELECT competition_id FROM competition)
  		AND gender = (SELECT gender FROM athlete)
)
INSERT INTO registrations (competition_id, athlete_id)
SELECT competition.competition_id, athlete.athlete_id
FROM competition CROSS JOIN athlete
WHERE (SELECT amount FROM amount) < (SELECT capacity FROM cap);






COMMIT;