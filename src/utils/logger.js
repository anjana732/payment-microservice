import winston from "winston";
import path, { format } from 'path';
import morgan from "morgan";

const logDir = 'logs';
const errorLogPath = path.join(logDir, 'error.log');
const combinedLogPath = path.join(logDir, 'combined.log');
const accessLogPath = path.join(logDir, 'access.log');

const logFormat = winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.printf(info => {
        const message = typeof info.message === 'object' ? JSON.stringify(info.message) : info.message;
        const meta = info[Symbol.for('splat')] ? JSON.stringify(info[Symbol.for('splat')]) : '';
        return `${info.timestamp} [${info.level.toUpperCase()}] ${message} ${meta}`
    })
)

const jsonLogFormat = winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.json()
)

const transports = [];

if(process.env.NODE_ENV !== 'production'){
    transports.push(
        new winston.transports.Console({
            level: 'debug',
            format : winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            handleExceptions : true
        })
    );
}

transports.push(
    new winston.transports.File({
        filename: errorLogPath,
        level: 'error',
        format: jsonLogFormat,
        maxsize: 5 * 1024 * 1024,
        maxFiles: 5,
        tailable: true,
        handleExceptions: true
    }),
    new winston.transports.File({
        filename: combinedLogPath,
        level: 'info',
        format: jsonLogFormat,
        maxsize: 10* 1024 * 1024,
        maxFiles: 10,
        tailable: true
    })
);

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: logFormat,
    transports: transports,
    exitOnError: false
});


const accessLogger = winston.createLogger({
    level: 'info',
    format: jsonLogFormat,
    transports : [
        new winston.transports.File({
            filename: accessLogPath,
            maxsize: 10* 1024 * 1024,
            maxFiles: 10,
            tailable: true
        }),
        ...(process.env.NODE_ENV !== 'production' ? [new winston.transports.Console({format: winston.format.simple()})] : [])
    ],
    exitOnError: false
})

logger.stream = {
    write: function(message, encoding){
        accessLogger.info(message.trim())
    }
};

export {logger, accessLogger}