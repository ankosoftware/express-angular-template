import { ERROR_MESSAGES } from './error-messages';
import { ERROR_TYPES } from './error-types';
export class NotFoundError extends Error {
    constructor(message = ERROR_MESSAGES.NOT_FOUND) {
        super(message);
        this.name = ERROR_TYPES.NOT_FOUND_ERROR;
    }
}
