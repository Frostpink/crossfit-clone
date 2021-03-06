// api/athletes

import pool from '@pool'
import * as yup from 'yup'

const athleteSort = yup.object().shape({
    sort: yup.string().default('name asc').oneOf(['name asc', 'name desc', 'age asc', 'age desc', 'gender asc', 'gender desc']).required()
})

const putProps = yup.object().shape({
    athlete_id: yup.number().required(),
    name: yup.string().required(),
    gender: yup.string().required(),
})

export default async (req, res) => {

    try {

        if (req.method === 'PUT') {
            console.log(req.body)
            const {
                athlete_id,
                name,
                gender,
            } = await putProps.validate(req.body)

            console.log(athlete_id, name, gender)

            const query = 'UPDATE athletes SET name = $1, gender = $2 WHERE athlete_id = $3'

            await pool.query(query, [name, gender, athlete_id]).then(response => {
                res.status(202).json(response.rows[0])
            }).catch(err => {
                throw err
            })
        }

        if (req.method === 'POST') {
            const {
                name
            } = req.body
            if (!name) return res.send('missing name')

            const query = 'insert into athletes (name) values ($1) returning athlete_id'
            await pool.query(query, [name]).then(response => {
                res.status(201).json(response.rows[0])
            }).catch(err => {
                throw err
            })
        }

        if (req.method === 'GET') {
            console.log(`[${(new Date).getHours()}:${(new Date).getMinutes()}] GET athletes: `, req.query)
            const {
                sort
            } = await athleteSort.validate(req.query)

            const query = `select * from athletes order by ${sort}`

            await pool.query(query).then(response => {

                res.status(200).json(response.rows)

            }).catch(err => {

                throw err

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