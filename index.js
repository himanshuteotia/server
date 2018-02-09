const express = require('express')
const app = express()
const request = require("request");
var fs = require('fs');
var port = process.env.PORT || 3000;

var https = require('https');
var http = require('http');



//   app.use((request, response, next) => {
//     console.log(request.headers)
//     next()
//   })
  

//   app.use((request, response, next) => {
//     request.chance = Math.random()
//     next()
//   })
  
//   app.get('/login', (req, res) => {
//     console.log("Getting the data ... wait")
//     request.post({
//       headers: { 'content-type' : 'application/x-www-form-urlencoded' },
//       url:     'https://202.165.10.133/m2/postLogin',
//       body:    JSON.stringify({
//         "uid" : "20843287",
//         "pwd" : "abcd1234"
//       })
//     }, function (error, response, body) {
//       console.log('error:', error); // Print the error if one occurred
//       console.log('statusCode:', response); // Print the response status code if a response was received
//       console.log('body:', body); // Print the HTML for the Google homepage.
//       res.json({
//         body: body,
//         statusCode : response,
//         response : response,
//         error : error
//       })
//   })
// })

// app.listen(3000);


// // Create an HTTP service.
// http.createServer(app).listen(80);
// // Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(443);
const redirectHttps = require('redirect-https');

const PROD = false;

const lex = require('greenlock-express').create({
    server: PROD ? 'https://acme-v01.api.letsencrypt.org/directory' : 'staging',
      challenges: { 
       'http-01': require('le-challenge-fs').create({ webrootPath: '~/letsencrypt/var/acme-challenges' }) 
    },
    store: require('le-store-certbot').create({
      configDir: '/etc/letsencrypt',                           
      privkeyPath: '/etc/letsencrypt/live/www.teotiahacker.com/privkey.pem', 
      fullchainPath: '/etc/letsencrypt/live/www.teotiahacker.com/fullchain.pem',
      certPath: '/etc/letsencrypt/live/www.teotiahacker.com/cert.pem',    
      chainPath: '/etc/letsencrypt/live/www.teotiahacker.com/chain.pem',           
      workDir: '/var/lib/letsencrypt', 
      logsDir: '/var/log/letsencrypt',  
      webrootPath: '~/letsencrypt/srv/www/www.teotiahacker.com/.well-known/acme-challenge',
      debug: false
  }),
  approveDomains: (opts, certs, cb) => {
    if (certs) {
      // change domain list here
      opts.domains = ['www.teotiahacker.com']
    } else { 
      // change default email to accept agreement
      opts.email = 'himanshuteotia7@gmail.com'; 
      opts.agreeTos = true;
    }
    cb(null, { options: opts, certs: certs });
  }
});

const middlewareWrapper = lex.middleware;
http.createServer(lex.middleware(redirectHttps())).listen(80);

https.createServer(
  lex.httpsOptions, 
  middlewareWrapper(function(req,res,next){
    console.log("Sucessuffly done");
    res.end("Done");
  })
).listen(433);