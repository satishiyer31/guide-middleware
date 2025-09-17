const ai = require('express').Router();
// const {OPEN_AI} = process.env;
// const fetch =require('node-fetch') ;

const OpenAI = require('openai')
const {SATISH_OPENAI_TOKEN} = process.env;


ai.post('/', async (req,res) => {



    const openai = new OpenAI({
        apiKey: SATISH_OPENAI_TOKEN,
        });
        
        var input = req.body.messages[0].content
        var prompt = "Answer this Zendesk RFP question: "+ input + " Respond ONLY with the direct answer. Do not include phrases like 'here is your answer' or any extra commentary."

        const response = await openai.chat.completions.create({
            model: "gpt-5", // or "gpt-4-turbo"
            messages: [
            {
                   role: "system",
                   content: "You are an RFP assistant. Respond ONLY with the direct answer. Do not include phrases like 'here is the answer' or any introduction." 
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