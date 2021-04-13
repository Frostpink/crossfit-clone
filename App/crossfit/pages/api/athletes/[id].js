import pool from '@pool'

export default async (req, res) => {

    try {

        if (req.method === 'DELETE') {

            const {
                id
            } = req.query

            const query = `DELETE FROM athletes WHERE athlete_id = $1`

            await pool.query(query, [id]).then(response => res.send('delete succeeded'))

        }

        else if (req.method === 'GET') {

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
    } catch (err) {
        console.log(err)
        res.send('error in athletes/[id]')
    }
}