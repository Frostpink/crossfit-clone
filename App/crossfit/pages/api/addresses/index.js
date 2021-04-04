// api/addresses

import pool from '@pool'

export default async (req, res) => {
    try {

        if (req.method === 'POST') {
            // const {
            //     name
            // } = req.body
            // if (!name) return res.send('missing name')

            // const query = 'insert into athletes (name) values ($1) returning athlete_id'
            // await pool.query(query, [name]).then(response => {
            //     res.status(201).json(response.rows[0])
            // }).catch(err => {
            //     throw err
            // })
            res.send(405)
        }

        if (req.method === 'GET') {
            const {
                searchValue
            } = req.query
            if (!searchValue) return res.send('missing search value')

            const query = `with address as (select *, city || province as address from addresses) select * from address where lower(address) like '%${searchValue.toLowerCase()}%'`
            
            await pool.query(query).then(response => {

                res.status(200).json(response.rows)

            }).catch(err => {

                throw err

            })
        }

    } catch (err) {
        console.error(err.message)
        res.send(1000)
    }

}