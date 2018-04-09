const CONFIG = {
  ENV: process.env.NODE_ENV,
  IS_PROD_ENV: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT,
  DATABASE: {
    CONNECTION_STRING: process.env.DATABASE_CONNECTION_STRING
  },
  JWT: {
    SECRET: process.env.JWT_SECRET
  }
}

module.exports = CONFIG
