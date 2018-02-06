const express = require('express')
const app = express()
const request = require("request");

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

app.listen(3000,() => {
    console.log("Server running on port : 3000")
})