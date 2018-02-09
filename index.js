const express = require('express')
const app = express()
const request = require("request");
var fs = require('fs');
var port = process.env.PORT || 3000;
var https = require('https');
var http = require('http');
var helmet = require('helmet')

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
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.post({
      headers: { 'content-type' : 'application/x-www-form-urlencoded' },
      url:     'https://202.165.10.133/m2/postLogin',
      body:    {
        "uid" : "20843287",
        "pwd" : "abcd1234"
      }
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

  var req = https.request({ 
      host: '202.165.10.133', 
      port: 443,
      path: '/m2/postLogin',
      method: 'post',
      rejectUnauthorized: false,
      requestCert: true,
      agent: false
    },

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
http.createServer(function(req, res) {   
        res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
        res.end();
}).listen(80);

https.createServer(options, app).listen(443);

