import { ERROR_MESSAGES } from './error-messages';
import { ERROR_TYPES } from './error-types';
export class NotPermittedError extends Error {
    constructor(message = ERROR_MESSAGES.NOT_PERMITTED) {
        super(message);
        this.name = ERROR_TYPES.NOT_PERMITTED_ERROR;
    }
}