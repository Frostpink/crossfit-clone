// api/competitions/id/participants

import pool from '@pool'

export default async (req, res) => {

    console.log('[GET] participants of competition')
    try {

    if (req.method === 'GET') {
        const { competitionId } = req.query
        if (typeof competitionId === 'undefined') return res.send('missing competition id')
        console.log(competitionId)

        const query = `
            select * from participants where competition_id = ${competitionId}
        `

        await pool.query(query).then(response => {

            res.status(200).json(response.rows)

        }).catch(err => {

            res.send(300)
            throw err

        })
    }

    } catch (err) {
        console.log(err.message)
        res.send('caught error in api/competitions/id/participants')
    }
}