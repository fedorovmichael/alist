var db = require('../db/database_user.js');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt-nodejs');
var us = {};


us.create = function(req, res, next)
{
    var usID = uuid.v1();
    usID = usID.replace(/-/g, '');

    var user = {
        id: usID,
        name: req.body.name,
        login: req.body.login,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        enable: true
    };

    db.create(user, function(err, result){
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
        }
    });
}

us.login = function(req, res, next)
{
    var rememberMe = req.body.rememberMe ? true : false;

    console.log("remember me is -> ", rememberMe);

    db.search(req.body.login, function(err, rows)
    {
        if(err){
            console.log("login error -> ", err);
        }
        else{
             if(rows.length > 0)
             {
                if(bcrypt.compareSync(req.body.password, rows[0].password)) 
                   {
                       if(rememberMe)
                       {
                           console.log("password is -> ", rows[0].password);
                           console.log('Decrypted cookies: ', req.cookies);
                        //    if(req.cookies.access_token)
                        //       {
                        //           res.clearCookie('access_token');
                        //       }                      

                           var cookieParams = {
                               httpOnly: true,
                               signed: true,
                               maxAge: 999999999                               
                           };

                           console.log('****************************************************** set cookies ****************************************************');
                           console.log(' ');
                           console.log(' ');
                           console.log('set cookies: ', cookieParams);
                           res.cookie('access_token', rows[0].login, cookieParams);
                       }
                       console.log('****************************************************** set session ****************************************************');
                       console.log(' ');
                       console.log(' ');
                       req.session.user = rows[0];
                       res.render('index', {userIsActive: true});
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
        }      
    });
}

us.logout = function(req, res, next)
{
    req.session.destroy(function(err) {
        if(err) {
            console.log("user logout error -> ", err);
        }               
    });
    res.clearCookie('access_token');
    res.render('index', {userIsActive: false});
}

us.autByLogin = function(req, res, next)
{   
  if(req.signedCookies.access_token)
    {       
       db.search(req.signedCookies.access_token, function(err, rows)
       {
           var userAut = true;
           console.log('****************************************************** result users by login ****************************************************');
           console.log(' ');
           console.log(' ');
           console.log('user rows count ->',rows.length);
           console.log('user rows ->',rows);
           if(rows.length > 0)
           {
              req.session.user = rows[0];
           }
           else
           {
             userAut = false;
             res.clearCookie('access_token');
           }

           res.render('index', {userIsActive: userAut});
       });
    }
    else 
     {
         res.render('index', {userIsActive: false});
     }
}

module.exports = us;
