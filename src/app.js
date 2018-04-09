const compression = require('compression')
const cors = require('cors')
const expressJwt = require('express-jwt')
const express = require('express')
require('express-async-errors')

const { userMiddleware, errorHandlingMiddleware } = require('./middlewares');
const app = express()

app.use(compression())
app.use(cors())
app.use(userMiddleware)

app.get('/', (req, res) => res.send('Hello World!'))

app.use(errorHandlingMiddleware)

module.exports = app
