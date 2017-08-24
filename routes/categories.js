var express = require('express');
var router = express.Router();
var db = require('../db/database.js');
var device = require('express-device');
var google = require('../google_sheets/data_provider.js');

router.use(device.capture());
device.enableDeviceHelpers(router);

router.use('/getCategories', db.getCategories);
router.post('/getCategories', function(req, res, next) {
  console.log("get list categories");
  db.getCategories();
  console.log('finish get list categories');
});

router.use('/createCategory', db.createCategory);
router.post('/createCategory', function(req, res, next) {
  console.log("create new category");
  db.createCategory();
  console.log('finish create new category');
});

module.exports = router;