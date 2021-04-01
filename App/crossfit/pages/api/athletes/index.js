// api/athletes

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
    try {

    if (req.method === 'POST') {
        const { name } = req.query
        console.log(name)
        console.log('post',res)
        res.send(405)
    }

    if (req.method === 'GET') {
        const { sort } = req.query
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