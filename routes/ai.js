const ai = require('express').Router();
const {OPEN_AI} = process.env;
const fetch =require('node-fetch') ;


ai.post('/', async (req,res) => {

    // console.log(req.body)
    var url = "https://ai-gateway.zende.sk/v1/chat/completions";
    var input = req.body.messages[0].content
    //Detect Language of Input

    const language = await detectLanguage(input) 
    console.log(language)
    
    var body = {"model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content":  "Answer this RFP question about Zendesk: " + input }] };
    
    var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + OPEN_AI 
            }

    var params = {
        "method": "POST",
        "headers": headers,
        "body": JSON.stringify(body),
        "muteHttpExceptions": true
    };

    var results = await fetch(url, params)
    const resp = await results.json()
    //console.log(resp.choices[0].message.content)


    if (language == 'English') {
        res.json(resp.choices[0].message.content)
    }
    else {
        var body = {"model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content":  `Convert to ${language}:` + resp.choices[0].message.content }] };
        var results_conv = await fetch(url, params)
        const resp3 = await results_conv.json()
        res.json(resp3.choices[0].message.content)
    }
    // res.json(resp.choices[0].message.content)

    async function detectLanguage(input)  {

        var body_lang = {"model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content":  "Detect Language of this text and respond in one word with the name of the language only" + input}] };
    
        var headers_lang = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + OPEN_AI 
            }

        var params_lang = {
            "method": "POST",
            "headers": headers_lang,
            "body": JSON.stringify(body_lang),
            "muteHttpExceptions": true
        };

        var results2= await fetch(url,params_lang)
        const resp2 = await results2.json()
        //  console.log(resp2.choices[0].message.content)
        return await resp2.choices[0].message.content

    }

})



module.exports = ai;