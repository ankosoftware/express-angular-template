import mongoose from 'mongoose';
import mongodbSession from 'connect-mongodb-session';
import logger from './logger';
import props from '../properties';

mongoose.Promise = Promise;

export function initializeDB() {
    mongoose.connect(props.MONGO_URL);
}

export function getSessionStore(session) {
    const SessionStore = mongodbSession(session);
    const store = new SessionStore({
        uri: props.MONGO_URL,
        collection: 'sessions'
    });

    //noinspection JSUnresolvedFunction
    store.on('error', function(error) {
        logger.error(error);
    });
    return store;
}