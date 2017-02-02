import {ERROR_MESSAGES} from './error-messages';
import {ERROR_TYPES} from './error-types';
export class BadRequestError extends Error {
    constructor(message=ERROR_MESSAGES.BAD_REQUEST_ERROR) {
        super(message);
        this.name = ERROR_TYPES.BAD_REQUEST_ERROR;
    }
}