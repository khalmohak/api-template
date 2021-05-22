import expressSanitizer from 'express-sanitizer';
import helmet from 'helmet';
import cors from 'cors';
import massive from 'massive';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();

//Importing modules

import {connection_string,server_port} from './src/lib/database';
import sampleRouter from './src/routes/sample.route';

/**
 * Applying Middleware
 */
function applyMiddleware() {
    app.use(cors());
    app.use(expressSanitizer());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(helmet());
}


/**
 * Initializing Database using Massive
 */
function initializingDatabase() {
    // noinspection JSUnresolvedFunction
    massive(connection_string).then(db => {
        app.set('db', db);
        console.log('Database Connected')
    });
}


/**
 * Other Routes here
 */

app.use(sampleRouter);



applyMiddleware()
initializingDatabase();



app.listen(server_port, () => {
    console.log(`Server Started at port ${server_port}`);
});
