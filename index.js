const express = require('express')
const app = express()
const request = require("request");
var fs = require('fs');

var key = fs.readFileSync('encryption/private.key');
var cert = fs.readFileSync( 'encryption/primary.crt' );
var ca = fs.readFileSync( 'encryption/intermediate.crt' );

var options = {
  key: key,
  cert: cert,
  ca: ca
};

var https = require('https');

app.use((request, response, next) => {
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {
  request.chance = Math.random()
  next()
})

app.get('/', (req, res) => {
  request.post({
    headers: { 'content-type' : 'application/x-www-form-urlencoded' },
    url:     'https://202.165.10.133/m2/postLogin',
    body:    JSON.stringify({
      "uid" : "20843287",
      "pwd" : "abcd1234"
    })
  }, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    res.json({
      body: body,
      statusCode : response.statusCode,
      response : response,
      error : error
    })
  });
})

https.createServer(options, app).listen(443);