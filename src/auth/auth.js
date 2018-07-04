const credentials = require('../getCredentials')();
const jwt = require('express-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const auth = jwt({
  secret: credentials.secret,
  userProperty: 'payload',
});

const findUser = (req, res, next) => {
  User.findById(req.payload._id).exec()
  .then(user => {
    req.user = user;
    next();
  })
  .catch(next);
};

module.exports = [auth, findUser];
