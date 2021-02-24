-- this migration update athletes.id to serial integer

UPDATE athletes SET identifier = id;



-- drop constraint on registrations
ALTER TABLE registrations
DROP CONSTRAINT fk_athlete;

-- rename old fk
ALTER TABLE registrations
RENAME COLUMN athlete_id TO old_athlete_id;

-- add new fk
ALTER TABLE registrations
ADD COLUMN athlete_id integer NOT NULL;



CREATE SEQUENCE athlete_id;

-- set id default
ALTER TABLE athletes
ALTER COLUMN id SET DEFAULT nextval('athlete_id');

-- set id values & type
ALTER TABLE athletes
ALTER COLUMN id TYPE integer USING nextval('athlete_id');


-- set new constraint of registrations
ALTER TABLE registrations
ADD CONSTRAINT fk_athlete 
FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE;

-- link registrations to id
UPDATE registrations r
SET athlete_id = a.id
FROM athletes a
WHERE r.old_athlete_id = a.identifier;

-- remove old fk
ALTER TABLE registrations
DROP COLUMN old_athlete_id;


-- set athlete_id in athletes to not null
ALTER TABLE registrations
ALTER COLUMN athlete_id SET NOT NULL;