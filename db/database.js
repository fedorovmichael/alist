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
    var active = req.body.active;
    var refreshActive = "";
    
    if(active)
    {
        refreshActive = "UPDATE list SET active = false;";
    }

    var queryDB = refreshActive + " UPDATE list SET name = '"+ name +"', active = "+ active +" WHERE id = '" + id + "';";

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

db.getSelectedItems = function (req, res, next)
{
    console.log("start get selected items");    
    
    console.log("params -> list id: " + req.body.id);
    
    var id = req.body.id;
        
    var queryDB = "SELECT * FROM list_items WHERE list_id = '" + id + "' AND selected = true";

    console.log("query db -> " + queryDB);
    getMultipleResponse(res, queryDB);
}

db.setActiveList = function (req, res, next)
{
    console.log("start update");    
    
    console.log("params ->  id: " + req.body.id);
    console.log("params ->  selected: " + req.body.selected);

    var id = req.body.id; 
    var selected = req.body.selected;
    
    var queryDB = "UPDATE list SET active = " + selected +
    " WHERE id = '" + id + "'";

    console.log("query db -> " + queryDB);
    getSingleResponse(res, queryDB);   
}

//ITEMS ===================================================================

db.createItem = function (req, res, next)
{
    console.log("start create item");    
    console.log("params ->  id: " + req.body.id +", name: " + req.body.name + ", count: " + req.body.count +", selected: " + req.body.selected + ", list id: " + req.body.listID);

    var id = req.body.id;
    var name = req.body.name;
    var count = req.body.count;
    var selected = req.body.selected;
    var listID = req.body.listID;

    var queryDB = "INSERT INTO list_items(id, name, count, selected, list_id) VALUES('" + id + "', '" + name + "','" + count + "', '" + selected + "', '" + listID + "')";

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
    
    var queryDB = "UPDATE list_items SET name = '"+ name + "', count = '" + count + "', selected = '" + selected + "' WHERE id = '" + id + "'";    

    console.log("query db -> " + queryDB);
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

function getSingleResponse(res, queryDB)
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
            console.log("retrieved result -> ", result);
            res.json({data: result});
        });
    }); 
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

module.exports = db;
