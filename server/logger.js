import winston from 'winston';
import morgan from 'morgan';

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ],
    exitOnError: false
});

//noinspection JSUnusedGlobalSymbols
export const loggerStream = {
    write: function(message) {
        logger.info(message);
    }
};

const morganOptions = {
    stream: loggerStream
};

export const Logger = morgan('combined', morganOptions);

export default logger;
