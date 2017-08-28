var express = require('express');
var router = express.Router();
var db = require('../db/database.js');
var db_categories = require('../db/database_categories.js');
var device = require('express-device');
var google = require('../google_sheets/data_provider.js');
var async = require('async');

router.use(device.capture());
device.enableDeviceHelpers(router);

/* GET home page. */
router.get('/', function(req, res, next) {
  // if(req.session.user){
        res.render('lists');
  //   }
  // else{
  //   res.render('login');
  // }
  
});

router.use('/getFullList', db.select);

router.post('/getFullList', function(req, res, next) {
  console.log('get full list ');
  db.select();
  console.log('finish retrieve full list');
});

router.use('/createNewList', db.create);

router.post('/createNewList', function(req, res, next) {
  console.log("create new list");
  db.create();
  console.log('finish create new list');
});

router.use('/deleteList', db.delete);

router.post('/deleteList', function(req, res, next) {
  console.log("delete list");
  db.delete();
  console.log('finish delete');
});

router.use('/updateList', db.update);

router.post('/updateList', function(req, res, next) {
  console.log("update list");
  db.update();
  console.log('finish update');
});

// router.use('/getListItems', db.getListItems);

// router.post('/getListItems', function(req, res, next) {
//   console.log("get items list");
//   db.getListItems();
//   console.log('finish get items list');
// });

router.post('/getListItems', function(req, res, next) {
  
  var listID = req.body.id;
  
  async.series([
    function getListItemsWithCallbackFromDB(callback)
    {
        db.getListItemsWithCallback(listID, function(err, resultGetListItemsWithCallback){
              if(err){
                  console.log("get list items from db error: ", err);
                  callback(err, null); 
                  return;
             }

             callback(null, resultGetListItemsWithCallback);
          })        
    },
    function getCategoriesFromDB(callback)
    {
        db_categories.getCategories(function(err, resultGetCategories){
              if(err){
                  console.log("get categories list from db error: ", err);
                  callback(err, null); 
                  return;
             }

             callback(null, resultGetCategories);
          })        
    }
], 
function(err, result){
    //console.log("categories data: +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  //   console.log(result[0]);
  //   console.log("");
  var arrItems = result[0], arrCategories = result[1];

    res.json({ categories: result[0] });
});


  console.log("get items list");
  db.getListItemsWithCallback();
  console.log('finish get items list');
});

router.use('/setActiveList', db.setActiveList);

router.post('/setActiveList', function(req, res, next) {
  console.log("get items list");
  db.setActiveList();
  console.log('finish get items list');
});

router.use('/getSelectedItemsAndPhones', db.getSelectedItemsAndPhones);

router.post('/getSelectedItemsAndPhones', function(req, res, next) {
  console.log("get selected items and phone numbers");
  db.getSelectedItemsAndPhones();
  console.log('finish get selected items and phone numbers');
});

router.use('/updateGoogleSheets', google);

router.post('/updateGoogleSheets', function(req, res, next) {
  console.log("update google sheets data");
  google();
  console.log('finish update google sheets data');
});

//ITEMS ===================================================================

router.use('/createItem', db.createItem);

router.post('/createItem', function(req, res, next) {
  console.log("create new item");
  db.createItem();  
  console.log('finish create new item');
});

router.use('/deleteItem', db.deleteItem);

router.post('/deleteItem', function(req, res, next) {
  console.log("delete item");
  db.deleteItem();
  console.log('finish delete item');
});

router.use('/updateItem', db.updateItem);

router.post('/updateItem', function(req, res, next) {
  console.log("update item");
  db.updateItem();
  console.log('finish update item');
});

router.use('/setSelectedAndCountItem', db.setSelectedAndCountItem);

router.post('/setSelectedAndCountItem', function(req, res, next) {
  console.log("set selected and count for item");
  db.setSelectedAndCountItem();
  console.log('finish set selected and count for item');
});

router.use('/getSelectedItems', db.getSelectedItems);

router.post('/getSelectedItems', function(req, res, next) {
  console.log("get selected items");
  db.getSelectedItems();
  console.log('finish retrieve selected items');
});

router.use('/updateCountItem', db.updateCountItem);

router.post('/updateCountItem', function(req, res, next) {
  console.log("update count of item");
  db.updateCountItem();
  console.log('finish update count of item');
});

router.use('/clearSelectedItems', db.clearSelectedItems);

router.post('/clearSelectedItems', function(req, res, next) {
  console.log("clear selected items");
  db.clearSelectedItems();
  console.log('finish clear selected items');
});

router.use('/updateCompleteValue', db.updateCompleteValue);

router.post('/updateCompleteValue', function(req, res, next) {
  console.log("update complete value");
  db.updateCompleteValue();
  console.log('finish update complete value');
});

module.exports = router;
