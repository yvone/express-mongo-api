const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT = 10;

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, "Can't be blank!" ]
	},
	username: {
		type: String,
		lowercase: true,
		required: [ true, "Can't be blank!" ],
		match: [ /^[a-zA-Z0-9]+$/, 'is invalid!' ],
		index: { unique: true },
	},
	email: {
		type: String,
		lowercase: true,
		required: [ true, "Can't be blank!" ],
		match: [ /\S+@\S+.\S+/, 'is invalid!' ],
		index: { unique: true },
	},
	password: {
		type: String,
		required: [ true, "Can't be blank!" ]
	},
});

UserSchema.pre('save', function(next) {
	let user = this;

	if(!user.isModified('password')) return next();

	bcrypt.hash(user.password, SALT, (err, hash) => {
		if(err) return next(err);

		user.password = hash;
		next();
	})
})

module.exports = mongoose.model('users', UserSchema);