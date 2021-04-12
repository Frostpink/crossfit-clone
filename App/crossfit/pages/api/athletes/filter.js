// api/athletes/filter

import pool from '@pool'
import * as yup from 'yup'

const props = yup.object().shape({
    searchColumn: yup.string().default('name').oneOf(['name', 'gender']).required(),
    searchValue: yup.string().default('').defined(),
})

export default async (req, res) => {

    try {

        if (req.method === 'POST') {
            res.send('invalid method')
        }

        if (req.method === 'GET') {
            console.log(`[${(new Date).getHours()}:${(new Date).getMinutes()}] GET filter athletes: `, req.query)
            const {
                searchColumn,
                searchValue
            } = await props.validate(req.query)

            console.log(searchColumn, searchValue)

            const query = `select * from athletes where ${searchColumn} ~* '.*${searchValue}.*'`

            await pool.query(query).then(response => {

                res.status(200).json(response.rows)

            })
        }

    } catch (err) {
        if (err.name && err.errors) {
            console.log(err.name, err.errors)
            return res.send(err.name)
        }
        console.log(err.message)
        res.send(1000)
    }
}