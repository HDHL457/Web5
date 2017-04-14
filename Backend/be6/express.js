var express = require("express");
var app = express();

app.use(express.static('client'));

// app.get('/', function(req, res){
//   res.end('hi');
// })

app.route('/test')
  .get(function (req, res) {
    res.end('get');
  })
  .post(function(req, res){
    res.end('post');
  });

app.listen(9000, function () {
  console.log('localhost is running')
});
