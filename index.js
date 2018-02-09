const express = require('express')
const app = express()
const request = require("request");
var fs = require('fs');
var port = process.env.PORT || 3000;

var https = require('https');
var http = require('http');





  app.use((request, response, next) => {
    console.log(request.headers)
    next()
  })
  
  app.get('/',(request, response, next) => {
    console.log("Get calling");
    response.json({"status": "running"});
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
'use strict';

 
require('letsencrypt-express').create({
 
  server: 'staging'
 
, email: 'himanshuteotia7@gmail.com'
 
, agreeTos: true
 
, approveDomains: [ 'www.teotiahacker.com' ]
 
, app: require('express')().use('/', function (req, res) {
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
 
}).listen(80, 443);


// app.listen(3000);


// Create an HTTP service.
// http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(443);

