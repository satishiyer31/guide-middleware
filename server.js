const express = require('express');
const path = require('path');
require('dotenv').config();
const api = require('./routes/index.js');
const cors = require('cors');
// const conn = require('./config/connection');
const {google}= require("googleapis");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.get('/', async(req,res)=> {
  // res.send("Satish's Guide Middleware POC");

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  })

  //create client instance for auth
  const client = await auth.getClient();

//Instance of API
const googleSheets = google.sheets({version: "v4", auth: client });

const spreadsheetId ="1ZWTkdTq0PMnJzWziSvRf-EGHnd6_HO8on7R8aRXNrlE";

const getRows = await googleSheets.spreadsheets.values.get({

  auth,
  spreadsheetId,
  range: "Sheet1",
});
res.send(getRows.data.values);


})



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
