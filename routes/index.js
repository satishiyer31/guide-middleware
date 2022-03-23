const express = require('express');

const salesforceCases = require('./salesforce.js');


const app = express();

app.use('/getSalesforceCases', salesforceCases);


module.exports = app;
