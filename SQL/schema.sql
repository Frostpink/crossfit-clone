BEGIN;

CREATE SEQUENCE IF NOT EXISTS competition_id;
CREATE SEQUENCE IF NOT EXISTS athlete_id;

CREATE TABLE IF NOT EXISTS athletes (
    id integer PRIMARY KEY DEFAULT nextval('athlete_id'),
    identifier VARCHAR(100) UNIQUE NOT NULL DEFAULT md5(random()::text),
    created DATE,
    modified DATE,
    name VARCHAR(200),
    date_of_birth DATE,
    gender VARCHAR(30),
    height NUMERIC(4, 1),
    weight NUMERIC(4, 1),
    nationality VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS stats (
    athlete_id INTEGER PRIMARY KEY REFERENCES athletes(id)
);

CREATE TABLE IF NOT EXISTS logins (
    athlete_id INTEGER PRIMARY KEY REFERENCES athletes(id),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_persons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(40) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS addresses (
    id SERIAL PRIMARY KEY,
    street_number VARCHAR(15),
    street VARCHAR(50),
    city VARCHAR(50),
    postal_code VARCHAR(6),
    province VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    identifier VARCHAR(100) UNIQUE NOT NULL DEFAULT md5(random()::text),
    name VARCHAR(100),
    join_date DATE DEFAULT NOW(),
    contact_person_id INTEGER NOT NULL REFERENCES contact_persons(id),
    address_id INTEGER REFERENCES addresses(id)
);

CREATE TABLE IF NOT EXISTS competitions (
    id integer PRIMARY KEY DEFAULT nextval('competition_id'),
    identifier VARCHAR(100) UNIQUE NOT NULL DEFAULT md5(random()::text),
    created DATE DEFAULT NOW(),
    modified DATE DEFAULT NOW(), 
    name VARCHAR(200),
    start_date DATE,
    end_date DATE,
    amount_events INTEGER,
    contact_person_id INTEGER NOT NULL REFERENCES contact_persons(id),
    address_id INTEGER NOT NULL REFERENCES addresses(id),
    partner_id INTEGER NOT NULL REFERENCES partners(id)
);

CREATE TABLE IF NOT EXISTS capacity (
    competition_id INTEGER REFERENCES competitions(id),
    gender VARCHAR(30),
    capacity INTEGER,
    PRIMARY KEY (competition_id, gender, capacity)
);

CREATE TABLE IF NOT EXISTS registrations (
    competition_id INTEGER,
    athlete_id INTEGER,
    PRIMARY KEY (competition_id, athlete_id),
    CONSTRAINT fk_competition FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE,
    CONSTRAINT fk_athlete FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS events (
    competition_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    score VARCHAR(100),
    tie_breaker VARCHAR(100),
    PRIMARY KEY (competition_id, name),
    FOREIGN KEY (competition_id) REFERENCES competitions(id)
);

CREATE TABLE IF NOT EXISTS results (
    competition_id INTEGER NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    athlete_id INTEGER NOT NULL,
    time NUMERIC(6,2),
    reps INTEGER,
    weight NUMERIC(8,2),
    PRIMARY KEY (competition_id, event_name, athlete_id),
    FOREIGN KEY (athlete_id) REFERENCES athletes(id),
    FOREIGN KEY (competition_id, event_name) REFERENCES events(competition_id, name)
);






CREATE VIEW participants AS 
SELECT competitions.id as competition_id, competitions.name competition_name, athletes.id as athlete_id, athletes.name athlete_name
FROM competitions
INNER JOIN registrations on registrations.competition_id = competitions.id
INNER JOIN athletes on athletes.id = registrations.athlete_id;


COMMIT;