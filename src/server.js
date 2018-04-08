require('dotenv').config()
const mongoose = require('mongoose')
const http = require('http')

const app = require('./app')
const dbSeeder = require('./db-seeder')

const CONFIG = require('./config')

/**
 * Setup database connection
 */
mongoose.connect(CONFIG.DATABASE.CONNECTION_STRING)
mongoose.Promise = global.Promise
mongoose.connection.on('error', () => {
  console.log('Database connection error')
  process.exit(1)
})
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0)
  })
})

/**
 * Seed database
 */
dbSeeder.seedAsync()

/**
   * Get port from environment and store in Express.
   */
var port = normalizePort(CONFIG.PORT || 3000)
app.set('port', port)

/**
* Create HTTP server.
*/
var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort (val) {
  var port = parseInt(val, 10)
  if (isNaN(port)) return val
  if (port >= 0) return port
  return false
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError (error) {
  if (error.syscall !== 'listen') throw error

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('Server is listening on ' + bind)
}