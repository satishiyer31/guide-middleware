const { default: fetch } = require('node-fetch');

const alexa = require('express').Router();

// const crypto = require("crypto");
// const {SEC_KEY} = process.env;
const {CLIENT_ID, CLIENT_SECRET} = process.env;


alexa.get('/', async(req,res)=>{

    
    // const response = await fetch('https://api.amazon.com/auth/o2/token', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //     },
    //     body: {
    //         "grant_type": "authorization_code",
    //         "client_id": CLIENT_ID,
    //         "client_secret": CLIENT_SECRET,
    //         "scope": "alexa::proactive_events"
    //     }
    // })
    
    // const data = await response.json();
    // console.log(data);

    const response = await fetch('https://api.amazonalexa.com/v1/proactiveEvents/stages/development', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer Atc|MQEBIAsoLdb3RNpcXGb0YyEdr4gH2gZUoa_kgpHAJX1KlU3Z5pS8vi54oQjRsYOGSueWGhn2OQm98Txm2r8L8eQPDzFflen02Rpa25NLRECU54kWI-HlVer3qTgRDJL-thVRJy-ZlTYGkWV6pqypx1fQ52-mqIEC9odI7Wy4G8xUgp_WIsIxeSG8VwHaG3KSfuK-nlxE7OkMIqWBbkJU99wnT3sSy6x59J_ypm_vffeiUelBrK1_YySuVMLWR6p8X0Qz2gA'
        },
        body: {
            "timestamp": "2023-05-26T15:27:20Z",
            "referenceId": "unique-id-of-this-event-instance-abc123456789",
            "expiryTime": "2023-05-27T14:00:00.00Z",
            "event": {
              "name": "AMAZON.MessageAlert.Activated",
              "payload": {
                "state": {
                  "status": "UNREAD",
                  "freshness": "NEW"
                },
                "messageGroup": {
                  "creator": {
                    "name": "Smart City"
                  },
                  "count": 1
                }
              }
            },
          
               "localizedAttributes": [
                {
                  "locale": "en-US",
                  "providerName": "Alexa Events Example",
                  "contentName": "Some event"
                }
              ],
             "relevantAudience": {
              "type": "Unicast",
              "payload": {"user":"amzn1.ask.account.AH3XROAAKHTUUXEB5YDN7SZVLWP7GUGH47SZVSXW627FTNSZY5VNN47A6ZNYD4HCSBID6R63OF44C3IBQNOBHOODY7RDZFBC4U45GTYZE6NKKVKK67RZWC32WZW4W4P5ACW6BGBODXS4YZINJ23OLHYXW2O7KU7P7U5BJU7AVYKOYIT6XSFDOR42FX5NDZ5XBFJPPMJMNCAGQIQ"}
             }

          }

        
    })

    const data = await response.json();
    console.log(data);
    res.json();

})


module.exports = alexa;