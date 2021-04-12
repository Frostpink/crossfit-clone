BEGIN;


ALTER TABLE athletes
    RENAME COLUMN id TO athlete_id;


ALTER TABLE athletes
ALTER COLUMN identifier TYPE varchar(100),
    ALTER COLUMN identifier
SET DEFAULT md5(random()::text),
    ALTER COLUMN created
SET DEFAULT NOW(),
    ALTER COLUMN modified
SET DEFAULT NOW();


CREATE TABLE contact_persons (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    email varchar(100) UNIQUE NOT NULL,
    phone varchar(40) UNIQUE NOT NULL,
    UNIQUE (name, email, phone)
);


CREATE TABLE addresses (
    id serial PRIMARY KEY,
    street_number varchar(15),
    street varchar(50),
    city varchar(50),
    postal_code varchar(6),
    province varchar(30),
    UNIQUE (
        street_number,
        street,
        city,
        postal_code,
        province
    )
);


CREATE TABLE partners (
    id serial PRIMARY KEY,
    identifier varchar(100) UNIQUE NOT NULL DEFAULT md5(random()::text),
    name varchar(100),
    join_date date DEFAULT NOW(),
    contact_person_id integer NOT NULL REFERENCES contact_persons(id),
    address_id integer REFERENCES addresses(id),
    UNIQUE (name)
);


ALTER TABLE competitions
    RENAME COLUMN id TO competition_id;


ALTER TABLE competitions
ALTER COLUMN identifier TYPE varchar(100),
    ALTER COLUMN identifier
SET DEFAULT md5(random()::text),
    ALTER COLUMN created
SET DEFAULT NOW(),
    ALTER COLUMN modified
SET DEFAULT NOW(),
    ALTER COLUMN name
SET NOT NULL;


ALTER TABLE competitions
    RENAME COLUMN start_date_time TO start_date;


ALTER TABLE competitions
    RENAME COLUMN end_date_time TO end_date;


ALTER TABLE competitions
ADD COLUMN contact_person_id integer NOT NULL REFERENCES contact_persons(id),
    ADD COLUMN address_id integer NOT NULL REFERENCES addresses(id),
    ADD COLUMN partner_id integer NOT NULL REFERENCES partners(id);


CREATE TABLE capacity (
    competition_id integer REFERENCES competitions(competition_id),
    gender varchar(30),
    capacity integer,
    PRIMARY KEY (competition_id, gender)
);


ALTER TABLE registrations
ADD COLUMN registration_date date DEFAULT NOW();


CREATE TABLE workouts (
    id serial PRIMARY KEY,
    name text NOT NULL,
    score text NOT NULL,
    secondary_score text,
    tie_break text,
    secondary_tie_break text,
    description text,
    time_cap text,
    UNIQUE (name)
);


CREATE TABLE movements (
    id serial PRIMARY KEY,
    name text NOT NULL,
    TYPE text,
    cap text,
    UNIQUE (name, TYPE, cap)
);


CREATE TABLE workout_movements (
    workout_id integer REFERENCES workouts(id),
    movement_id integer REFERENCES movements(id),
    sequence_number integer NOT NULL,
    PRIMARY KEY (workout_id, movement_id)
);


CREATE TABLE EVENTS (
    competition_id integer NOT NULL,
    event_name varchar(100) NOT NULL,
    workout_id integer,
    PRIMARY KEY (competition_id, event_name),
    FOREIGN KEY (competition_id) REFERENCES competitions(competition_id),
    FOREIGN KEY (workout_id) REFERENCES workouts(id)
);


CREATE TABLE results (
    athlete_id integer NOT NULL,
    event_name varchar(100) NOT NULL,
    competition_id integer NOT NULL,
    score text,
    secondary_score text,
    tie_break text,
    secondary_tie_break text,
    PRIMARY KEY (competition_id, event_name, athlete_id),
    FOREIGN KEY (competition_id) REFERENCES athletes(athlete_id),
    FOREIGN KEY (competition_id, event_name) REFERENCES EVENTS(competition_id, event_name)
);


CREATE VIEW participants AS
SELECT competition_id,
    competitions.name competition_name,
    athlete_id,
    athletes.name athlete_name
FROM competitions
    INNER JOIN registrations USING(competition_id)
    INNER JOIN athletes USING(athlete_id);


CREATE VIEW workouts_full AS
SELECT workouts.id workout_id,
    workouts.name workout_name,
    score,
    secondary_score,
    tie_break,
    secondary_tie_break,
    movements.id movement_id,
    movements.name movement_name,
    TYPE,
    cap,
    sequence_number
FROM workouts
    LEFT JOIN workout_movements ON workouts.id = workout_movements.workout_id
    LEFT JOIN movements ON movements.id = workout_movements.movement_id
ORDER BY workouts.id,
    sequence_number;


CREATE VIEW scores AS
SELECT competition_name,
    competition_id,
    event_name,
    athlete_name,
    athlete_id,
    rank () over (
        PARTITION by competition_id,
        event_name
        ORDER BY results.score IS NULL,
            CASE
                WHEN workouts.score LIKE '%DESC%' THEN results.score
            END DESC,
            CASE
                WHEN workouts.score LIKE '%ASC%' THEN results.score
            END ASC,
            CASE
                WHEN results.score IS NULL
                AND workouts.secondary_score LIKE '%DESC%' THEN results.secondary_score
            END DESC,
            CASE
                WHEN results.score IS NULL
                AND workouts.secondary_score LIKE '%ASC%' THEN results.secondary_score
            END ASC
    ),
    results.score result_score,
    workouts.score workout_score,
    results.secondary_score result_secondary_score,
    workouts.secondary_score workout_secondary_score
FROM participants
    FULL JOIN EVENTS USING(competition_id)
    FULL JOIN results USING(athlete_id, event_name, competition_id)
    INNER JOIN workouts ON workouts.id = workout_id;


CREATE VIEW leaderboard AS WITH result AS (
    SELECT competition_name,
        competition_id,
        athlete_name,
        athlete_id,
        rank
    FROM scores
),
board AS (
    SELECT competition_id,
        athlete_id,
        sum(rank) AS points
    FROM result
    GROUP BY competition_id,
        athlete_id
    ORDER BY points ASC
)
SELECT competition_name,
    competition_id,
    rank () over (
        PARTITION by competition_id
        ORDER BY points ASC
    ),
    athlete_id,
    athlete_name,
    points
FROM board
    INNER JOIN participants USING(athlete_id, competition_id)
ORDER BY competition_name ASC,
    rank ASC;


COMMIT;