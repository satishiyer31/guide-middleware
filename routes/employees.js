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


 emp.put('/unlock', async(req,res)=>{

    let emp_id = req.body.emp_id;
    console.log(emp_id)
    const client = await auth.getClient();
     
    //Instance of API
    const googleSheets = google.sheets({version: "v4", auth: client });
      
    const getRows = await googleSheets.spreadsheets.values.get({
      
        auth,
        spreadsheetId,
        range: "EmployeeDB", //"Sheet1",
      });
     
      const rows = getRows.data.values
      console.log(rows)
      const filteredRows = []
      var counter=0;
      var row_number;
  
      for (const row of rows) {
        counter++;
          if ((row[0]) == emp_id) {
              filteredRows.push(row)
              row_number = counter;
          }
      }
  
      console.log('Identified row number is: ',row_number)
  
      //update new address data on the sheet
  
      await googleSheets.spreadsheets.values.update({
          auth,
          spreadsheetId,
          range: `EmployeeDB!L${row_number}`,
          valueInputOption:"USER_ENTERED",
          resource: {
            values: [["Unlocked"]]
          }
      })
  
  
  
      res.status(200).json(`${emp_id} Unlocked`);
  
  })

module.exports = emp;