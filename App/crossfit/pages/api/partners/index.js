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

    if (req.method === 'GET') {
        const query = `select * from partners`

        await pool.query(query).then(response => {

            res.status(200).json(response.rows)

        }).catch(err => {

            res.send(300)
            console.log(err)

        })
    }
}