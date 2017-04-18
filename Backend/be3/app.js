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
var app = express();
var router = express.Router();

app.use(router);
app.use(bodyParser);

//Middleware to filter request data for /users/:username
function middleware1(request, response, next){
  fs.readFile('./user.json', function(err, data){
    if(err) response.end(err);
    else {
      data = JSON.parse(data);
      data.forEach(function(value , index){
        if(request.params.username == data[index].username)
        {
          response.json(data[index]);
          return next();
        }
      })
    }
  })
}

router.get('/getStudent', function(req, res){
  fs.readFile('./user.json', function(err, data){
    if(err) res.end(err);
    else res.end(data);
  })
})

router.get('/users/:username', middleware1, function(req, res){
  fs.readFile('./user.json', function(err, data){
    if(err) res.end(err);
  })
})

router.post('/users/:username/edit', bodyParser.json(), function(req, res){
  var editedUser = req.body;
  fs.readFile('./user.json', function(err, data){
    if(err) res.end(err);
    else {
      data = JSON.parse(data);
      data.forEach(function(value, index){
        if(req.params.username == value.username){
            data[index] = editedUser;
            fs.writeFile('./user.json', JSON.stringify(data, null, 4),
              function(err, data){
                if(err) throw err;
                else console.log('Data has been fixed!');
            })
          res.json(data[index]);
        }
      })
    }
  })
})

router.post('/createStudent', bodyParser.json(), function(req, res){
  var newUser = req.body;
  fs.readFile('./user.json', function(err, data){
     if(err) res.end(err);
     else {
      data = JSON.parse(data);
      data.push(newUser);
      fs.writeFile('user.json', JSON.stringify(data, null, 4),'utf8', function(err, data){
        if(err) throw err;
        else res.status(200);
      })
      res.send(data);
    }
  })
})

var server = app.listen(8080, function(){
  console.log('Server run at locallhost:8080');
})
