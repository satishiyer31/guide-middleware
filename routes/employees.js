const emp = require('express').Router();

const {google}= require("googleapis");

const auth = new google.auth.GoogleAuth({
    keyFile: "google-credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  })

  

const spreadsheetId ="1ZWTkdTq0PMnJzWziSvRf-EGHnd6_HO8on7R8aRXNrlE";

emp.get('/', async(req,res)=>{

   //create client instance for auth
  const client = await auth.getClient();

  //Instance of API
  const googleSheets = google.sheets({version: "v4", auth: client });
    
  const getRows = await googleSheets.spreadsheets.values.get({
    
      auth,
      spreadsheetId,
      range: "EmployeeDB",
    });
    console.log(getRows.data.values[1][1])
    res.json(getRows.data.values);
})


emp.get('/:Id', async(req,res)=>{

    //create client instance for auth
   const client = await auth.getClient();
 
   //Instance of API
   const googleSheets = google.sheets({version: "v4", auth: client });
     
   const getRows = await googleSheets.spreadsheets.values.get({
     
       auth,
       spreadsheetId,
       range: "EmployeeDB",
     });
    //  console.log(getRows.data.values[1][1])
    //  res.json(getRows.data.values);
     const rows = getRows.data.values;
     const filteredRows = []

     for (const row of rows) {
         if ((row[0]) == req.params.Id) {
             filteredRows.push(row)
         }
     }

     res.json(filteredRows);

 })

module.exports = emp;