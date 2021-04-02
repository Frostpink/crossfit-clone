import pool from '@pool'

export default async (req, res) => {

    console.log('[GET] single athlete')

    if (req.method === 'GET') {
        const {
            id
        } = req.query
        const query = `select * from athletes where athlete_id = ${id}`

        await pool.query(query).then(response => {

            res.status(200).json(response.rows[0])

        }).catch(err => {

            res.send(300)
            console.log(err.message)
            // throw err

        })
    } else res.send(405)
}