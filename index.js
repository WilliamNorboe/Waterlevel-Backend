// index.js
// This is our main server file
const key = process.env['waterThing']
// include express
const express = require("express");
// create object to interface with express


const fetch = require("node-fetch");
const app = express();

const bodyParser = require('body-parser');
// Code in this section sets up an express pipeline
// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})

app.use(bodyParser.json());
// No static server or /public because this server
// is only for AJAX requests

app.post("/query/test", async function(request, response, next) {
	console.log("got to server");
	let obj = request.body;
	console.log(obj.month);
	console.log(obj.year);

			// ORO = oroville, SHA = shasta, CLE = trinity lake, NML = new melones, LUS = San Luis, DNP = don pedro, BER = Beryessa
	let resTest = await fetch('https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA%2CORO%2CCLE%2CNML%2CLUS%2CDNP%2CBER&SensorNums=15&dur_code=M&Start='+ obj.year + '-' + obj.month + '&End='+ obj.year + '-' + obj.month);
  let json = await resTest.json();
	console.log(json);
	
  return response.json(json); 
});

// respond to all AJAX querires with this message
app.use(function(req, res, next) {
  res.json({msg: "No such AJAX request"})
});

// app.use(function (request, response) {
//   response.status(404);
//   response.send("Backend does not show a Web page");
// })


// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!

const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});
