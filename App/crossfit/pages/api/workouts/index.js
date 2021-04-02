import pool from '@pool'

export default async (req, res) => {

    console.log('[GET] single athlete')

    if (req.method === 'GET') {
        const {
            id
        } = req.query
        const query = `select * from workouts`

        await pool.query(query).then(response => {

            res.status(200).json(response.rows)

        }).catch(err => {

            res.send(300)
            console.log(err.message)

        })
    } else res.send(405)
}
