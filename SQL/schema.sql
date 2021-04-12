BEGIN;

CREATE SEQUENCE IF NOT EXISTS competition_id;
CREATE SEQUENCE IF NOT EXISTS athlete_id;

CREATE TABLE athletes (
    athlete_id integer PRIMARY KEY DEFAULT nextval('athlete_id'),
    identifier VARCHAR(100) UNIQUE NOT NULL DEFAULT md5(random()::text),
    created DATE DEFAULT NOW(),
    modified DATE DEFAULT NOW(),
    name VARCHAR(200),
    date_of_birth DATE,
    gender VARCHAR(30),
    height NUMERIC(4, 1),
    weight NUMERIC(4, 1),
    nationality VARCHAR(100)
);

-- CREATE TABLE IF NOT EXISTS stats (
--     athlete_id INTEGER PRIMARY KEY REFERENCES athletes(id)
-- );

-- CREATE TABLE IF NOT EXISTS logins (
--     athlete_id INTEGER PRIMARY KEY REFERENCES athletes(id),
--     email VARCHAR(100) UNIQUE NOT NULL,
--     password VARCHAR(150) NOT NULL
-- );

CREATE TABLE contact_persons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(40) UNIQUE NOT NULL,
    UNIQUE (name, email, phone)
);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    street_number VARCHAR(15),
    street VARCHAR(50),
    city VARCHAR(50),
    postal_code VARCHAR(6),
    province VARCHAR(30),
    UNIQUE (street_number, street, city, postal_code, province)
);

CREATE TABLE partners (
    id SERIAL PRIMARY KEY,
    identifier VARCHAR(100) UNIQUE NOT NULL DEFAULT md5(random()::text),
    name VARCHAR(100),
    join_date DATE DEFAULT NOW(),
    contact_person_id INTEGER NOT NULL REFERENCES contact_persons(id),
    address_id INTEGER REFERENCES addresses(id),
    UNIQUE (name)
);

CREATE TABLE competitions (
    competition_id integer PRIMARY KEY DEFAULT nextval('competition_id'),
    identifier VARCHAR(100) UNIQUE NOT NULL DEFAULT md5(random()::text),
    created DATE DEFAULT NOW(),
    modified DATE DEFAULT NOW(), 
    name VARCHAR(200) not null,
    start_date DATE,
    end_date DATE,
    amount_events INTEGER,
    contact_person_id INTEGER NOT NULL REFERENCES contact_persons(id),
    address_id INTEGER NOT NULL REFERENCES addresses(id),
    partner_id INTEGER NOT NULL REFERENCES partners(id)
    -- unique (competition_id, name)
);

CREATE TABLE capacity (
    competition_id INTEGER REFERENCES competitions(competition_id),
    gender VARCHAR(30),
    capacity INTEGER,
    PRIMARY KEY (competition_id, gender)
);

CREATE TABLE registrations (
    competition_id INTEGER,
    athlete_id INTEGER,
    registration_date DATE DEFAULT NOW(),
    PRIMARY KEY (competition_id, athlete_id),
    CONSTRAINT fk_competition FOREIGN KEY (competition_id) REFERENCES competitions(competition_id) ON DELETE CASCADE,
    CONSTRAINT fk_athlete FOREIGN KEY (athlete_id) REFERENCES athletes(athlete_id) ON DELETE CASCADE
);

CREATE TABLE workouts (
    id SERIAL primary key,
    name TEXT NOT NULL,
    score TEXT NOT NULL,
    secondary_score TEXT,
    tie_break TEXT,
    secondary_tie_break TEXT,
    description TEXT,
    time_cap text,
    UNIQUE (name)
);

CREATE TABLE movements (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    cap TEXT,
    UNIQUE (name, type, cap)
);

CREATE TABLE workout_movements (
    workout_id INTEGER REFERENCES workouts(id),
    movement_id INTEGER REFERENCES movements(id),
    sequence_number INTEGER NOT NULL,
    PRIMARY KEY (workout_id, movement_id)
);

CREATE TABLE events (
    competition_id INTEGER NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    workout_id INTEGER,
    PRIMARY KEY (competition_id, event_name),
    FOREIGN KEY (competition_id) REFERENCES competitions(competition_id),
    FOREIGN KEY (workout_id) REFERENCES workouts(id)
);

CREATE TABLE results (
    athlete_id INTEGER NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    competition_id INTEGER NOT NULL,
    score TEXT,
    secondary_score TEXT,
    tie_break TEXT,
    secondary_tie_break TEXT,
    PRIMARY KEY (competition_id, event_name, athlete_id),
    FOREIGN KEY (athlete_id) REFERENCES athletes(athlete_id),
    FOREIGN KEY (competition_id, event_name) REFERENCES events(competition_id, event_name)
);




CREATE VIEW participants AS 
SELECT competition_id, competitions.name competition_name, athlete_id, athletes.name athlete_name
FROM competitions
INNER JOIN registrations USING(competition_id)
INNER JOIN athletes USING(athlete_id);


CREATE VIEW workouts_full AS
SELECT workouts.id workout_id, workouts.name workout_name, score, secondary_score, tie_break, secondary_tie_break, movements.id movement_id, movements.name movement_name, type, cap, sequence_number
FROM workouts
LEFT JOIN workout_movements ON workouts.id = workout_movements.workout_id
LEFT JOIN movements ON movements.id = workout_movements.movement_id
ORDER BY workouts.id, sequence_number;



create view scores as
  select competition_name,
    competition_id,
    event_name, 
    athlete_name, 
    athlete_id,
    rank () over (
      partition by competition_id, event_name
      order by results.score is null,
             case when workouts.score like '%DESC%' then results.score end desc,
             case when workouts.score like '%ASC%' then results.score end asc,
      		 case when results.score is null and workouts.secondary_score like '%DESC%' then results.secondary_score end desc,
             case when results.score is null and workouts.secondary_score like '%ASC%' then results.secondary_score end asc
    ),
    results.score result_score,
    workouts.score workout_score,
    results.secondary_score result_secondary_score,
    workouts.secondary_score workout_secondary_score
    from participants 
    full join events using(competition_id)
    full join results using(athlete_id, event_name, competition_id)
    inner join workouts on workouts.id = workout_id;


create view leaderboard as
  with result as (
  select competition_name, 
         competition_id,
         athlete_name, 
         athlete_id,
         rank
    from scores
  ), board as (
  select competition_name, 
         competition_id,
         athlete_name, 
         athlete_id,
         sum(rank) as points
  from result
  group by competition_id, athlete_id
  order by points asc
  )
  select competition_name,
         competition_id,
  		 rank () over (partition by competition_id order by points asc),
         athlete_name,
         athlete_id,
         points
  from board
  inner join participants using(athlete_id, competition_id)
  order by competition_name asc, rank asc
  ;


COMMIT;