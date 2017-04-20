const express = require('express');
const bodyParser = require('body-parser');
var app = express();

module.exports = {
  port : 6969,
  settingExpress : function(app){
    app.use(function (req, res, next) {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, token');
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
      // Pass to next layer of middleware
      next();
    }); // de client su dung dc api
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static('./client'))
  },
  numberOfPostsDisplay : 10,
  mongoURL : 'mongodb://localhost/hotgrill',
  jwtKey : 'hotgrill',
  allRole : ["admin", "user"],
  categories : ["Sports" , "Entertainments", "Music", "Relax", "Education", "Science"]
};
