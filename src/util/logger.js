const fs = require('fs')
const winston = require('winston')
require('winston-daily-rotate-file')

const CONFIG = require('../config')

const logsFolder = './logs'
if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder)
}

const logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.DailyRotateFile)({
      filename: `${logsFolder}/%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d'
    })
  ]
})

if (!CONFIG.IS_PROD_ENV) {
  logger.add(winston.transports.Console)
}

module.exports = logger
