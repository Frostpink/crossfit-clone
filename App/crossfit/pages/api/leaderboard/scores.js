// api/leaderboard/scores


import pool from '@pool'
import * as yup from 'yup'

const competitionId = yup.object().shape({
    competition: yup.number().required(),
})

// Accepts the array and key
const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        )
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result
    }, {}) // empty object is the initial value for result object
}

// Accepts the array and key
const groupBy2 = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        )
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result
    }, {}) // empty object is the initial value for result object
}

export default async (req, res) => {

    if (req.method === 'GET') {
        // const query = `select competition_name, event_name, athlete_name, leaderboard.rank leaderboard_rank, scores.rank event_rank, leaderboard.points leaderboard_points 
                    //    from leaderboard inner join scores using(competition_name, athlete_name)`

        const {
            competition
        } = await competitionId.validate(req.query)

        const query = `select competition_name, rank event_rank, athlete_name, result_score event_points, event_name from scores where competition_id = $1`

        await pool.query(query, [competition]).then(response => {

            // const leaderboardGroupedByPerson = groupBy2(response.rows, 'athlete_name')

            // console.log(response.rows.filter(score => score.athlete_name === 'Sydney Desaulniers'))

            res.status(200).json(response.rows)

        }).catch(err => {

            res.send(300)
            console.log(err)

        })
    } else res.send('only get method is supported')
}

// [
//     {
//         competition_name
//         athlete_name
//         leaderboard_rank
//         leaderboard_points
//         [
//             {
//                 event_name
//                 event_rank
//             }
//             {
//                 event_name
//                 event_rank
//             }
//         ]
//     }
// ]