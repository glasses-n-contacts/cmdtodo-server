const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const isProduction = process.env.NODE_ENV === 'production';

// mongodb models
require('./models/User');
require('./models/Todo');

require('./auth/passport');

// mongo init
let url = process.env.MONGO_URL || 'mongodb://localhost:27017/cmdtodo';
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true });

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/todo', require('./routes/todo'));
app.use('/user', require('./routes/user'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.sendStatus(404);
});

// error handlers for app
// error format: { message } as the body returned
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
} else {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {},
    });
  });
}

const port = 5170;
app.listen(port, async () => {
  console.log(`Backend server listening on port ${port}`);
});

module.exports = app;
