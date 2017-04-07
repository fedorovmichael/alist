var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();
var us = require('../models/users.js');

/* logic user autentication do not remove for future use */
router.use('/', us.autByLogin);
router.get('/', function(req, res, next) {
  us.autByLogin();
});

module.exports = router;