const taskController = require('./app/task/taskController');
const authentication = require('./app/auth/authentication');
const express = require('express');
const bodyParser = require('body-parser');
const common = require('./app/lib/database');
const expressSanitizer = require('express-sanitizer');
const helmet = require('helmet');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./app/firebaseKey.json');
const massive = require('massive');
const app = express();
const verifyToken = authentication.verifyToken;

/**
 * Applying Middleware
 */
function applyMiddleware() {
    app.use(cors());
    app.use(expressSanitizer());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(helmet());
    app.use(session({
        secret: common.session_key,
        resave: true,
        saveUninitialized: false
    }));
}

/**
 * Initializing Database using Massive
 */
function initializingDatabase() {
    // noinspection JSUnresolvedFunction
    massive(common.connection_string).then(db => {
        app.set('db', db);
        console.log('db connected!')
    });
}

/**
 * Initializing Firebase admin with the respective database
 */
function initializingApp() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://cyndi-admin.firebaseio.com"
    });
    app.set('firebaseAdmin', admin);
}

/**
 * Other Routes here
 */





applyMiddleware()
initializingDatabase();
initializingApp();



app.listen(common.server_port, () => {
    console.log('Server Started');
});
