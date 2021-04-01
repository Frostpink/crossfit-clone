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

    console.log('[GET] single partner')

    if (req.method === 'GET') {
        const {
            id
        } = req.query
        const query = `select * from partners where id = ${id}`

        await pool.query(query).then(response => {

            res.status(200).json(response.rows[0])

        }).catch(err => {

            res.send(300)
            console.log(err.message)

        })
    } else res.send(405)
}
