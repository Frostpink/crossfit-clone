-- this migration update competitions.id to serial integer

UPDATE competitions SET identifier = id;



-- drop constraint on registrations
ALTER TABLE registrations
DROP CONSTRAINT fk_competition;

-- rename old fk
ALTER TABLE registrations
RENAME COLUMN competition_id TO old_competition_id;

-- add new fk
ALTER TABLE registrations
ADD COLUMN competition_id integer;



CREATE SEQUENCE competition_id;

-- set id default
ALTER TABLE competitions
ALTER COLUMN id SET DEFAULT nextval('competition_id');

-- set id values & type
ALTER TABLE competitions
ALTER COLUMN id TYPE integer USING nextval('competition_id');


-- set new constraint of registrations
ALTER TABLE registrations
ADD CONSTRAINT fk_competition 
FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE;

-- link registrations to id
UPDATE registrations r
SET competition_id = c.id
FROM competitions c
WHERE r.old_competition_id = c.identifier;

-- remove old fk
ALTER TABLE registrations
DROP COLUMN old_competition_id;


-- set competition_id in registrations to not null
ALTER TABLE registrations
ALTER COLUMN competition_id SET NOT NULL;