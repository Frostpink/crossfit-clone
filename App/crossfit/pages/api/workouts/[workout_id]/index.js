// api/workouts/[workout_id]

import pool from '@pool'

export default async (req, res) => {

    console.log('[GET] single workout')

    if (req.method === 'GET') {
        const {
            workout_id = null
        } = req.query

        // if (workout_id === null) return res.send('missing id')
        const query = `select * from workouts where id = $1`
        console.log(query, workout_id)

        await pool.query(query, [ workout_id ]).then(response => {

            res.status(200).json(response.rows)

        }).catch(err => {

            res.send(300)
            console.log('[single workout error] ', err.message)

        })
    } else res.send(405)
}
