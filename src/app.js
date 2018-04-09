const compression = require('compression')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const express = require('express')
require('express-async-errors')

const { userMiddleware, errorHandlingMiddleware } = require('./middlewares')
const models = require('./models')
const graphqlSchema = require('./graphql/schema')
const graphqlRootValue = require('./graphql/root-value')
const app = express()

app.use(compression())
app.use(cors())
app.use(userMiddleware)

app.use('/graphql', graphqlHTTP(req => {
  return {
    schema: graphqlSchema,
    rootValue: graphqlRootValue,
    graphiql: true,
    context: {
      user: req.user,
      currentTime: new Date(),
      models: models
    }
  }
}))

app.use(errorHandlingMiddleware)

module.exports = app
