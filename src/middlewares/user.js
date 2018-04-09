const expressJwt = require('express-jwt')

const { User } = require('../models')
const CONFIG = require('../config')

const userMiddleware = [
  expressJwt({
    secret: CONFIG.JWT.SECRET,
    requestProperty: 'auth',
    credentialsRequired: false
  }),
  async (req, res, next) => {
    if (req.auth) {
      req.user = await User.findById(req.auth.id)
    }
    next()
  }
]

module.exports = userMiddleware
