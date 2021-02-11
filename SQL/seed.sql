INSERT INTO athletes (id, name, date_of_birth, gender, height, weight) 
VALUES 
    ('1', 'Sansone Donaway',  '2000-05-24', 'male',       171.4, 89.6),
    ('2', 'Milissent Prazer', '1999-02-26', 'female',     155.4, 69.0),
    ('3', 'Kippy Toman',      '1991-04-03', 'female',     154.1, 73.5),
    ('4', 'Garvy Eakens',     '1999-01-03', 'male',       168.5, 96.1),
    ('5', 'Scotti Sleford',   '1995-08-02', 'male',       179.2, 99.6),
    ('6', 'Nicolis Brickham', '1977-02-12', 'non-binary', 178.4, 80.1),
    ('7', 'Rolfe Pigram',     '1986-03-07', 'male',       175.5, 75.0);

INSERT INTO competitions (id, name, venue, start_date_time, end_date_time)
VALUES
    ('1', 'Competition mai', 'Ottawa', '2021-05-01', '2021-05-02'),
    ('2', 'Competition mars', 'Gatineau', '2021-03-13', '2021-03-13');

INSERT INTO registrations (competition_id, athlete_id)
VALUES
    ('1', '1'),
    ('1', '2'),
    ('2', '7'),
    ('2', '6'),
    ('2', '2');

