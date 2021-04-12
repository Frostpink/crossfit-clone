// api/leaderboard


import pool from '@pool'

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
        const query = `select competition_name, rank leaderboard_rank, athlete_name, points leaderboard_points from leaderboard`

        await pool.query(query).then(response => {

            // const leaderboardGroupedByPerson = groupBy2(response.rows, 'athlete_name')

            res.status(200).json(response.rows)

        }).catch(err => {

            res.send(300)
            console.log(err)

        })
    } else res.send('only get method is supported')
}