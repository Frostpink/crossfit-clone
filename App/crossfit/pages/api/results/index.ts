// api/results

import pool from '@pool'
import * as yup from 'yup'

const competitionId = yup.object().shape({
    athlete_id: yup.number().required(),
    competition_id: yup.number().required(),
})

export default async (req, res) => {

    // console.log('get/results', req.query)

    try {
        if (req.method === 'GET') {

            const {
                athlete_id,
                competition_id
            } = await competitionId.validate(req.query)

            const query = `select * from results where athlete_id = $1 and competition_id = $2`

            // console.log(`[${(new Date()).getHours()}:${(new Date()).getMinutes()}] GET results: `, athlete_id, competition_id)
            // res.send('not done')

            await pool.query(query, [athlete_id, competition_id]).then(response => {

                res.status(200).json(response.rows)

            })
        } else res.send('only get method is supported')
    } catch (err) {
        console.log(err)
        res.send('error with get results')
    }

}