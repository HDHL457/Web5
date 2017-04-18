var http = require('http');

http.createServer(function(request, response){
  response.end('Hello');
}).listen(8081);

console.log('Server run at locallhost:8081');
