import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import handleErrors from './handle-errors';
import logger, {Logger} from './logger';
import routes from './routes';
import session from './session';
import passport from './passport';
import props from '../properties';
import cors from "./cors";
import {initializeDB} from './db';

initializeDB();

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cors);
app.use(Logger);
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.use(handleErrors);


const server = app.listen(props.PORT, function() {
    logger.info('Server ready on port %d\n', server.address().port);
});