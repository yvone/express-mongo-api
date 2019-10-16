const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

/* Create account */
router.post('/signup', function(req, res, next) {
	let body = req.body;
	console.log(body);

	if (!body.username || !body.password) {
		console.log('!!!! errors');
		return next({
			message: 'Something is missing...',
			error: 422
		});
	}
	console.log('yay no errors');

	User.create(body)
		.then(result => {
			if(!result) return next({
				message: 'user couldnt be created',
				type: 422
			});

			res.status(200).json({
				message: 'yay! new account created',
				user: result,
			})
		})
		.catch(next);
});

module.exports = router;
