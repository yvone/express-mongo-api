const mongoose = require('mongoose');

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

module.exports = mongoose.model('users', UserSchema);