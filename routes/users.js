var express = require('express');
var router = express.Router();
var us = require('../models/users.js');
var device = require('express-device');

router.use(device.capture());
device.enableDeviceHelpers(router);

router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/login', function(req, res, next) {
  console.log("render login page");
  res.render('login');
});

router.use('/userLogin', us.login);

router.post('/userLogin', function(req, res, next) {
  us.login();
});

router.get('/singup', function(req, res, next) {
  res.render('singup');
});

router.use('/userSignup', us.create);

router.post('/userSignup', function(req, res, next) {
  us.create();
});

router.use('/logout', us.logout);

router.post('/logout', function(req, res, next) {
  us.logout();
});

module.exports = router;