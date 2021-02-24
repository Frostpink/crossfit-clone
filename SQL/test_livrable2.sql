select a.name, r.*, c.name from athletes a right join registrations r on a.id = r.athlete_id left join competitions c on r.competition_id = c.id;

select a.name, r.*, c.name from athletes a full join registrations r on a.id = r.athlete_id full join competitions c on r.competition_id = c.id;

-- update athlete sansone donaway
UPDATE athletes
SET height = 172.8
WHERE name = 'Sansone Donaway';

select * from athletes where name = 'Sansone Donaway';

-- delete registration
DELETE FROM registrations r
WHERE (select id from athletes where name = 'Milissent Prazer') = r.athlete_id 
AND (select id from competitions where name = 'Competition mai') = r.competition_id;

select a.name, r.*, c.name from athletes a full join registrations r on a.id = r.athlete_id full join competitions c on r.competition_id = c.id;
