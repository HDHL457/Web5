const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var app = express();
var router = express.Router();

app.use(router);
app.use(bodyParser);



// var user4 = {
//   "user4" : {
//     "name" : "dan",
//     "password" : "password4",
//     "profession" : "quanly",
//     "id": 4
//   }
// }

router.post('/createUser',bodyParser.json(), function(req, res){
  var user4 = req.body;
  fs.readFile('./user.json', function(error, data){
    if (error) {
      res.end(error);
    }else {
      var tempData = JSON.parse(data);
      tempData['user4'] =  user4;
      res.json(tempData);
    }
  })
})
router.get('/getUser', function(req, res){
  fs.readFile('./user.json', function(err, data){
    if (err) {
      res.end(error);
    }else {
      res.end(data);
    }
  })
})

var server = app.listen(8081, function() {
  console.log('Server run at locallhost:8081');
})


// router.get('/getUser', function(request, response){
