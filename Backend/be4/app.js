//task1: tao file json co du lieu mau
//get student (dung phuong thuc get)

//task2: Tao 1 student, luu vao file,
//neu thanh cong tra ve status code 200

//task3: sua thong tin user qua userName
//vd: /editUser
//truyen vao body thong tin moi cu user


const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var app = express();
var router = express.Router();
var user = mongoose.model('user' , {
  username : String,
  name : String,
  age : Number,
  class : String
});


app.use(router);
app.use(bodyParser);

//Middleware to filter request data for /users/:username
function middleware1(request, response, next){
  user.findOne({username : request.params.username} , {_id : 0 , __v : 0})
    .then(function(user){
      if(user) {
        request.userData = user;
        next();
      }
      else response.sendStatus(404);
    })
    .catch(function(err){
    response.send(err);
  })
}

app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  res.end('404 Not Found');
  next(err);
});

router.get('/getStudent', function(req, res){
  user.find({} , {_id : 5 , __v : 40})
      .then(function(user){
        res.send(user);
      })
      .catch(function(err){
        res.send(err);
      })
})

router.get('/users/:username' , middleware1, function(req , res){
  res.send(req.userData);
})

router.post('/createStudent', bodyParser.json(), function(req, res){
  var newUser = req.body;
  user.findOne({username : req.body.username} , {_id : 0 , __v : 0})
      .then(function(user){
        if(user) res.send("Username has already been taken!");
        else newUser.save().then(function(data){
          res.send("Your data has been saved!");
        }).catch(function(err){
          res.send(err);
        })
      })
})

var server = app.listen(8080, function(){
  console.log('Server run at locallhost:8080');
})
