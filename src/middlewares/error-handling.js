const Boom = require('boom')

const errorHandlingMiddleware = (err, req, res, next) => {
  if (Boom.isBoom(err)) {
    return res.status(err.payload.statusCode).json({
      errors: [
        { message: err.payload.message }
      ]
    })
  }
  return res.status(500).json({
    errors: [
      { message: 'Internal Server Error' }
    ]
  })
}

module.exports = errorHandlingMiddleware
