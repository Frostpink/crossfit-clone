CREATE SEQUENCE IF NOT EXISTS competition_id;
CREATE SEQUENCE IF NOT EXISTS athlete_id;

CREATE TABLE IF NOT EXISTS athletes (
    id integer PRIMARY KEY DEFAULT nextval('athlete_id'),
    name VARCHAR(200),
    date_of_birth DATE,
    gender VARCHAR(30),
    height NUMERIC(4, 1),
    weight NUMERIC(4, 1),
    identifier VARCHAR(20) UNIQUE NOT NULL,
    created DATE,
    modified DATE,
    nationality VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS competitions (
    id integer PRIMARY KEY DEFAULT nextval('competition_id'),
    name VARCHAR(200),
    venue VARCHAR(200),
    identifier VARCHAR(20) UNIQUE NOT NULL,
    start_date_time DATE,
    end_date_time DATE,
    created DATE,
    modified DATE
);

CREATE TABLE IF NOT EXISTS registrations (
    competition_id INTEGER,
    athlete_id INTEGER,
    PRIMARY KEY (competition_id, athlete_id),
    CONSTRAINT fk_competition FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE,
    CONSTRAINT fk_athlete FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE
);
