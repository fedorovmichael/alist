var pg = require("pg");
var uuid = require('node-uuid');
var bcrypt = require('bcrypt-nodejs');
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

db.create = function(user, cb)
{
    console.log("create user");

    var queryDB = "INSERT INTO user_account(id, name, login, email, password, enable) " +
                  "VALUES('" + user.id + "', '" + user.name + "','" + user.login + "', '" + user.email + "', '" + user.password + "', '" + user.enable + "')";

    console.log("query db -> " + queryDB);
    getSingleResponse(queryDB, cb);
}

db.search = function(login, cb)
{
    console.log("login user");    
    
    console.log("params ->  login: " + login);

    var queryDB = "SELECT * FROM user_account WHERE login='"+ login +"'";

    console.log("query db -> " + queryDB);
    getMultipleResponse(queryDB, cb);
}

db.update = function()
{
    
}

db.remove = function()
{
    
}

db.login = function (req, res, next)
{
    console.log("login user");    
    
    console.log("params ->  email: " + req.body.email +", password " + req.body.password);

    var login = req.body.login;
    var password = req.body.password;

    var queryDB = "SELECT * FROM user_account WHERE login='"+ login +"'";

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

            console.log("retrieved result -> ", result);

            if(result)
            {
              if(bcrypt.compareSync(password, result.rows[0].password))
              {  
                res.render('lists');
              }
              else
              {
                res.render('login');
              }
            }
            else
            {
              res.render('login');
            }            
        });
    });
}

db.signup = function (req, res, next)
{
    console.log("signup user");    
    
    console.log("params ->  email: " + req.body.email +", password " + req.body.password);

    var id = uuid.v1();
    id = id.replace(/-/g, '');
    var name = req.body.name;
    var login = req.body.login;
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password);
    var enable = true;

    var queryDB = "INSERT INTO user_account(id, name, login, email, password, enable) " +
                  "VALUES('" + id + "', '" + name + "','" + login + "', '" + email + "', '" + password + "', '" + enable + "')";

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
                var error = (err.detail).replace(/Key/g, '').replace(/=/g, ' ').replace(/\(/g,'').replace(/\)/g, '');
                console.error("send query error details -> ", error);
                res.render("singup", {messageType: "error", messageBody: error});
            }
            else
            {
                console.log("retrieved result -> ", result);
                res.render("singup", {messageType: "success", messageBody: "create new account success"});
                //res.json({data: result});
            }
        });
    });
}

function getSingleResponse(queryDB, cb)
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
            cb(err, result);
        });
    }); 
}

function getMultipleResponse(queryDB, cb)
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
            cb(err, result.rows);
        });
    });   
}

module.exports = db;