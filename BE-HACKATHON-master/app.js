const express = require('express');
const configs = require('./configs/configs.js');
const bodyParser = require('body-parser');
const router = require('./routers.js');
const mongoose = require('mongoose');

mongoose.connect(configs.mongoURL);

var app = express();
configs.settingExpress(app);
router(app);

app.get('/', function(req, res){
  res.send('TechKids Hot Grill');
})

app.listen(configs.port , function(){
  console.log('Server starts at port %s', configs.port);
})
