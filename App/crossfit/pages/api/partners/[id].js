import pool from '@pool'

export default async (req, res) => {

    console.log('[GET] single partner')

    if (req.method === 'GET') {
        const {
            id
        } = req.query
        const query = `select * from partners where id = $1`

        await pool.query(query, [id]).then(response => {

            res.status(200).json(response.rows[0])

        }).catch(err => {

            res.send(300)
            console.log(err.message)

        })
    } else res.send(405)
}
