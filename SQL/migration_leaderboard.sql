begin;

drop view leaderboard;
drop view scores;

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
  select competition_id,
         athlete_id,
         sum(rank) as points
  from result
  group by competition_id, athlete_id
  order by points asc
  )
  select competition_name,
         competition_id,
  		   rank () over (partition by competition_id order by points asc),
         athlete_id,
         athlete_name,
         points
  from board
  inner join participants using(athlete_id, competition_id)
  order by competition_name asc, rank asc
  ;

commit;