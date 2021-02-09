CREATE TABLE IF NOT EXISTS competitions (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(200),
    venue VARCHAR(200),
    start_date_time DATE,
    end_date_time DATE
);

CREATE TABLE IF NOT EXISTS registrations (
    competition_id VARCHAR(20),
    athlete_id VARCHAR(20),
    PRIMARY KEY (competition_id, athlete_id),
    CONSTRAINT fk_competition FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE,
    CONSTRAINT fk_athlete FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE
);
