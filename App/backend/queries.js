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
    let order = 'asc'
    if (req.query.order) {
        order = req.query.order
    }

    const query = `SELECT ${get} FROM athletes ORDER BY ${sort} ${order}`
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

    console.log('[competitions]')

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

// Get all participants in certain competition
const getParticipants = (req, res) => {

    const id = req.params.id // competition id
    
    const query = `select a.name, a.id from competitions c
                   inner join registrations r on c.id = r.competition_id
                   inner join athletes a on a.id = r.athlete_id
                   where c.id = '2';`

    console.log('[GET]: participants in event id '+id);

    pool.query(query, (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })

}

// Get search result (by name)
const getSearchResult = (req, res) => {

    const str = req.params.str // string to search in names
    
    const query = `select id, name from athletes where name ~* '\\s${str}|^${str}';`

    console.log('[GET]: search for '+str)

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
    getParticipants,
    getSearchResult,
}