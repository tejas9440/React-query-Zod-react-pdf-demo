const { createLogger, format, transports } = require('winston')

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp('YYYY-MM-DD HH:mm:ss'),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}] : ${message}`
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log' })
    ]
})

module.exports = logger