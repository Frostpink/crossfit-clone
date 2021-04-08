// api/addresses

import pool from '@pool'
import * as yup from 'yup'

const addressSchema = yup.object({
    street_number: yup.string().required(),
    street: yup.string().required(),
    city: yup.string().required(),
    postal_code: yup.string().required(),
    province: yup.string().required(),
})

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { street_number, street, city, postal_code, province } = await addressSchema.validate(req.body)

            const address = await pool
                .query(`insert into addresses (street_number, street, city, postal_code, province) values ($1, $2, $3, $4, $5) returning *`, [street_number, street, city, postal_code, province])
                .then(res => res.rows)

            res.status(200).json(address)
        }

        if (req.method === 'GET') {
            if (await addressSchema.isValid(req.query)) {
                const { street_number, street, city, postal_code, province } = req.query

                const address = await pool.query(`select * from addresses where street_number = $1 and street = $2 and city = $3 and postal_code = $4 and province = $5`, [
                    street_number,
                    street,
                    city,
                    postal_code,
                    province,
                ]).then(response => response.rows)

                return res.status(200).json(address)
            }

            // const query = `with address as (select *, city || province as address from addresses) select * from address where lower(address) like '%${searchValue.toLowerCase()}%'`
            const query = `select * from addresses`

            await pool.query(query).then(response => {
                res.status(200).json(response.rows)
            })
        }
    } catch (err) {
        if (err.code && err.code === '23505') return res.status(200).json({ message: err.detail, code: err.code })
        res.status(400).json({ message: err.message })
    }
}
