const jsforce = require('jsforce');
const {SF_LOGIN_URL,SF_USERNAME, SF_PWD, SF_TOKEN} = process.env;

const conn = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL
  });
  
  conn.login(SF_USERNAME, SF_PWD+SF_TOKEN, (err,userInfo)=> {
    if(err){
      console.log(err);
  
    }
    else {
      // console.log("User ID" + userInfo.id)
      // console.log("ORg ID"+ userInfo.organizationId)
    }
  });

  module.exports = conn;