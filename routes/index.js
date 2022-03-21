const express = require('express');



// Import our modular routers for location
const locationRouter = require('./getLocation.js');


const app = express();

app.use('/getLocation', locationRouter);


module.exports = app;
