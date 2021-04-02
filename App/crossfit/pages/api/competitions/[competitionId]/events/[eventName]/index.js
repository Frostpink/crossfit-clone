// api/competitions/id/events/eventName

import pool from '@pool'

export default async (req, res) => {

    console.log('[GET] event from competition')

    if (req.method === 'GET') {
        const { competitionId, eventName } = req.query
        if (!competitionId) return res.send('missing competition id')
        if (!eventName) return res.send('missing event name')

        const query = `
            select * 
            from events
            where competition_id = ${competitionId} and event_name = ${eventName}
        `

        await pool.query(query).then(response => {

            res.status(200).json(response.rows[0])

        }).catch(err => {

            res.send(err.message)
            console.log(err.message)

        })
    } else res.send(405)
}
