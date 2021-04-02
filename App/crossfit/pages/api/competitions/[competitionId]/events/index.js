// api/competitions/id/participants

import pool from '@pool'

export default async (req, res) => {

    console.log('[GET] events of competition')

    if (req.method === 'GET') {
        const { competitionId } = req.query
        if (!competitionId) return res.send('missing competition id')

        const query = `
            select * from events where competition_id = ${competitionId}
        `

        await pool.query(query).then(response => {

            res.status(200).json(response.rows)

        }).catch(err => {

            res.send(300)
            throw err

        })
    }
}