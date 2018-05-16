//primary file for api



//dependencies
const http = require("http");
const url = require("url");

// server should respond to all requests in string format
const server = http.createServer(function(req,res) {
  res.end("hello world\n");

  // get url and parse

  const parsedUrl = url.parse(req.url,true);

  //get url path

  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g,'');

  // get http method

  const method = req.method.toUpperCase();

  // send response


  // log path user was asking
  if (trimmedPath === "") {
    console.log ("User requested homepage", trimmedPath+ "with method: " + method);
  } else {
    console.log("User path, " + trimmedPath);
  }

  // start server listen on port 3000
});


server.listen(3000,function() {
  console.log("Server is listening on port 3000");
});
