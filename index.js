//primary file for api

//dependencies
const http = require("http");
const https = require("https");
const url = require("url");
const stringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");
const fs = require("fs");

// server  on http
const httpServer = http.createServer(function(req,res) {
  unifiedServer(req,res);
});

// start http server listen
httpServer.listen(config.httpPort,function() {
  console.log(`Server is listening on port ${config.port} and in ${config.httpsPort} environment`);
});

// server  on http
const httpsServerOptions = {
  "key"  : fs.readFileSync("./https/key.pem"),
  "cert" : fs.readFileSync("./https/cert.pem")
};


// server  on https
const httpsServer = https.createServer(httpsServerOptions,function(req,res) {
  unifiedServer(req,res);
});

// start http server listen

httpsServer.listen(config.httpsPort,function() {
  console.log(`Server is listening on port ${config.port} and in ${config.httpsPort} environment`);
});





// server logic for http and https server

const unifiedServer = function(req,res) {
   // get url and parse

  const parsedUrl = url.parse(req.url,true);

  //get url path

  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g,"");

  // get query string
  const queryStringObject = parsedUrl.query;

  // get http method

  const method = req.method.toUpperCase();

  // get headers as object

  const headers = req.headers;

  // get the payload if any

  const decoder = new stringDecoder("utf-8");
  var buffer = "";
  req.on("data",function(data) {
    buffer += decoder.write(data);
  });
  req.on("end",function() {
    buffer += decoder.end();

    // chose request for hander, if not found use not found handler

    const chosenHandler = typeof(router[trimmedPath]) !== "undefined" ? router[trimmedPath] : handlers.notFound;

    //construct data object to send to the handler

    const data = {
      "trimmedPath": trimmedPath,
      "queryStringObject": queryStringObject,
      "method" : method,
      "headers": headers,
      "payload": buffer
    };

    //route to chosen handler

    chosenHandler(data,function(statusCode,payload) {
      // use status code callbacked by handler or default 200
      statusCode = typeof(statusCode) == "number" ? statusCode : 200;
      // use payload called back by payload or default to empty object
      payload = typeof(payload) == "object" ? payload : {};

      // convert payload to string

      const payloadToString = JSON.stringify(payload);

      //return response
      res.setHeader("Content-Type","application/json");
      res.writeHead(statusCode);
      res.end(payloadToString);
      // log path user was asking
      console.log("Request received with: ", statusCode,payloadToString);
    });

  });

};


// define handlers

const handlers = {};

//sample handler
handlers.sample = function(data,callback) {
  // callback http status code and payload object
  callback( 406, {"name": "sample handle"} );
};

//not found handlers
handlers.notFound = function(data,callback) {
  callback(404);
};

// define a request router

var router = {
  "sample": handlers.sample
};




















































