'use strict';

var _expressSanitizer = require('express-sanitizer');

var _expressSanitizer2 = _interopRequireDefault(_expressSanitizer);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _massive = require('massive');

var _massive2 = _interopRequireDefault(_massive);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _database = require('./src/lib/database');

var _sample = require('./src/routes/sample.route');

var _sample2 = _interopRequireDefault(_sample);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//Importing modules

/**
 * Applying Middleware
 */
function applyMiddleware() {
    app.use((0, _cors2.default)());
    app.use((0, _expressSanitizer2.default)());
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({ extended: true }));
    app.use((0, _helmet2.default)());
}

/**
 * Initializing Database using Massive
 */
function initializingDatabase() {
    // noinspection JSUnresolvedFunction
    (0, _massive2.default)(_database.connection_string).then(function (db) {
        app.set('db', db);
        console.log('Database Connected');
    });
}

/**
 * Other Routes here
 */

app.use(_sample2.default);

applyMiddleware();
initializingDatabase();

app.listen(_database.server_port, function () {
    console.log('Server Started at port ' + _database.server_port);
});
