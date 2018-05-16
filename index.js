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

    // chose request for hander, if not found use not found handler

    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    //construct data object to send to the handler

    const data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    //route to chosen handler

    chosenHandler(data,function(statusCode,payload) {
      // use status code callbacked by handler or default 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      // use payload called back by payload or default to empty object
      payload = typeof(payload) == 'object' ? payload : {};

      // convert payload to string

      const payloadToString = JSON.stringify(payload);

      //return response
      res.setHeader('Content-Type','application/json');
      res.writeHead(statusCode);
      res.end(payloadToString);
      // log path user was asking
      console.log("Request received with: ", statusCode,payloadToString);
    });

  });

});

// start server listen on port 3000

server.listen(3000,function() {
  console.log("Server is listening on port 3000");
});

  // define handlers

  var handlers = {};

  //sample handler
  handlers.sample = function(data,callback) {
    // callback http status code and payload object
    callback( 406, {'name': 'sample handle'} );
  };

  //not found handlers
  handlers.notFound = function(data,callback) {
    callback(404);
  };

// define a request router

var router = {
  'sample': handlers.sample
};




















































