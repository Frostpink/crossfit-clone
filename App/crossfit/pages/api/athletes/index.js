// api/athletes

import pool from '@pool'

export default async (req, res) => {
    try {

        if (req.method === 'POST') {
            const {
                name
            } = req.body
            if (!name) return res.send('missing name')

            const query = 'insert into athletes (name) values ($1) returning athlete_id'
            await pool.query(query, [name]).then(response => {
                res.status(201).json(response.rows[0])
            }).catch(err => {
                throw err
            })
        }

        if (req.method === 'GET') {
            const {
                sort
            } = req.query
            if (!sort) return res.send('missing sort param')

            const query = `select * from athletes order by ${sort}`

            await pool.query(query).then(response => {

                res.status(200).json(response.rows)

            }).catch(err => {

                throw err

            })
        }

    } catch (err) {
        res.send(1000)
    }
}