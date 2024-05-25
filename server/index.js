const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const port = 5000

// Middlewares 
app.use(bodyParser.json());
app.use(cors())

// Routes
app.use('/', require('./routes/taskRoute'))


app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`)
})