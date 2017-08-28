var pg = require("pg");
var appConfig = require("../config/index.js");
var db = {};

appConfig.loadConfig();

var config = {
    user: appConfig.getConfig("db", "user"),
    database: appConfig.getConfig("db", "database"),
    password: appConfig.getConfig("db", "password"),
    host: appConfig.getConfig("db", "host"),
    port: appConfig.getConfig("db", "port"),
    max: appConfig.getConfig("db", "max"),
    idleTimeoutMillis: appConfig.getConfig("db", "idleTimeoutMillis")
};

var pool = new pg.Pool(config);


//CATEGORIES ===================================================================
db.getCategories = function (callback)
{
    var queryDB = "select * from categories";

    console.log("query db -> " + queryDB);
    getMultipleResponse(callback, queryDB);
}

db.createCategory = function (category, callback)
{
    console.log("start create category");   

    var queryDB = "INSERT INTO categories(id, name) VALUES('" + category.id + "', '" + category.name + "')";

    console.log("query db -> " + queryDB);
    getSingleResponse(callback, queryDB);
}

db.getItems = function (callback)
{
    var queryDB = "select * from list_items";

    console.log("query db -> " + queryDB);
    getMultipleResponse(callback, queryDB);
}

db.getItemsByCategoryID = function(categoryID, callback)
{
    var queryDB = "select * from list_items where category_id = '" + categoryID + "'";

    console.log("query db -> " + queryDB);
    getMultipleResponse(callback, queryDB);
}

db.setItemCategoryID = function(categoryID, itemID, callback)
{
    var queryDB = "update list_items set category_id = '"+ categoryID +"' where id = '" + itemID + "'";

    console.log("query db -> " + queryDB);
    getMultipleResponse(callback, queryDB);
}

db.removeCategory = function(categoryID, callback)
{
    var queryDB = "delete from categories where id = '"+ categoryID +"'";
    
    console.log("query db -> " + queryDB);
    getSingleResponse(callback, queryDB);
}

db.updateCategory = function(categoryID, categoryName, callback)
{
    var queryDB = "update categories set name = '"+ categoryName +"' where id = '"+ categoryID +"'";
    
    console.log("query db -> " + queryDB);
    getSingleResponse(callback, queryDB);
}

//GENERAL FUNCTIONS==========================================================

function getSingleResponse(cb, queryDB)
{
   pool.connect(function(err, client, done){
        if(err)
        {
            console.error("connection error -> " + err);
        }
        else
        {
            console.log("success connec to db");
        }

        client.query(queryDB, function(err, result){
            done();
            if(err)
            {
                console.error("send query error -> ", err);
                cb(err, null);
                return;                
            }
            //console.log("retrieved result -> ", result);
            cb(null, result);
        });
    }); 
}

function getMultipleResponse(cb, queryDB)
{
   pool.connect(function(err, client, done){
        if(err)
        {
            console.error("connection error -> " + err);
        }
        else
        {
            console.log("success connec to db");
        }

        client.query(queryDB, function(err, result){
            done();
            if(err)
            {
                console.error("send query error -> ", err);
                cb(err, null);
                return;
            }
            //console.log("retrieved rows -> ", result);
            cb(null, result.rows);
        });
    });   
}

module.exports = db;