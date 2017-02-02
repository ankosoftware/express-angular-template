import session from 'express-session';
import {getSessionStore} from './db';

const WEEK = 1000 * 60 * 60 * 24 * 7;

export default session({
      secret: 'secret',
      cookie: {
          maxAge: WEEK
      },
      store: getSessionStore(session),
      resave: true,
      saveUninitialized: true
});
