const express = require('express')
const app = express()
const request = require("request");
var fs = require('fs');
var port = process.env.PORT || 3000;

var https = require('https');
var http = require('http');
// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/www.teotiahacker.com/privkey1.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/www.teotiahacker.com/cert1.pem')
};




  app.use((request, response, next) => {
    console.log(request.headers)
    next()
  })
  
  app.use((request, response, next) => {
    request.chance = Math.random()
    next()
  })
  
  app.get('/login', (req, res) => {
    console.log("Getting the data ... wait")
    request.post({
      headers: { 'content-type' : 'application/x-www-form-urlencoded' },
      url:     'https://202.165.10.133/m2/postLogin',
      body:    JSON.stringify({
        "uid" : "20843287",
        "pwd" : "abcd1234"
      })
    }, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      res.json({
        body: body,
        statusCode : response,
        response : response,
        error : error
      })
  })
})

// app.listen(3000);


// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);

