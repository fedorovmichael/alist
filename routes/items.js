var express = require('express');
var router = express.Router();
var db_items = require('../db/database_items');
var async = require('async');

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
        }
    ], 
    function(err, result){
        //console.log("categories data: +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      //   console.log(result[0]);
      //   console.log("");
      res.render('items', {title: "items", items: result[0]});
    });

    
});

module.exports = router;