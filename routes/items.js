var express = require('express');
var router = express.Router();
var db_items = require('../db/database_items');
var db_lists = require('../db/database');
var async = require('async');
var device = require('express-device');

router.use(device.capture());
device.enableDeviceHelpers(router);

router.get('/', function(req, res, next) {

    async.series([
        function getItemsFromDB(callback)
        {
            db_items.getItems(function(err, resultGetItems){
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
            db_lists.getListsWithCallback(function(err, resultGetLists){
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
      res.render('items', {title: "items", items: result[0], lists: result[1] });
    });
    
});

router.get('/items_print', function(req, res, next) {
    
        async.series([
            function getItemsFromDB(callback)
            {
                db_items.getItems(function(err, resultGetItems){
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
            //console.log("categories data: +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
          //   console.log(result[0]);
          //   console.log("");
          res.render('items_print', {title: "print items", items: result[0] });
        });
        
    });

module.exports = router;