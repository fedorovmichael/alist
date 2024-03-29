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

db.select = function (req, res, next)
{  
    var result = [];
    var userID = '';
    console.log("start");
    
    if(req.session.user)
    {
        console.log('****************************************************** get user id from session ****************************************************');
        console.log(' ');
        console.log(' ');
        console.log("user session is -> ", req.session.user);
        console.log("user id is -> ", req.session.user.id);
        userID = req.session.user.id;
    }
    
    var queryDB = "SELECT * FROM list";

    console.log("connect to db");
    getMultipleResponse(res, queryDB);    
}

db.getListsWithCallback = function(callback)
{
    var queryDB = "SELECT * FROM list";

    console.log("connect to db");
    getMultipleResponseWithCallback(callback, queryDB);
}


db.create = function (req, res, next)
{
    console.log("start create");    
    
    console.log("params ->  id: " + req.body.id +", name " + req.body.name);

    var id = req.body.id;
    var name = req.body.name;

    var queryDB = "INSERT INTO list(id, name) VALUES('" + id + "', '" + name + "' )";

    console.log("query db -> " + queryDB);
    getSingleResponse(res, queryDB);
}

db.delete = function (req, res, next)
{
    console.log("start delete");    
    
    console.log("params ->  id: " + req.body.id);

    var id = req.body.id;
    
    var queryDB = "DELETE FROM list WHERE id = '" + id + "'";

    console.log("query db -> " + queryDB);
    getSingleResponse(res, queryDB);  
}

db.update = function (req, res, next)
{
    console.log("start update");    
    
    console.log("params ->  id: " + req.body.id);
    console.log("params ->  name: " + req.body.name);

    var id = req.body.id;
    var name = req.body.name;   

    var queryDB = " UPDATE list SET name = '"+ name +"' WHERE id = '" + id + "';";

    console.log("query db -> " + queryDB);
    getSingleResponse(res, queryDB);   
}

db.getListItems = function (req, res, next)
{
    console.log("start get items list");    
    
    console.log("params ->  id: " + req.body.id);
    
    var id = req.body.id;
        
    var queryDB = "SELECT * FROM list_items WHERE list_id = '" + id + "' ORDER BY selected DESC";

    console.log("query db -> " + queryDB);
    getMultipleResponse(res, queryDB);
}

db.getListItemsWithCallback = function(listID, callback)
{
    console.log("start get items list with callback");
    console.log("callback function: ========================================");
    console.log(callback);   
        
    var queryDB = "SELECT * FROM list_items WHERE list_id = '" + listID + "' ORDER BY selected DESC";

    console.log("getListItemsWithCallback query db -> " + queryDB);
    getMultipleResponseWithCallback(callback, queryDB);
}

db.getSelectedItems = function (req, res, next)
{
    console.log("start get selected items");    
    
    console.log("params -> list id: " + req.body.id);
    
    var id = req.body.id;
        
    var queryDB = "SELECT * FROM list_items WHERE list_id = '" + id + "' AND selected = true  ";

    console.log("query db -> " + queryDB);
    getMultipleResponse(res, queryDB);
}

db.getSelectedItemsWithCallback = function(listID, callback)
{
    console.log("start get selected items list with callback");
    console.log("callback function: ========================================");
    //console.log(callback);   
        
    var queryDB = "SELECT * FROM list_items WHERE list_id = '" + listID + "' AND selected = true ";

    console.log("query db -> " + queryDB);
    getMultipleResponseWithCallback(callback, queryDB);
}

db.setActiveList = function (req, res, next)
{
    console.log("start update");    
    
    console.log("params ->  id: " + req.body.id);
    console.log("params ->  selected: " + req.body.selected);

    var id = req.body.id; 
    var selected = req.body.selected;
    
    var queryDB = "UPDATE list SET active = false; UPDATE list SET active = " + selected +
    " WHERE id = '" + id + "';";

    console.log("query db -> " + queryDB);
    getSingleResponse(res, queryDB);   
}

db.getSelectedItemsAndPhones = function (req, res, next)
{
    console.log("start get selected items");    
    
    console.log("params -> list id: " + req.body.id);
    
    var id = req.body.id;
    var resSelectedItems;
    var resPhoneNumbers;
        
    var queryDBItems = "SELECT * FROM list_items WHERE list_id = '" + id + "' AND selected = true  order by complete, name ASC"
    var queryDBPhoneNumbers = "SELECT * FROM phone_numbers WHERE list_id= '" + id + "'";

    console.log("query db selected items -> " + queryDBItems);
    console.log("query db phone numbers -> " + queryDBPhoneNumbers);

    pool.connect(function(err, client, done){
        if(err)
        {
            console.error("connection error -> " + err);
        }
        else
        {
            console.log("success connec to db");
        }
        //get selected items by list id
        client.query(queryDBItems, function(err, result){            
            if(err)
            {
                console.error("send query error -> ", err);
            }
            console.log("retrieved rows selected items -> ", result.rows);
            resSelectedItems = result.rows;
            //res.json({data: result.rows});

            //get phone numbers by list id
            client.query(queryDBPhoneNumbers, function(err, result){           
                if(err)
                {
                    console.error("send query error -> ", err);
                }
                console.log("retrieved rows phone numbers -> ", result.rows);
                resPhoneNumbers = result.rows;
                //res.json({data: result.rows});
                console.log("send response selected Items: ", resSelectedItems);
                console.log("send response phone numbers: ", resPhoneNumbers);

                res.json({selectedItems: resSelectedItems, phoneNumbers: resPhoneNumbers });
            });
        });       

        done();
    });    
}


//ITEMS ===================================================================

db.createItem = function (req, res, next)
{
    console.log("start create item");    
    console.log("params ->  id: " + req.body.id +", name: " + req.body.name + ", count: " + req.body.count +", selected: " + req.body.selected + ", list id: " + req.body.listID +", measure: " + req.body.measure);

    var id = req.body.id;
    var name = req.body.name;
    var count = req.body.count;
    var selected = req.body.selected;
    var listID = req.body.listID;
    var measure = req.body.measure;

    var queryDB = "INSERT INTO list_items(id, name, count, selected, list_id, measures) " + 
    " VALUES('" + id + "', '" + name + "','" + count + "', '" + selected + "', '" + listID + "', '"+ measure +"')";

    console.log("query db -> " + queryDB);
    getSingleResponse(res, queryDB);
}

db.deleteItem = function (req, res, next)
{
    console.log("start delete");    
    
    console.log("params ->  id: " + req.body.id);

    var id = req.body.id;
    
    var queryDB = "DELETE FROM list_items WHERE id = '" + id + "'";

    console.log("query db -> " + queryDB);
    getSingleResponse(res, queryDB);
}

db.updateItem = function (req, res, next)
{
    console.log("start update");    
    
    console.log("params ->  id: " + req.body.id);
    console.log("params ->  name: " + req.body.name);

    var id = req.body.id;
    var name = req.body.name;
    var count = req.body.count;
    var selected = req.body.selected;
    var measure = req.body.measure;
    var listID = req.body.listID;
    var updateListID = "";

    if(listID != null){
        updateListID = ", list_id = '" + listID +"'";
    }
    
    var queryDB = "UPDATE list_items SET name = '"+ name + "', count = '" + count + "', selected = '" + selected + "', measures = '"+ measure +"' "+ updateListID +"  WHERE id = '" + id + "'";    
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("updateItem query db -> " + queryDB);
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    getSingleResponse(res, queryDB);
}

db.setSelectedAndCountItem = function (req, res, next)
{
    console.log("start update");    
    
    console.log("params ->  id: " + req.body.id);
    console.log("params ->  selected: " + req.body.selected);
    console.log("params ->  count: " + req.body.count);

    var id = req.body.id;   
    var count = req.body.count;
    var selected = req.body.selected;
    
    var queryDB = "UPDATE list_items SET count = " + count + ", selected = " + selected +
    " WHERE id = '" + id + "'";

    console.log("query db -> " + queryDB);
    getSingleResponse(res, queryDB);
}

db.updateCountItem = function (req, res, next)
{
    console.log("start update");    
    
    console.log("params ->  id: " + req.body.id);
    console.log("params ->  count: " + req.body.count);

    var id = req.body.id;   
    var count = req.body.count;
    
    var queryDB = "UPDATE list_items SET count = " + count + 
    " WHERE id = '" + id + "'";

    console.log("query db -> " + queryDB);
    getSingleResponse(res, queryDB);
}

db.clearSelectedItems = function (req, res, next)
{
    console.log("start clear selected items by list id");    
    
    console.log("params ->  id: " + req.body.id);
    
    var id = req.body.id;   
        
    var queryDB = "UPDATE list_items SET selected = false, complete = false" +
    " WHERE list_id = '" + id + "'";

    console.log("query db -> " + queryDB);
    getSingleResponse(res, queryDB);
}

db.updateCompleteValue = function (req, res, next)
{
    console.log("start update");    
    
    console.log("params ->  id: " + req.body.id);
    console.log("params ->  complete: " + req.body.complete);    

    var id = req.body.id;   
    var complete = req.body.complete;   
    
    var queryDB = "UPDATE list_items SET complete = " + complete + " WHERE id = '" + id + "'";

    console.log("query db -> " + queryDB);
    getSingleResponse(res, queryDB);
}

//GENERAL FUNCTIONS==========================================================

async function getSingleResponse(res, queryDB)
{
    let result;
    try {
        result = await pool.query(queryDB);
        console.log('getSingleResponse result: ', result);
    } 
    catch (error) {
        console.error("send query error -> ", error);
        throw Error(error)
    } 
    res.json({data: result});

//    pool.connect(function(err, client, done){
//         if(err)
//         {
//             console.error("connection error -> " + err);
//         }
//         else
//         {
//             console.log("success connec to db");
//         }

//         client.query(queryDB, function(err, result){
//             done();
//             if(err)
//             {
//                 console.error("send query error -> ", err);
//             }
//             console.log("retrieved result -> ", result);
//             res.json({data: result});
//         });
//     }); 
}

function getMultipleResponse(res, queryDB)
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
            }
            console.log("retrieved rows -> ", result);
            res.json({data: result.rows});
        });
    });   
}

function getMultipleResponseWithCallback(cb, queryDB)
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
            console.log("callback function ++++++++++++++++++++++++++++++++++++++++:");
            console.log(cb);
            console.log("query ++++++++++++++++++++++++++++++++++++++++:");
            console.log(queryDB);
            if(cb != undefined){
                console.log("return result  ++++++++++++++++++++++++++++++++++++++++:");
                console.log(result.rows);
                cb(null, result.rows);
            }
        });
    });   
}

module.exports = db;
