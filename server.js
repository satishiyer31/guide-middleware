const express = require('express');
const path = require('path');
require('dotenv').config();
const api = require('./routes/index.js');
const cors = require('cors');
const conn = require('./config/connection');
// const jsforce = require('jsforce');


// const {SF_LOGIN_URL,SF_USERNAME, SF_PWD, SF_TOKEN} = process.env;

// const conn = new jsforce.Connection({
//   loginUrl: SF_LOGIN_URL
// });

// conn.login(SF_USERNAME, SF_PWD+SF_TOKEN, (err,userInfo)=> {
//   if(err){
//     console.log(err);

//   }
//   else {
//     console.log("User ID" + userInfo.id)
//     console.log("ORg ID"+ userInfo.organizationId)
//   }
// });

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.get('/', (req,res)=> {
  // res.send("Satish's Guide Middleware POC");
  conn.query("Select CaseNumber,subject, description, status, createddate from Case where contactemail='eric.s.smith411@gmail.com'", (err,result)=> {
    if(err){
      console.log(err)
    } else {
      console.log(result.totalSize)
      res.json(result.records)
    }
  })
})



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
