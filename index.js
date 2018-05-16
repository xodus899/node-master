//primary file for api



//dependencies
const http = require("http");
const url = require("url");
const stringDecoder = require("string_decoder").StringDecoder;

// server should respond to all requests in string format
const server = http.createServer(function(req,res) {

  // get url and parse

  const parsedUrl = url.parse(req.url,true);

  //get url path

  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g,'');

  // get query string
  const queryStringObject = parsedUrl.query;

  // get http method

  const method = req.method.toUpperCase();

  // get headers as object

  const headers = req.headers;

  // get the payload if any

  const decoder = new stringDecoder('utf-8');
  var buffer = '';
  req.on('data',function(data) {
    buffer += decoder.write(data);
  });
  req.on('end',function() {
    buffer += decoder.end();
    // send response
    res.end("hello world\n");

    // log path user was asking
    console.log("Request received with payload:", buffer);
  });

});

// start server listen on port 3000

server.listen(3000,function() {
  console.log("Server is listening on port 3000");
});
