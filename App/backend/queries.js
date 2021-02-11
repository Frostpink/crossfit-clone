const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    port: '5432',
    database: 'crossfit',
    password: 'password'
})

const shortid = require('shortid')

// Get all athletes
const getAthletes = (req, res) => {

    let sort = 'id'
    let get = '*'
    if (req.query.sort) {
        sort = req.query.sort
    }
    if (req.query.get) {
        get = req.query.get
    }

    const query = `SELECT ${get} FROM athletes ORDER BY ${sort} ASC`
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })

}

// Get single athlete by id
const getAthleteById = (req, res) => {

    const id = req.params.id

    const query = `SELECT * FROM athletes WHERE id = '${id}'`
    pool.query(query, (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })

}

// Get all competitions
const getCompetitions = (req, res) => {

    let sort = 'id'
    let get = '*'
    if (req.query.sort) {
        sort = req.query.sort
    }
    if (req.query.get) {
        get = req.query.get
    }

    const query = `SELECT ${get} FROM competitions ORDER BY ${sort} ASC`
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })

}

// Get single competition by id
const getCompetitionById = (req, res) => {

    const id = req.params.id

    const query = `SELECT * FROM competitions WHERE id = '${id}'`
    pool.query(query, (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })

}

module.exports = {
    getAthletes,
    getAthleteById,
    getCompetitions,
    getCompetitionById,
}