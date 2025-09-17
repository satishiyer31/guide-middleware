const ai = require('express').Router();
// const {OPEN_AI} = process.env;
// const fetch =require('node-fetch') ;

const OpenAI = require('openai')
const {SATISH_OPENAI_TOKEN} = process.env;


ai.post('/', async (req,res) => {



    const openai = new OpenAI({
        apiKey: SATISH_OPENAI_TOKEN,
        });
        
        var input = req.body.content
        var prompt = "Answer this Zendesk RFP question: "+ input 

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
            {
                   role: "system",
                   content: "You are a Zendesk Pre-Sales Solution Engineer analyzing an RFP, Respond with the direct answer. Do not include phrases like 'here is the answer " //"You are an RFP assistant. Respond with the direct answer. Do not include phrases like 'here is the answer'" 
            },
            
            {
                role: "user",
                content: prompt,
            }
            ]
            });
        
            console.log(response.choices[0].message.content);
            res.status(200).json(response.choices[0].message.content)
    


    

})



module.exports = ai;