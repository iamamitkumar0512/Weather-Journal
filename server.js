// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// POST route adds data to ProjectData
const data = [];
app.post('/apiadd', function (request, response) {
	projectData['date'] = request.body.date;
	projectData['temp'] = request.body.temp;
	projectData['feelings'] = request.body.feelings;
	response.send(projectData);
});
    


// GET route returns projectData
app.get('/apiall', function (request, response) {
    response.send(projectData);
});



// Spin up the server
const port = 3000;
const server = app.listen(port, function () {
	console.log("Welcome to Weather Journal APP AK")
    console.log(`It is running on localhost: ${port}`);
});