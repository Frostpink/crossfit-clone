import {
    Pool
} from 'pg'

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'crossfit',
    password: 'password'
})

export default async (req, res) => {

    console.log('[GET] workout movements')

    if (req.method === 'GET') {
        const {
            workout_id = null
        } = req.query

        if (workout_id === null) return res.send('missing id')
        const query = 'select movements.* from movements inner join workout_movements on workout_movements.movement_id = movements.id where workout_id = $1'

        await pool.query(query, [workout_id]).then(response => {

            res.status(200).json(response.rows)

        }).catch(err => {

            res.send(300)
            console.log(err.message)

        })
    } else res.send(405)
}