BEGIN;

-- insert athletes
INSERT INTO athletes (name, gender)
VALUES ('Sydney Desaulniers', 'female'),
    ('Mercer Bussiere', 'female'),
    ('Fiacre Doiron', 'female'),
    ('Thérèse Lemaître', 'female'),
    ('Coralie Faucher', 'female'),
    ('Apolline Deschênes', 'female'),
    ('Philippine Bordeleau', 'female'),
    ('Fanette Marleau', 'female'),
    ('Layla Venning', 'female'),
    ('Grace Amess', 'female'),
    ('Emily Prieur', 'female'),
    ('Bethany Kingsford', 'female'),
    ('Eva Clarkson', 'female'),
    ('Leah Tims', 'female'),
    ('Lily Oldham', 'female'),
    ('Chelsea Lukis', 'female'),
    ('Claire Tisdall', 'female'),
    ('Emma Eade', 'female'),
    ('Summer Krischock', 'female'),
    ('Alicia Hulme-Moir', 'female'),
    ('Liam Logan', 'male'),
    ('Jamie Alsop', 'male'),
    ('Hayden Suffolk', 'male'),
    ('Brodie Tedbury', 'male'),
    ('Jack Hannam', 'male'),
    ('Logan Headlam', 'male'),
    ('Hugo Edmunds', 'male'),
    ('Nathan Cabena', 'male'),
    ('Jai Burn', 'male'),
    ('Taj Stapleton', 'male'),
    ('Charles Feldt', 'male'),
    ('Edward Verge', 'male'),
    ('Archer Coward', 'male'),
    ('Hudson Hopley', 'male'),
    ('Jesse Denman', 'male'),
    ('Bailey Monckton', 'male'),
    ('Joel Olsen', 'male'),
    ('Thomas Love', 'male'),
    ('David Macalister', 'male'),
    ('Daniel Luke', 'male'),
    ('Taj Hillary', 'male'),
    ('Angus Huxley', 'male');


-- insert contact_persons
INSERT INTO contact_persons (name, email, phone) values ('Dan'               , 'info@crossfitfortis.ca'         , '6138370909');
INSERT INTO contact_persons (name, email, phone) values ('Everett Sloan'     , 'mail@bytown.fit'                , '6138891318');
INSERT INTO contact_persons (name, email, phone) values ('Paul Tremblay'     , 'info@crossfitncr.ca'            , '6133559200');
INSERT INTO contact_persons (name, email, phone) values ('Jonathan Di Pierro', 'info@crossfitactus.com'         , '6136019960');
INSERT INTO contact_persons (name, email, phone) values ('Andy Stewart'      , 'info@crossfit1855.com'          , '6135589037');
INSERT INTO contact_persons (name, email, phone) values ('Conor Oakley'      , 'oakley_fitness@hotmail.com'     , '6132525331');
INSERT INTO contact_persons (name, email, phone) values ('Jeff Fotti'        , 'wegotyou.crossfitrush@gmail.com', '6134469496');


-- insert addresses
INSERT INTO addresses(street_number, street, city, postal_code, province) values ('245' , 'Vanguard Dr'     , 'Orléans' , 'K4A3V6', 'Ontario');
INSERT INTO addresses(street_number, street, city, postal_code, province) values ('1040', 'Somerset St W'   , 'Ottawa'  , 'K1Y2H6', 'Ontario');
INSERT INTO addresses(street_number, street, city, postal_code, province) values ('2487', 'Kaladar Ave.'    , 'Ottawa'  , 'K1V8B9', 'Ontario');
INSERT INTO addresses(street_number, street, city, postal_code, province) values ('1590', 'Liverpool Ct'    , 'Ottawa'  , 'K1B4L2', 'Ontario');
INSERT INTO addresses(street_number, street, city, postal_code, province) values ('1523', 'Laperriere Ave'  , 'Ottawa'  , 'K1Z7T1', 'Ontario');
INSERT INTO addresses(street_number, street, city, postal_code, province) values ('340' , 'Parkdale Ave'    , 'Ottawa'  , 'K1Y2W5', 'Ontario');
INSERT INTO addresses(street_number, street, city, postal_code, province) values ('729' , 'Rue Industrielle', 'Rockland', 'K4K1T2', 'Ontario');


-- insert partners
WITH contact AS (
    SELECT id FROM contact_persons WHERE name = 'Dan' AND email = 'info@crossfitfortis.ca' AND phone = '6138370909'
), address AS (
    SELECT id FROM addresses WHERE street_number = '245' AND street = 'Vanguard Dr'     AND city = 'Orléans' AND postal_code = 'K4A3V6' AND province = 'Ontario'
) INSERT INTO partners (name, contact_person_id, address_id) SELECT 'CrossFit Fortis', (select id from contact), (select id from address);

WITH contact AS (
    SELECT id FROM contact_persons WHERE name = 'Dan' AND email = 'info@crossfitfortis.ca' AND phone = '6138370909'
), address AS (
    SELECT id FROM addresses WHERE street_number = '1040'AND street = 'Somerset St W'   AND city = 'Ottawa'  AND postal_code = 'K1Y2H6' AND province = 'Ontario'
) INSERT INTO partners (name, contact_person_id, address_id) SELECT 'CrossFit Bytown', (select id from contact), (select id from address);

WITH contact AS (
    SELECT id FROM contact_persons WHERE name = 'Dan' AND email = 'info@crossfitfortis.ca' AND phone = '6138370909'
), address AS (
    SELECT id FROM addresses WHERE street_number = '2487'AND street = 'Kaladar Ave.'    AND city = 'Ottawa'  AND postal_code = 'K1V8B9' AND province = 'Ontario'
) INSERT INTO partners (name, contact_person_id, address_id) SELECT 'CrossFit NCR', (select id from contact), (select id from address);

WITH contact AS (
    SELECT id FROM contact_persons WHERE name = 'Dan' AND email = 'info@crossfitfortis.ca' AND phone = '6138370909'
), address AS (
    SELECT id FROM addresses WHERE street_number = '1590'AND street = 'Liverpool Ct'    AND city = 'Ottawa'  AND postal_code = 'K1B4L2' AND province = 'Ontario'
) INSERT INTO partners (name, contact_person_id, address_id) SELECT 'CrossFit Actus', (select id from contact), (select id from address);

WITH contact AS (
    SELECT id FROM contact_persons WHERE name = 'Dan' AND email = 'info@crossfitfortis.ca' AND phone = '6138370909'
), address AS (
    SELECT id FROM addresses WHERE street_number = '1523'AND street = 'Laperriere Ave'  AND city = 'Ottawa'  AND postal_code = 'K1Z7T1' AND province = 'Ontario'
) INSERT INTO partners (name, contact_person_id, address_id) SELECT 'CrossFit 1855', (select id from contact), (select id from address);

WITH contact AS (
    SELECT id FROM contact_persons WHERE name = 'Dan' AND email = 'info@crossfitfortis.ca' AND phone = '6138370909'
), address AS (
    SELECT id FROM addresses WHERE street_number = '340' AND street = 'Parkdale Ave'    AND city = 'Ottawa'  AND postal_code = 'K1Y2W5' AND province = 'Ontario'
) INSERT INTO partners (name, contact_person_id, address_id) SELECT 'CrossFit Hintonburg', (select id from contact), (select id from address);

WITH contact AS (
    SELECT id FROM contact_persons WHERE name = 'Dan' AND email = 'info@crossfitfortis.ca' AND phone = '6138370909'
), address AS (
    SELECT id FROM addresses WHERE street_number = '729' AND street = 'Rue Industrielle'AND city = 'Rockland'AND postal_code = 'K4K1T2' AND province = 'Ontario'
) INSERT INTO partners (name, contact_person_id, address_id) SELECT 'CrossFit Rush', (select id from contact), (select id from address);


-- insert competitions
INSERT INTO competitions (name, start_date, end_date, contact_person_id, address_id, partner_id)
SELECT
    'Canada Day 2021',
    '2021-07-01',
    '2021-07-01',
    (SELECT id FROM contact_persons WHERE name = 'Dan' AND email = 'info@crossfitfortis.ca' AND phone = '6138370909'),
    (SELECT id FROM addresses WHERE street_number = '245' AND street = 'Vanguard Dr'     AND city = 'Orléans' AND postal_code = 'K4A3V6' AND province = 'Ontario'),
    (select id from partners where name = 'CrossFit Fortis');

INSERT INTO competitions (name, start_date, end_date, contact_person_id, address_id, partner_id)
SELECT
    'April 2021',
    '2021-04-01',
    '2021-04-02',
    (SELECT id FROM contact_persons WHERE name = 'Dan' AND email = 'info@crossfitfortis.ca' AND phone = '6138370909'),
    (SELECT id FROM addresses WHERE street_number = '1040'AND street = 'Somerset St W'   AND city = 'Ottawa'  AND postal_code = 'K1Y2H6' AND province = 'Ontario'),
    (select id from partners where name = 'CrossFit Bytown');

INSERT INTO competitions (name, start_date, end_date, contact_person_id, address_id, partner_id)
SELECT
    ('Mai 2021'),
    '2021-05-01',
    '2021-05-01',
    (SELECT id FROM contact_persons WHERE name = 'Dan' AND email = 'info@crossfitfortis.ca' AND phone = '6138370909'),
    (SELECT id FROM addresses WHERE street_number = '2487'AND street = 'Kaladar Ave.'    AND city = 'Ottawa'  AND postal_code = 'K1V8B9' AND province = 'Ontario'),
    (select id from partners where name = 'CrossFit NCR');

INSERT INTO competitions (name, start_date, end_date, contact_person_id, address_id, partner_id)
SELECT
    ('June 2021'),
    '2021-06-01',
    '2021-06-05',
    (SELECT id FROM contact_persons WHERE name = 'Dan' AND email = 'info@crossfitfortis.ca' AND phone = '6138370909'),
    (SELECT id FROM addresses WHERE street_number = '1590'AND street = 'Liverpool Ct'    AND city = 'Ottawa'  AND postal_code = 'K1B4L2' AND province = 'Ontario'),
    (select id from partners where name = 'CrossFit Actus');

INSERT INTO competitions (name, start_date, end_date, contact_person_id, address_id, partner_id)
SELECT
    ('July 2021'),
    '2021-07-15',
    '2021-07-18',
    (SELECT id FROM contact_persons WHERE name = 'Dan' AND email = 'info@crossfitfortis.ca' AND phone = '6138370909'),
    (SELECT id FROM addresses WHERE street_number = '1523'AND street = 'Laperriere Ave'  AND city = 'Ottawa'  AND postal_code = 'K1Z7T1' AND province = 'Ontario'),
    (select id from partners where name = 'CrossFit 1855');


-- insert capacity
INSERT INTO capacity (competition_id, gender, capacity)
SELECT
    (select competition_id from competitions where name = 'Canada Day 2021'),
    'female',
    45;
INSERT INTO capacity (competition_id, gender, capacity)
SELECT
    (select competition_id from competitions where name = 'Canada Day 2021'),
    'male',
    65;


-- insert registrations
INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Sydney Desaulniers'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'April 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Sydney Desaulniers'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Mercer Bussiere'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Fiacre Doiron'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Thérèse Lemaître'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Coralie Faucher'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Apolline Deschênes'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Philippine Bordeleau'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Fanette Marleau'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Layla Venning'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Grace Amess'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Emily Prieur'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Bethany Kingsford'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Eva Clarkson'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Leah Tims'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Lily Oldham'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Chelsea Lukis'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Claire Tisdall'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Emma Eade'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Summer Krischock'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Alicia Hulme-Moir'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Liam Logan'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Jamie Alsop'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Hayden Suffolk'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Brodie Tedbury'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Jack Hannam'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Logan Headlam'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Hugo Edmunds'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Nathan Cabena'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Jai Burn'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Taj Stapleton'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Charles Feldt'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Edward Verge'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Archer Coward'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Hudson Hopley'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Jesse Denman'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Bailey Monckton'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Joel Olsen'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Thomas Love'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'David Macalister'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Daniel Luke'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Taj Hillary'
    );


INSERT INTO registrations (competition_id, athlete_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Angus Huxley'
    );


-- insert workouts
INSERT INTO workouts (name, score)
VALUES ('10k run', 'Time ASC');


INSERT INTO workouts (name, score, time_cap)
VALUES ('Burpees in 7 min', 'Reps DESC', '700');


-- insert movements
INSERT INTO movements (name, TYPE, cap)
VALUES ('running', 'distance', '10000'),
    ('burpees', 'time', '700');


-- insert workout_movements
INSERT INTO workout_movements (workout_id, movement_id, sequence_number)
SELECT (
        SELECT id
        FROM workouts
        WHERE name = '10k run'
    ),
    (
        SELECT id
        FROM movements
        WHERE name = 'running'
            AND TYPE = 'distance'
            AND cap = '10000'
    ),
    1;


INSERT INTO workout_movements (workout_id, movement_id, sequence_number)
SELECT (
        SELECT id
        FROM workouts
        WHERE name = 'Burpees in 7 min'
    ),
    (
        SELECT id
        FROM movements
        WHERE name = 'burpees'
            AND TYPE = 'time'
            AND cap = '700'
    ),
    1;


-- insert events
INSERT INTO EVENTS (competition_id, event_name, workout_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    '10k run',
    (
        SELECT id
        FROM workouts
        WHERE name = '10k run'
    );


INSERT INTO EVENTS (competition_id, event_name, workout_id)
SELECT (
        SELECT competition_id
        FROM competitions
        WHERE name = 'Canada Day 2021'
    ),
    'Max burpees',
    (
        SELECT id
        FROM workouts
        WHERE name = 'Burpees in 7 min'
    );


-- insert results
WITH event AS (
    SELECT competition_id,
        event_name
    FROM EVENTS
    WHERE event_name = '10k run'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Sydney Desaulniers'
    ),
    event_name,
    competition_id,
    '5000'
FROM event;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Sydney Desaulniers'
    ),
    'Max burpees',
    competition_id,
    '76'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Thérèse Lemaître'
    ),
    '10k run',
    competition_id,
    '6346'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Coralie Faucher'
    ),
    '10k run',
    competition_id,
    '8012'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Apolline Deschênes'
    ),
    '10k run',
    competition_id,
    '7218'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Philippine Bordeleau'
    ),
    '10k run',
    competition_id,
    '7751'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Fanette Marleau'
    ),
    '10k run',
    competition_id,
    '5248'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Layla Venning'
    ),
    '10k run',
    competition_id,
    '6322'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Grace Amess'
    ),
    '10k run',
    competition_id,
    '6805'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Emily Prieur'
    ),
    '10k run',
    competition_id,
    '6506'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Bethany Kingsford'
    ),
    '10k run',
    competition_id,
    '6506'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Eva Clarkson'
    ),
    '10k run',
    competition_id,
    '6506'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Leah Tims'
    ),
    '10k run',
    competition_id,
    '6506'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Lily Oldham'
    ),
    '10k run',
    competition_id,
    '6506'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Chelsea Lukis'
    ),
    '10k run',
    competition_id,
    '7432'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Claire Tisdall'
    ),
    '10k run',
    competition_id,
    '5929'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Emma Eade'
    ),
    '10k run',
    competition_id,
    '5923'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Summer Krischock'
    ),
    '10k run',
    competition_id,
    '7113'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Alicia Hulme-Moir'
    ),
    '10k run',
    competition_id,
    '7014'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Liam Logan'
    ),
    '10k run',
    competition_id,
    '5808'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Jamie Alsop'
    ),
    '10k run',
    competition_id,
    '5118'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Hayden Suffolk'
    ),
    '10k run',
    competition_id,
    '6000'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Brodie Tedbury'
    ),
    '10k run',
    competition_id,
    '7813'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Jack Hannam'
    ),
    '10k run',
    competition_id,
    '6456'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Logan Headlam'
    ),
    '10k run',
    competition_id,
    '5551'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Hugo Edmunds'
    ),
    '10k run',
    competition_id,
    '6311'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Nathan Cabena'
    ),
    '10k run',
    competition_id,
    '5245'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Jai Burn'
    ),
    '10k run',
    competition_id,
    '6952'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Taj Stapleton'
    ),
    '10k run',
    competition_id,
    '7828'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Charles Feldt'
    ),
    '10k run',
    competition_id,
    '7504'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Edward Verge'
    ),
    '10k run',
    competition_id,
    '5404'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Archer Coward'
    ),
    '10k run',
    competition_id,
    '7106'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Hudson Hopley'
    ),
    '10k run',
    competition_id,
    '5525'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Jesse Denman'
    ),
    '10k run',
    competition_id,
    '5423'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Bailey Monckton'
    ),
    '10k run',
    competition_id,
    '6758'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Joel Olsen'
    ),
    '10k run',
    competition_id,
    '6243'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Thomas Love'
    ),
    '10k run',
    competition_id,
    '6934'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'David Macalister'
    ),
    '10k run',
    competition_id,
    '7326'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Daniel Luke'
    ),
    '10k run',
    competition_id,
    '6354'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Taj Hillary'
    ),
    '10k run',
    competition_id,
    '5953'
FROM competition;


WITH competition AS (
    SELECT competition_id
    FROM competitions
    WHERE name = 'Canada Day 2021'
)
INSERT INTO results (athlete_id, event_name, competition_id, score)
SELECT (
        SELECT athlete_id
        FROM athletes
        WHERE name = 'Angus Huxley'
    ),
    '10k run',
    competition_id,
    '5239'
FROM competition;

COMMIT;