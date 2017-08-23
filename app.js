var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieEncrypter = require('cookie-encrypter');
var session = require('express-session');
var appConfig = require("./config/index.js");

var index = require('./routes/index');
var users = require('./routes/users');
var lists = require('./routes/lists');
var categories = require('./routes/categories');

var app = express();
//load configuration
appConfig.loadConfig();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(appConfig.getConfig("cookie", "secret")));
app.use(cookieEncrypter(appConfig.getConfig("cookie", "secret")));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: appConfig.getConfig("session", "secret")}));


//lists
app.use('/lists', lists);
app.use('/getFullList', lists);
app.use('/createNewList', lists);
app.use('/deleteList', lists);
app.use('/updateList', lists);
app.use('/getListItems', lists);
app.use('/createItem', lists);
app.use('/deleteItem', lists);
app.use('/updateItem', lists);
app.use('/setSelectedAndCountItem', lists);
app.use('/getSelectedItems', lists);
app.use('/updateCountItem', lists);
app.use('/clearSelectedItems', lists);
app.use('/setActiveList', lists);
app.use('/updateCompleteValue', lists);
app.use('/getSelectedItemsAndPhones', lists);
app.use('/updateGoogleSheets', lists);

//users
app.use('/users', users);
app.use('/login', users);
app.use('/logout', users);
app.use('/singup', users);
app.use('/userLogin', users);
app.use('/userSignup', users);

//categories
app.use('/getCategories', categories);
app.use('/createCategory', categories);

//index
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
