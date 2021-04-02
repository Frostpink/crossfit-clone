// api/competitions/competitionId

import pool from '@pool'

export default async (req, res) => {

    console.log('[GET] single competition')

    if (req.method === 'GET') {
        const { competitionId } = req.query
        if (!competitionId) return res.send('missing competitionId')

        const query = `
            select competitions.*, 
                   partners.name partner_name, 
                   addresses.street_number, addresses.street, addresses.city, addresses.postal_code, addresses.province,
                   contact_persons.name contact_name, contact_persons.email, contact_persons.phone
            from competitions 
            inner join partners on partners.id = competitions.partner_id
            inner join addresses on addresses.id = competitions.address_id
            inner join contact_persons on contact_persons.id = competitions.contact_person_id
            where competition_id = $1
            `

        await pool.query(query, [competitionId]).then(response => {

            res.status(200).json(response.rows[0])

        }).then(response => {
            console.log('success')
        }).catch(err => {

            res.send(err.message)
            console.log(err)

        })
    } else res.send(405)
}
