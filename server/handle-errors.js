import logger from './logger';
import {ERROR_TYPES, ValidationError, BadRequestError} from './errors';

export default function handleErrors(err, req, res, next) {
        if(err) {
            logger.error(err);
            switch (err.name) {
                case ERROR_TYPES.MONGO_ERROR:
                    err = parseMongoError(err);
                    return handleErrors(err, req, res, next);
                case ERROR_TYPES.VALIDATION_ERROR:
                    if(err.errors) {
                        err = parseValidationError(err);
                        return handleErrors(err, req, res, next);
                    }
                    return res.status(400).json({error: err.message, fieldName: err.fieldName});
                case ERROR_TYPES.BAD_REQUEST_ERROR:
                    return res.status(400).json({error: err.message});
                case ERROR_TYPES.NOT_AUTHORIZED_ERROR:
                    return res.status(401).json({error: err.message});
                case ERROR_TYPES.NOT_PERMITTED_ERROR:
                    return res.status(403).json({error: err.message});
                case ERROR_TYPES.NOT_FOUND_ERROR:
                    return res.status(404).json({error: err.message});
                default:
                    return res.status(500).json({error: err.message || err});
            }
        }
        return next();
};

export function parseValidationError(err) {
    if(err.errors) {
        let keys = Object.keys(err.errors);
        if(keys.length>0) {
            let _err = err.errors[keys[0]];
            return new ValidationError(_err.message, _err.path);
        }
    }
    return new Error(err.message);
}

export function parseMongoError(err) {
    switch (err.code) {
        case 11000:
            let field = err.message.split("index:")[1];
            field = field.split(" dup key")[0];
            field = field.substring(0, field.lastIndexOf("_"));
            return new BadRequestError(`Invalid ${field} or already taken`);
        default:
            return new Error(err.message);
    }
}

process.on('uncaughtException', function (err) {
    logger.error('Catching uncaught errors to avoid process crash', err);
    throw err;
});
