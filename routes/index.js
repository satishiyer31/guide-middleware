const express = require('express');



// Import our modular routers for location
const salesforceCases = require('./Salesforce.js');


const app = express();

app.use('/getSalesforceCases', salesforceCases);


module.exports = app;
