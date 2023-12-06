const sf = require('express').Router();
const conn = require('../config/connection');
const jwt = require('jsonwebtoken');
const jwksClient = require("jwks-rsa");

const jwksClientInstance = jwksClient({
  jwksUri: `https://z3nsatishiyer.zendesk.com/api/v2/help_center/integration/keys.json`
})

sf.get('/', async (req, res) => {
  
  try{
      const data = await ProcessToken(req,res)
      // console.log(data)
      if(!data) {
        throw Error('Invalid Authorization')
      }
      const email = data.email
      // console.log(email)

      var queryUrl = "Select CaseNumber,subject, description, status, createddate,lastreferenceddate,id from Case where contactemail= '" + email+"'";
      // console.log(queryUrl)
      conn.query(queryUrl, (err,result)=> {
        if(err){
          res.status(500).json(err);

        } else {
          
          res.status(200).json(result.records)
        }
      })
  }
  catch (error) {
    // res.status(401).json({message:"Authentication Error"})
  }
  
});


    async function ProcessToken(request,response) {

      try {
        const token = await getTokenfromHeader(request)
        const validatedPayload = await validateToken(token)
        // console.log(validatedPayload)
        return validatedPayload
      }
      catch (err){
        response.status(401).json({message:"Authentication Error"})
      }

    }

    async function validateToken(token){

      const decodedToken = jwt.decode(token, {complete: true})
      const kid = decodedToken.header.kid
      const signingKey = await jwksClientInstance.getSigningKey(kid)
      return jwt.verify(token,signingKey.rsaPublicKey)
    }

    async function getTokenfromHeader(request) {

      const auth = request.headers.authorization
    if (!auth) {
      throw Error('Auth Header missing')
    }
    const token = auth.split(" ")[1]
    return token
    }

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
