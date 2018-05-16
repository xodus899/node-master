//primary file for api





//dependencies
const http = require("http");
const url = require("url");

// server should respond to all requests in string format
const server = http.createServer(function(req,res) {
  res.end("hello world\n");
});


// start server listen on port 3000
server.listen(3000,function() {
  console.log("Server is listening on port 3000");
});
