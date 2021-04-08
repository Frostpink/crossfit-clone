// api/contacts

import pool from '@pool'
import * as yup from 'yup'

const contactSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
})

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { name, email, phone } = await contactSchema.validate(req.body)

            const contact = await pool.query(`insert into contact_persons (name, email, phone) values ($1, $2, $3) returning *`, [name, email, phone]).then(response => response.rows)

            console.log(contact)
            res.status(200).json(contact)
        } catch (err) {
            if (err.code === '23505') return res.status(200).json({ message: err.detail, code: err.code})
            res.status(400).json(err)
        }
    }

    if (req.method === 'GET') {
        if (await contactSchema.isValid(req.query)) {
            try {
                const { name, email, phone } = req.query

                const contact = await pool.query(`select * from contact_persons where name = $1 and email = $2 and phone = $3`, [name, email, phone]).then(response => response.rows)

                res.status(200).json(contact)
            } catch (err) {
                console.log(err.message)
                res.status(400).json(err)
            }
            return
        }

        const query = `select * from contact_persons`

        await pool
            .query(query)
            .then(response => {
                res.status(200).json(response.rows)
            })
            .catch(err => {
                res.send(400)
            })
    }
}
