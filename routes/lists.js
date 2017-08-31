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
  var listID = null, arrItems = [], arrCategories = [];
  if(req.body.id != null || req.body.id != ""){
    listID = req.body.id;
  }
  console.log("");
  console.log("router -> getListItems: list id: ", req.body.id);
  console.log("");

  async.series([
    function getListItemsWithCallbackFromDB(callback)
    {
        db.getListItemsWithCallback(listID, function (err, resultGetListItemsWithCallback){
              if(err){
                  console.log("get list items from db error: ", err);
                  callback(err, null); 
                  return;
             };
             arrItems = resultGetListItemsWithCallback;
             callback(null, resultGetListItemsWithCallback);
          });        
    },
    function getCategoriesFromDB(callback)
    {
        db_categories.getCategories(function(err, resultGetCategories){
              if(err){
                  console.log("get categories list from db error: ", err);
                  callback(err, null); 
                  return;
             }

             arrCategories = resultGetCategories;
             callback(null, resultGetCategories);
          })        
    },
    function setCategories(callback)
    {
       orderByCategory(arrCategories, arrItems, function(err, resultOrderByCategory){
         if(err){
            console.log("order items by categories error: ", err);
            callback(err, null); 
            return;
         }
         callback(null, resultOrderByCategory);
       });
    }
  ], 
  function(err, result){   
    res.json({ data: result[2], countItems: result[0].length });
  });
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

// router.use('/getSelectedItems', db.getSelectedItems);

// router.post('/getSelectedItems', function(req, res, next) {
//   console.log("get selected items");
//   db.getSelectedItems();
//   console.log('finish retrieve selected items');
// });

router.post('/getSelectedItems', function(req, res, next) {  
  var listID = null, arrItems = [], arrCategories = [];
  if(req.body.id != null || req.body.id != ""){
    listID = req.body.id;
  }
  console.log("");
  console.log("router -> getSelectedItems: list id: ", req.body.id);
  console.log("");

  async.series([
    function getSelectedItemsWithCallbackFromDB(callback)
    {
        db.getSelectedItemsWithCallback(listID, function (err, resultGetSelectedItems){
              if(err){
                  console.log("get list selected items from db error: ", err);
                  callback(err, null); 
                  return;
             };
             arrItems = resultGetSelectedItems;
             callback(null, resultGetSelectedItems);
          });        
    },
    function getCategoriesFromDB(callback)
    {
        db_categories.getCategories(function(err, resultGetCategories){
              if(err){
                  console.log("get categories list from db error: ", err);
                  callback(err, null); 
                  return;
             }

             arrCategories = resultGetCategories;
             callback(null, resultGetCategories);
          })        
    },
    function setCategories(callback)
    {
       orderByCategory(arrCategories, arrItems, function(err, resultOrderByCategory){
         if(err){
            console.log("order items by categories error: ", err);
            callback(err, null); 
            return;
         }
         callback(null, resultOrderByCategory);
       });
    }
  ], 
  function(err, result){   
    res.json({ data: result[2], countItems: result[0].length });
  });
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

function orderByCategory(arrCategoriesIn, arrItemsIn, callback){
  try{
      var arrItems = arrItemsIn, arrCategories = arrCategoriesIn, dicItemsByCategoryID = {};        
    
      for(var i=0; i < arrItems.length; i++){
    
        var item = arrItems[i];
    
          if(item.category_id !='' && item.category_id != null && item.category_id != undefined){
          
            var index = arrCategories.findIndex(x => x.id === item.category_id);
    
          if(index != -1){
    
            var catName = arrCategories[index].name;
            item.category_name = catName;           
    
            if (!dicItemsByCategoryID.hasOwnProperty(arrCategories[index].id)) {          
                dicItemsByCategoryID[arrCategories[index].id] = [];
                dicItemsByCategoryID[arrCategories[index].id].push(item);
            }
            else{
              dicItemsByCategoryID[arrCategories[index].id].push(item);
            }
          }      
        }
        else{
          if (!dicItemsByCategoryID.hasOwnProperty("wocategory")){
              dicItemsByCategoryID["wocategory"] = [];              
          }       
          item.category_name = "ללא קטגוריה";  
          dicItemsByCategoryID["wocategory"].push(item);
        }
      }
      
      callback(null, dicItemsByCategoryID);
  }
  catch(e){
    callback(e, null);
  }
}


module.exports = router;
