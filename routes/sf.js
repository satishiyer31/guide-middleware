const sf = require('express').Router();
const conn = require('../config/connection');

// GET Route for retrieving all the cases
sf.get('/', (req, res) => {
  
  conn.query("Select CaseNumber,subject, description, status, createddate,id from Case", (err,result)=> {
    if(err){
      res.status(500).json(err);
    } else {
      res.json(result.records);
    }
  })
});

sf.get('/:email', (req, res) => {
 
  var queryUrl = "Select CaseNumber,subject, description, status, createddate,lastreferenceddate,id from Case where contactemail= '" + req.params.email+"'";
  // console.log(queryUrl)
  conn.query(queryUrl, (err,result)=> {
    if(err){
      res.status(500).json(err);

    } else {
      
      res.json(result.records)
    }
  })

 
  
});



module.exports = sf;
