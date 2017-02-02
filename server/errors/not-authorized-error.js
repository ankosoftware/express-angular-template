import { ERROR_MESSAGES } from './error-messages';
import { ERROR_TYPES } from './error-types';
export class NotAuthorizedError extends Error {
    constructor(message = ERROR_MESSAGES.NOT_AUTHORIZED) {
        super(message);
        this.name = ERROR_TYPES.NOT_AUTHORIZED_ERROR;
    }
}