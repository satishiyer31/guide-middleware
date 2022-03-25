const oms = require('express').Router();

const {google}= require("googleapis");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  })

  

const spreadsheetId ="1ZWTkdTq0PMnJzWziSvRf-EGHnd6_HO8on7R8aRXNrlE";

oms.get('/', async(req,res)=>{

   //create client instance for auth
  const client = await auth.getClient();

  //Instance of API
  const googleSheets = google.sheets({version: "v4", auth: client });
    
  const getRows = await googleSheets.spreadsheets.values.get({
    
      auth,
      spreadsheetId,
      range: "Sheet1",
    });
    res.json(getRows.data.values);
})


module.exports = oms;