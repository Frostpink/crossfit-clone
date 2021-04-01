// api/competitions/competitionId/events/eventName/participants


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

    console.log('[GET] participants from event')

    if (req.method === 'GET') {
        const { competitionId, eventName } = req.query
        if (!competitionId) return res.send('missing competition id')
        if (!eventName) return res.send('missing event name')

        const query = `
            select athlete_id, athlete_name
            from participants
            inner join events using(competition_id)
            where competition_id = ${competitionId} and event_name = ${eventName}
        `

        await pool.query(query).then(response => {

            res.status(200).json(response.rows)

        }).catch(err => {

            res.send(err.message)
            console.log(err.message)

        })
    } else res.send(405)
}
