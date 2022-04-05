const express = require('express');

const salesforceRouter = require('./sf.js');
const omsRouter = require('./oms.js');
const empRouter = require('./employees.js');

const app = express();

app.use('/getSalesforceCases', salesforceRouter);
app.use('/getOrderData',omsRouter);
app.use('/getEmpData',empRouter);


module.exports = app;
