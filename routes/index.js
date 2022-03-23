const express = require('express');

const salesforceRouter = require('./salesforce.js');


const app = express();

app.use('/getSalesforceCases', salesforceRouter);


module.exports = app;
