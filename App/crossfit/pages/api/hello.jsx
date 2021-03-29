// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import type { NextApiRequest, NextApiResponse } from 'next'
import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'crossfit',
  password: 'password'
})

// type Data = {
//   name: string
// }

const athletes = [
  {
    name: 'First'
  },
  {
    name: 'Second'
  }
]

export default (req, res) => {
  console.log('Hello')
  const query = `select * from athletes`
  pool.query(query).then(response => console.log( response.rows ))
  //   if (err) {
  //     throw err
  //   }
    res.status(200).json(athletes)
  // })
}
