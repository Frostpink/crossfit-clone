// api/partners

import pool from '@pool'

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            return res.send(405)
            const { name } = req.body
            if (!name) return res.send('missing name')

            const query = 'insert into partners (name) values ($1) returning id'
            await pool
                .query(query, [name])
                .then(response => {
                    res.status(201).json(response.rows[0])
                })
                .catch(err => {
                    throw err
                })
        }

        if (req.method === 'GET') {
            const query = `select * from partners`

            await pool
                .query(query)
                .then(response => {
                    res.status(200).json(response.rows)
                })
                .catch(err => {
                    res.send(300)
                    console.log(err)
                })
        }
    } catch (err) {
        console.error(err.message)
    }
}
