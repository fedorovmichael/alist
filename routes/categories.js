var express = require('express');
var router = express.Router();
var db_categories = require('../db/database_categories.js');
var db = require('../db/database.js');
var device = require('express-device');
var google = require('../google_sheets/data_provider.js');
var async = require('async');

router.use(device.capture());
device.enableDeviceHelpers(router);

router.get('/', function(req, res, next) {
  async.series([
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
      },
      function getItemsFromDB(callback)
      {
          db_categories.getItems(null, function(err, resultGetItems){
                if(err){
                    console.log("get items list from db error: ", err);
                    callback(err, null); 
                    return;
               }

               callback(null, resultGetItems);
            }) 
      },
      function getListsFromDB(callback)
      {          
          db.getListsWithCallback(function(err, resultGetLists){
                if(err){
                    console.log("get lists from db error: ", err);
                    callback(err, null); 
                    return;
               }

               callback(null, resultGetLists);
            })
      }
  ], 
  function(err, result){
      //console.log("categories data: +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    //   console.log(result[0]);
    //   console.log("");
      res.render('categories', { categories: result[0], items: result[1], lists: result[2] });
  });  
  
});

router.post('/getCategories', function(req, res, next) {
    async.series([
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
        res.json({ categories: result[0] });
    });
});

router.post('/createCategory', function(req, res, next) {
  console.log("create new category");

  var catergory = {id: req.body.id, name: req.body.name };

  async.series([
      function saveCategoryInDB(callback)
      {
          db_categories.createCategory(catergory, function(err, resultSaveCategoryInDB){
                if(err){
                    console.log("save categories in db error: ", err);
                    callback(err, null); 
                    return;
               }

               callback(null, resultSaveCategoryInDB);
            })        
      }
  ], 
  function(err, result){
      if(err){
         res.json({data: err});
      }
      else{
        res.json({data: result});
      }      
  }); 
});

router.post('/getItemsByCategoryID', function(req, res, next){
    
    var catergoryID = req.body.id;
    var listID = req.body.listID;

    console.log("");
    console.log("+++++++++++++++++++++++++++++++++++++ list id: ", listID);
    console.log("");

    async.series([
        function getItemsByCategoryIDFromDB(callback)
        {
            db_categories.getItems(listID, function(err, resultGetItems){
                if(err){
                    console.log("get items list from db error: ", err);
                    callback(err, null); 
                    return;
               }

               callback(null, resultGetItems);
            })      
        }
    ], 
    function(err, result){

        var arrDeselect = [], arrSelect = [], arrItems = result[0];

        for(var i = 0; i < arrItems.length; i++)
        {
            if(arrItems[i].category_id === catergoryID)
            {
                arrSelect.push(arrItems[i]);
            }
            else
            {
                arrDeselect.push(arrItems[i]);
            }
        }
        
        res.json({deselect : arrDeselect, select: arrSelect});
    });
});

router.post('/setItemCategoryID', function(req, res, next){
    
    var catergoryID = req.body.categoryID, itemID = req.body.itemID;
    
    async.series([
        function setItemCategoryIDInDB(callback)
        {
            db_categories.setItemCategoryID(catergoryID, itemID, function(err, resultSetItemCategoryID){
                if(err){
                    console.log("set item category id in db error: ", err);
                    callback(err, null); 
                    return;
               }

               callback(null, resultSetItemCategoryID);
            })      
        }
    ], 
    function(err, result){
        res.json({data: result[0]});
    });
});

router.post('/removeCategory', function(req, res, next) {
    
    var categoryID = req.body.id;
    
    async.series([
        function removeCategoryFromDB(callback)
        {
            db_categories.removeCategory(categoryID, function(err, resultRemoveCategory){
                  if(err){
                      console.log("remove category from db error: ", err);
                      callback(err, null); 
                      return;
                 }
  
                 callback(null, resultRemoveCategory);
              })        
        }
    ], 
    function(err, result){
        res.json({ result: result[0] });
    });
});

router.post('/updateCategory', function(req, res, next) {
    
    var categoryID = req.body.id, categoryName = req.body.name;
    
    async.series([
        function updateCategoryInDB(callback)
        {
            db_categories.updateCategory(categoryID, categoryName, function(err, resultUpdateCategory){
                  if(err){
                      console.log("update category in db error: ", err);
                      callback(err, null); 
                      return;
                 }
  
                 callback(null, resultUpdateCategory);
              })        
        }
    ], 
    function(err, result){
        res.json({ result: result[0] });
    });
});

router.post('/getCategoriesListByListID', function(req, res, next){
  console.log("get items list");
  db.getListItems(req, res, next);
  console.log('finish get items list');
});


module.exports = router;