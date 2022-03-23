const express = require('express');

const salesforceRouter = require('./sf.js');


const app = express();

app.use('/getSalesforceCases', salesforceRouter);


module.exports = app;
