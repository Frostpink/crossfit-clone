// api/competitions

import pool from '@pool'

export default async (req, res) => {

    if (req.method === 'POST') {
        res.send(405)
    }

    if (req.method === 'GET') {
        const query = `select * from competitions`

        await pool.query(query).then(response => {

            res.status(200).json(response.rows)

        }).catch(err => {

            res.send(300)
            throw err

        })
    }
}