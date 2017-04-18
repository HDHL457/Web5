var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/web5');

var Message = mongoose.model('Message', {content : String});

app.use(express.static('client'));
app.use('/all' , function(req, res){
  Message.find({} , {_id : 0, __v : 0})
          .then(function(data){
            res.json({status : true, message : data});
          })
          .catch(function(err){
            res.json({status : false, message : err.message});
          })
})

io.on('connection' , function(socket){
  socket.broadcast.emit('new client connected', socket.id);
  socket.on('new chat' , function(data){
    var newMessage = new Message({content : data});
    newMessage.save(function(err,mess){
      io.emit('receive a new chat', data);
    });
  });
  socket.send(socket.id);
  socket.on('disconnect', function(){
    console.log(socket.id + ' has disconnected!');
  });
})

server.listen(6969, function(){
  console.log("Server start at port 6969");
})
