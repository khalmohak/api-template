import {connection} from '../../lib/database';
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

