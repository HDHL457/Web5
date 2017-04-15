const express = require('express');
const bodyParser = require('body-parser');
var app = express();

module.exports = {
  port : 6969,
  settingExpress : function(app){
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  },
  mongoURL : 'mongodb://localhost/web5',
  jwtKey : 'secret',
  allRole : ["admin", "user", "guest"],
  allPermission : ["delete" , "create" , "edit" , "view"]
}
