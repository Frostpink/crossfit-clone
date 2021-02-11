const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = 8080;

const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors())

app.get('/', (req, res) => {
    res.json({ info: "Node.js, Express and Postgres API"})
})

app.get('/athletes', db.getAthletes)
app.get('/athletes/:id', db.getAthleteById)

app.listen(PORT, () => {
    console.log(`[server]: Listening on http://localhost:${PORT}/`)
})

