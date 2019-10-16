const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

mongoose.connect('mongodb://localhost:27017/apiDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', usersRouter);

// app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

// function logErrors (err, req, res, next) {
//   console.error(err.stack)
//   next(err)
// }

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  res.status(err.status || 500).json({ error: err })
}

app.get('*', (req,res,next) => {
	res.sendStatus(404);
})

module.exports = app;
