let pool = require('../lib/database').connection;
const common = require('../lib/database');
const parseJson = require('parse-json');
const http = require("https");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const isEmpty = require('is-empty');
const mailer = require('nodemailer');
require('body-parser');

const sampleFunction = async (req, res) => {
	const db = req.app.get('db');
	const text = req.sanitize(req.body.text);

	if (text) {
		let response = await db.sqlFile({text});
		if (response && response.length > 0) {
			res.status(200).end(JSON.stringify(response));
		} else {
			res.status(200).end('Not here');
		}
	} else {
		res.status(201).end(common.try_again);
	}
};

module.exports = {
	sampleFunction
};

