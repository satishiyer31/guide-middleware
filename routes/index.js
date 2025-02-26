const express = require('express');

const salesforceRouter = require('./sf.js');
const omsRouter = require('./oms.js');
const empRouter = require('./employees.js');
const assetsRouter = require('./assets');
const encryptRouter = require('./encrypt')
// const AlexaRouter = require('./alexa.js')
const jwtRouter = require('./enduserAuth')
const aiRouter = require('./ai')


const app = express();

app.use('/getSalesforceCases', salesforceRouter);
app.use('/getOrderData',omsRouter);
app.use('/getEmpData',empRouter);
app.use('/getAssets',assetsRouter);
app.use('/crypto',encryptRouter);
// app.use('/alexa',AlexaRouter);
app.use('/jwt', jwtRouter);
app.use('/ai',aiRouter);


module.exports = app;
