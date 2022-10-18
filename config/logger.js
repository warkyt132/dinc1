const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const appFormat = winston.format.combine(
    winston.format.label({ label: '[app-server]' }),
    winston.format.timestamp({format:'YYYY-MM-DDTHH:mm:ss.000'}),
    winston.format.align(),
    winston.format.printf(info => {
    return `${info.timestamp} ${info.label} ${info.level}: ${info.message}`;
  }));
const transport = new DailyRotateFile({
    filename: './logs/graphqlService-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    prepend: true,
    level: 'info',
    auditFile: './logs/graphqlService.json'
});
transport.on('rotate', function (oldFilename, newFilename) {
    // call function like upload to s3 or on cloud
});
const logger = winston.createLogger({
    // format: logFormat,
    format: appFormat,
    transports: [
        transport, new winston.transports.Console(
            {level: 'info',
            handleExceptions: true,
            json: true,
            colorize: true}
        )
    ]
});
logger.info.bind(logger);
module.exports = logger;
