// api/register

import pool from '@pool'
import * as yup from 'yup'

const props = yup.object().shape({
    competition_id: yup.number().required(),
    athlete_id: yup.number().required(),
})

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { athlete_id, competition_id } = await props.validate(req.body)

            const registration = await pool.query(`insert into registrations (athlete_id, competition_id) values ($1, $2) returning *`, [athlete_id, competition_id]).then(response => response.rows)

            res.status(201).json(registration)
        } catch (err) {
            if (err.name && err.errors) res.send(err.name)
            if (err.code === '23505') return res.status(200).json({ message: err.detail, code: err.code})
            res.status(400).json(err)
        }
    }
}
