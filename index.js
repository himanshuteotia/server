const express = require('express')
const app = express()
const request = require("request");
var fs = require('fs');
var port = process.env.PORT || 3000;
var https = require('https');
var http = require('http');
var helmet = require('helmet')
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

  app.use((request, response, next) => {
    console.log(request.headers)
    next()
  })
  
  app.get('/',(req,res) => {
    res.json({
      "_id" : "5234532462346635",
      "name" : "Himanshu Teotia",
      "work" : "AI and ML Programmer ... love Javascript and Python",
      "description" : "Still working on ...",
      "place" : "Kuala Lampur"
    })
  })

  app.post('/postLogin', (req, res) => {
    console.log("Getting the postLogin ... wait",req.body)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.post({
      headers: { 'content-type' : 'application/json' },
      url:     'https://202.165.10.133/m2/postLogin',
      body:   JSON.stringify(req.body)
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

  app.post('/postHomePage', (req, res) => {
    console.log("Getting the postHomePage ... wait",req.body)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.post({
      headers: { 'content-type' : 'application/json' },
      url:     'https://202.165.10.133/m2/postHomePage', 
      body:   JSON.stringify(req.body)
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



  app.use(helmet.hsts({
      maxAge: 31536000000,
      includeSubdomains: true,
      force: true
}));


  var constants = require('constants')

  var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/www.teotiahacker.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/www.teotiahacker.com/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/www.teotiahacker.com/chain.pem'),
  secureOptions: constants.SSL_OP_NO_SSLv3 | constants.SSL_OP_NO_SSLv2,
  dhparam: fs.readFileSync("/etc/ssl/certs/dhparam.pem"),
};


// app.listen(3000);
// http.createServer(function(req, res) {   
//         res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
//         res.end();
// }).listen(80);

https.createServer(options, app).listen(443);

