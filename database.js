var pg = require("pg");
var db = {};

var connString = "";
//var client = new pg.Client(connString);
var config = {
    user: 'postgres',
    database: '',
    password: '',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

var arrData = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10"];

//console.log(create());


db.select = function (req, res, next)
{  
    var result = [];
    console.log("start");
    var queryDB = "SELECT * FROM list";

    console.log("connect to db");
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
    // var query = client.query(queryDB);
    
    // query.on("row", function(row){
    //     if(row)        
    //     {
    //         console.log("added row: " + row)
    //         result.push(row);
    //     }
    // });

    // query.on("end", function(){
    //     client.end();
    //     console.log("retrieved rows -> ", result);
    //     res.json({data: result});
        //callback(result);
        // res.json({data: arrData});
        // res.writeHead(200, {'Content-Type' : 'text/plain'});
        // res.write(JSON.stringify(result.rows, null, "  ")+ "\n");
        //res.end;
    //});

    // var rows = execute(queryDB);

    // console.log("retrieved rows -> ", rows);

    // if(rows)
    // {
    //     for(var i = 0; i < rows.rowCount; i++)
    //     {
    //         console.log("id = " + rows[i].id + "  name = " + rows[i].name);
    //     }
    // } 
}

//console.log(" start: " + select());

db.create = function (req, res, next)
{
    console.log("start create");    
    
    console.log("params ->  id: " + req.body.id +", name " + req.body.name);

    var id = req.body.id;
    var name = req.body.name;

    var queryDB = "INSERT INTO list(id, name) VALUES('" + id + "', '" + name + "' )";

    console.log("query db -> " + queryDB);

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
            res.json({data: result});
        });
    });   
}

db.delete = function (req, res, next)
{
    console.log("start delete");    
    
    console.log("params ->  id: " + req.body.id);

    var id = req.body.id;
    
    var queryDB = "DELETE FROM list WHERE id = '" + id + "'";

    console.log("query db -> " + queryDB);

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
            res.json({data: result});
        });
    });   
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
            res.json({data: result});
        });
    });   
}

db.getListItems = function (req, res, next)
{
    console.log("start get items list");    
    
    console.log("params ->  id: " + req.body.id);
    
    var id = req.body.id;
        
    var queryDB = "SELECT * FROM list_items WHERE list_id = '" + id + "'";

    console.log("query db -> " + queryDB);

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

db.getSelectedItems = function (req, res, next)
{
    console.log("start get selected items");    
    
    console.log("params -> list id: " + req.body.id);
    
    var id = req.body.id;
        
    var queryDB = "SELECT * FROM list_items WHERE list_id = '" + id + "' AND selected = true";

    console.log("query db -> " + queryDB);

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
            res.json({data: result});
        });
    });   
}

db.deleteItem = function (req, res, next)
{
    console.log("start delete");    
    
    console.log("params ->  id: " + req.body.id);

    var id = req.body.id;
    
    var queryDB = "DELETE FROM list_items WHERE id = '" + id + "'";

    console.log("query db -> " + queryDB);

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
            res.json({data: result});
        });
    });   
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
    
    var queryDB = "UPDATE list_items SET name = '"+ name + ", count = " + count + ", selected = " + selected +
    "' WHERE id = '" + id + "'";

    console.log("query db -> " + queryDB);

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
            res.json({data: result});
        });
    });   
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
            res.json({data: result});
        });
    });   
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
            res.json({data: result});
        });
    });   
}

db.clearSelectedItems = function (req, res, next)
{
    console.log("start clear selected items by list id");    
    
    console.log("params ->  id: " + req.body.id);
    
    var id = req.body.id;   
        
    var queryDB = "UPDATE list_items SET selected = false " + 
    " WHERE list_id = '" + id + "'";

    console.log("query db -> " + queryDB);

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
            res.json({data: result});
        });
    });   
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
            res.json({data: result});
        });
    });   
}

module.exports = db;
