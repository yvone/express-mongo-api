const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

/* Create account */
router.post('/signup', function(req, res, next) {
	let body = req.body;
	// console.log('**** before bcrypt...', body.password);

	User.create(body)
		.then(result => {
			if(!result) return next({
				message: 'User couldnt be created',
				status: 422
			});
			// console.log('**** after bcrypt...', result.password);

			res.status(200).json({
				message: 'Yay! new account created',
				user: result,
			})
		})
		.catch(next);
});

/* Verify credentials, login */
router.post('/login', function(req, res, next) {
	let body = req.body
	
	if (!body.username || !body.password) {
		return next({
			message: 'Something is missing...',
			status: 403
		});
	}

	User.findOne({username: body.username})
		.then(user => {
			if(!user) return next({
				message: 'The password or username are incorrect, try again',
				status: 403
			});

			user.comparePassword(body.password, function(err, isMatch) {
				if(err) throw(err);

				if(!isMatch) return next({
					message: 'The password or username are incorrect, try again',
					status: 403
				})

				res.status(200).json({
					message: `Welcome my friend ${user.name}`,
					accessToken: 'accessToken'
				})
			})
		})
		.catch(next);
});

module.exports = router;
