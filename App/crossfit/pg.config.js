import {
    Pool
} from 'pg'

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5434,
    database: 'crossfit',
    password: 'password'
})

export default pool