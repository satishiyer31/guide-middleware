const Salesforce = require('express').Router();
// const { readFromFile } = require('../helpers/fsUtils');
const conn = require('../config/connection');

// GET Route for retrieving all the locations
Salesforce.get('/', (req, res) => {
  // readFromFile('./db/location.json').then((data) => res.json(JSON.parse(data)));
  conn.query("Select CaseNumber,subject, description, status, createddate from Case", (err,result)=> {
    if(err){
      // console.log(err)
      res.status(500).json(err);
    } else {
      // console.log(result.totalSize)
      res.json(result.records);
    }
  })
});

Salesforce.get('/:email', (req, res) => {
 
  // readFromFile('./db/location.json').then((data) => {
    
  //   data = JSON.parse(data);
  //    const result = data.filter(loc => loc.org_id==req.params.id);
    
  //   res.json(result)
  
  // });
  var queryUrl = "Select CaseNumber,subject, description, status, createddate from Case where contactemail= '" + req.params.email+"'";
  console.log(queryUrl)
  conn.query(queryUrl, (err,result)=> {
    if(err){
      // console.log(err)
      res.status(500).json(err);
    } else {
      // console.log(result.totalSize)
      res.json(result.records)
    }
  })

 
  
});


module.exports = Salesforce;
