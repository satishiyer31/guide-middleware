const express = require('express');

const salesforceRouter = require('./sf.js');
const omsRouter = require('./oms.js');


const app = express();

app.use('/getSalesforceCases', salesforceRouter);
app.use('/getOrderData',omsRouter);


module.exports = app;
