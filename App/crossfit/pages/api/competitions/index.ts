// api/competitions

import pool from '@pool'
import { object, string, date, ValidationError } from 'yup'

const competitionSchema = object().shape({
    name: string().required(),
    start_date: date().required(),
    end_date: date().required(),
    contact_id: string().required(),
    address_id: string().required(),
    partner_id: string().required(),
})

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            console.log(req.body.competition)
            const competition = await competitionSchema.validate(req.body.competition)

            const query = `insert into competitions (name, start_date, end_date, contact_person_id, address_id, partner_id) values ($1, $2, $3, $4, $5, $6) returning *`

            // console.log(competition)
            // res.send(405)

            await pool.query(query, [competition.name, competition.start_date, competition.end_date, competition.contact_id, competition.address_id, competition.partner_id]).then(response => {
                res.status(201).json(response.rows)
            })
        } catch (err) {
            if (err.code === '23505') return res.status(200).json({ message: err.detail, code: err.code })
            if (err.name === 'ValidationError') return res.status(200).json({ message: err.errors[0], code: '-1' })
            console.log(err)
            res.status(400).json(err)
        }
    }

    if (req.method === 'GET') {
        console.log('-------- get competitions -----------')
        const query = `select * from competitions`

        await pool
            .query(query)
            .then(response => {
                res.status(200).json(response.rows)
            })
            .catch(err => {
                res.send(300)
                throw err
            })
    }
}
