const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: '5434',
    database: 'crossfit',
    password: 'password'
})

// const shortid = require('shortid')

// Get all athletes
const getAthletes = (req, res) => {

    let sort = 'id'
    let get = '*'
    let order = 'asc'
    if (req.query.sort) sort = req.query.sort
    if (req.query.get) get = req.query.get
    if (req.query.order) order = req.query.order

    const query = `SELECT ${get} FROM athletes ORDER BY ${sort} ${order}`
    console.log(`[GET] get all athletes ${query}`)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })

}

// Get single athlete by id
const getAthleteById = (req, res) => {

    try {
        const id = req.params.id
    } catch (error) {
        res.status(300).send('You need to pass the proper parameters.')
    }

    const query = `SELECT * FROM athletes WHERE id = '${id}'`
    console.log(`[GET] get athlete by id ${query}`)

    pool.query(query, (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })

}

// Post a new athlete
const postAthlete = (req, res) => {

    try {
        const name = req.body.name
        const gender = req.body.gender
    } catch (error) {
        res.status(300).send('You need to pass the proper parameters.')
    }

    let values = ''
    let data = ''
    if (name)   {values+='name,';   data+=`'${name}'`}
    if (gender) {values+='gender,'; data+=`'${gender}'`}

    // console.log(`[server] adding athlete (${name}) with identifier ${identifier}`)
    // console.log(`[server] values: (${values}) data: (${data})`)

    const query = `INSERT INTO athletes (${values}) VALUES (${data});`
    console.log(`[INSERT] inserting ${query}`)

    pool.query(query)
        .then(res => console.log(`[server] inserted ${ res.rows[0] }`))
        .catch(err => {
            console.error(err.stack)
            res.status(400).send('ERROR WHILE INSERT')
        })

    res.status(201).send('OK')

}

// Get all competitions
const getCompetitions = (req, res) => {

    let sort = 'id'
    let get = '*'
    if (req.query.sort) {
        sort = req.query.sort
    }
    if (req.query.get) {
        get = req.query.
        get
    }

    const query = `SELECT ${get} FROM competitions ORDER BY ${sort} ASC`
    console.log(`[GET] get all competitions ${query}`)

    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })

}

// Get single competition by id
const getCompetitionById = (req, res) => {

    try {
        const id = req.params.id
    } catch (error) {
        res.status(300).send("You must provide an id")
    }

    const query = `SELECT * FROM competitions WHERE id = '${id}'`
    console.log(`[GET] get single competition ${query}`)

    pool.query(query, (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })

}

// Get all participants in certain competition
const getParticipants = (req, res) => {

    try {
        const id = req.params.id // competition id
    } catch (error) {
        res.status(300).send('You must provide an id.')
    }

    // const query = `select a.name, a.id from competitions c
    //                inner join registrations r on c.id = r.competition_id
    //                inner join athletes a on a.id = r.athlete_id
    //                where c.id = '${id}';`

    const query = `select * from participants where competition_id = '${id}';`
    console.log(`[GET] get participants in a competition '${query}'`);

    pool.query(query, (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })

}

// Get search result (by name)
const getSearch = (req, res) => {

    const str = req.params.str // string to search in names

    const what = req.query.what
    
    const query = `select id, name from ${what} where name ~* '\\s${str}|^${str}';`
    console.log(`[GET] search for ${ what } ${ query }`)

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
    getSearch,
    postAthlete,
}