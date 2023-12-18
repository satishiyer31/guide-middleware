const oms = require('express').Router();
// const crypto = require("crypto");
const {SEC_KEY} = process.env;

const {google}= require("googleapis");
const jwt = require('jsonwebtoken');
const jwksClient = require("jwks-rsa");

const jwksClientInstance = jwksClient({
  jwksUri: `https://z3nsatishiyer.zendesk.com/api/v2/help_center/integration/keys.json`
})

const auth = new google.auth.GoogleAuth({
    keyFile: "google-credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  })

  

const spreadsheetId ="1ZWTkdTq0PMnJzWziSvRf-EGHnd6_HO8on7R8aRXNrlE";

oms.get('/', async(req,res)=>{

    try {

            const data = await ProcessToken(req,res)
        // console.log(data)
        if(!data) {
            throw Error('Invalid Authorization')
        }
        const email = data.email
        // console.log(email)
        
        //create client instance for auth
        const client = await auth.getClient();
        
        //Instance of API
        const googleSheets = google.sheets({version: "v4", auth: client });
            
        const getRows = await googleSheets.spreadsheets.values.get({
            
            auth,
            spreadsheetId,
            range: "Sheet1",
            });
            //  console.log(getRows.data.values[1][1])
            //  res.json(getRows.data.values);
            const rows = getRows.data.values;
            const filteredRows = []

            for (const row of rows) {
                if ((row[0]) == email) {
                    filteredRows.push(row)
                }
            }

            res.json(filteredRows);
    }
    catch (error){

    }
 })

 async function ProcessToken(request,response) {

    try {
      const token = await getTokenfromHeader(request)
    //   console.log('Token: ',token)
      const validatedPayload = await validateToken(token)
    //   console.log('Validated Payload: ',validatedPayload)
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

oms.get('/Byemail', async(req,res)=>{

    let email = req.headers.email//req.params.email;
    console.log(email)
    //create client instance for auth
   const client = await auth.getClient();
    
   //Instance of API
   const googleSheets = google.sheets({version: "v4", auth: client });
     
   const getRows = await googleSheets.spreadsheets.values.get({
     
       auth,
       spreadsheetId,
       range: "Sheet1",
     });
    //  console.log(getRows.data.values)
    //  res.json(getRows.data.values);
     const rows = getRows.data.values;
     const filteredRows = []

     for (const row of rows) {
         if ((row[0]) == email) {
             filteredRows.push(row)
         }
     }
     console.log(filteredRows)
     res.json(filteredRows);

 })

 oms.get('/:email', async(req,res)=>{


  let email = req.params.email;
  console.log(email)
  //create client instance for auth
 const client = await auth.getClient();
  
 //Instance of API
 const googleSheets = google.sheets({version: "v4", auth: client });
   
 const getRows = await googleSheets.spreadsheets.values.get({
   
     auth,
     spreadsheetId,
     range: "Sheet1",
   });
  
   const rows = getRows.data.values;
   const filteredRows = []

   for (const row of rows) {
       if ((row[0]) == email) {
           filteredRows.push(row)
       }
   }
   console.log(filteredRows)
   res.json(filteredRows);

})



 oms.get('/orders/:order_id', async(req,res)=>{

    
   const client = await auth.getClient();
    
   //Instance of API
   const googleSheets = google.sheets({version: "v4", auth: client });
     
   const getRows = await googleSheets.spreadsheets.values.get({
     
       auth,
       spreadsheetId,
       range: "Sheet1",
     });
    //  console.log(getRows.data.values[1][1])
    //  res.json(getRows.data.values);
     const rows = getRows.data.values;
     const filteredRows = []

     for (const row of rows) {
         if ((row[1]) == req.params.order_id) {
             filteredRows.push(row)
         }
     }

     res.json(filteredRows);

 })

module.exports = oms;