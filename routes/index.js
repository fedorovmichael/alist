var express = require('express');
var router = express.Router();
var db = require('../database.js');

var arrData = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10"];
var jsonData = '';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.use('/getFullList', db.select);

// router.use('/getFullList', function(req, res, next){
//   var db = require('../database.js');
//   db.select(function(data){ jsonData = data; });
//   next();
// });

router.post('/getFullList', function(req, res, next) {
  console.log('end send data, json data -> ' + jsonData);
  db.select();
  // res.json({ data: jsonData });
  // res.end;
  console.log('end send data');
});

router.use('/createNewList', db.create);

router.post('/createNewList', function(req, res, next) {
  console.log("create new list");
  db.create();
  // res.json({ data: jsonData });
  // res.end;
  console.log('finish create new list');
});

router.use('/deleteList', db.delete);

router.post('/deleteList', function(req, res, next) {
  console.log("delete list");
  db.delete();
  // res.json({ data: jsonData });
  // res.end;
  console.log('finish delete');
});

router.use('/updateList', db.update);

router.post('/updateList', function(req, res, next) {
  console.log("update list");
  db.update();
  // res.json({ data: jsonData });
  // res.end;
  console.log('finish update');
});

router.use('/getListItems', db.getListItems);

router.post('/getListItems', function(req, res, next) {
  console.log("get items list");
  db.getListItems();
  // res.json({ data: jsonData });
  // res.end;
  console.log('finish get items list');
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



module.exports = router;
