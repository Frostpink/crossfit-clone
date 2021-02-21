CREATE TABLE IF NOT EXISTS athletes (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(200),
    date_of_birth DATE,
    gender VARCHAR(30),
    height NUMERIC(4, 1),
    weight NUMERIC(4, 1)
);
