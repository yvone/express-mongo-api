const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

/* Create account */
router.post('/signup', function(req, res, next) {
	let body = req.body;

	if (!body.username || !body.password) {
		return next({
			message: 'Something is missing...',
			status: 422
		});
	}
	// console.log('**** before bcrypt...', body.password);

	User.create(body)
		.then(result => {
			if(!result) return next({
				message: 'user couldnt be created',
				status: 422
			});
			// console.log('**** after bcrypt...', result.password);

			res.status(200).json({
				message: 'yay! new account created',
				user: result,
			})
		})
		.catch(next);
});

module.exports = router;
