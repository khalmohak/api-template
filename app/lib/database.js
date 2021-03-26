// creating a database connection
const Pool = require('pg').Pool;
const connectionString = {
	host: '',
	port: 5432,
	database: '',
	user: '',
	password: ''
};

const tempConnectionString = {
	host: '',
	port: 5432,
	database: '',
	user: '',
	password: ''
};

module.exports = {
	//Connection String used by Massive to connect to the database
	connection_string: connectionString,

	connection: new Pool(connectionString),

	//Session key for Express-session
	session_key: '',
	app_key: '',
	app_secret: '',

	//Message to show in case of invalid data passed from frontend
	try_again: 'Invalid details, please try again',

	//Server Port
	server_port: 4000,


	//Mailer details here
	mailer_string: {
		host: 'smtpout.asia.secureserver.net',
		port: 465,
		auth: {
			user: '',
			pass: ''
		},
		tls: {
			rejectUnauthorized: false
		}
	}
};
