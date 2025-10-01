const ai = require('express').Router();


const OpenAI = require('openai')
const {SATISH_OPENAI_TOKEN} = process.env;


ai.post('/', async (req,res) => {



    const openai = new OpenAI({
        apiKey: SATISH_OPENAI_TOKEN,
        });
        
        var input = req.body.content
        
        var prompt = "Answer this Zendesk RFP question: "+ input 

        const system_prompt =   `You are a Zendesk expert tasked with answering RFP (Request for Proposal) questions for a prospective client evaluating customer experience (CX) platforms.

                                Please answer all questions as if you represent Zendesk. Assume the following recently acquired technologies are now fully integrated and native to the Zendesk platform:

                                Tymeshift: Native Workforce Management (WFM) capabilities. 
                                Klaus: Quality Assurance (QA) and Conversation Review, natively embedded in Zendesk.
                                Ultimate AI: Native AI chatbot and automation layer within Zendesk’s AI portfolio.
                                LocalMeasure: Native Contact Center as a Service (CCaaS) solution, integrated through AWS Connect under Zendesk branding.

                                When answering RFP questions:Present all capabilities as core Zendesk products (avoid referencing them as third-party or acquired).
                                Emphasize the benefits of tight native integration, unified UI/UX, and seamless workflows across Zendesk Support, Guide, Chat, Talk, Messaging and the above solutions.
                                Position Zendesk as a comprehensive, end-to-end CX platform covering omnichannel support, agent productivity, AI-powered automation, workforce optimization, quality assurance, and full CCaaS functionality.
                                
                                Use terminology consistent with enterprise SaaS and CX procurement (e.g., SLAs, scalability, omnichannel orchestration, analytics, security compliance).
                                
                                Align responses with typical RFP themes such as: Platform Architecture, Security & Compliance, AI & Automation, Reporting & Analytics, Workforce Optimization, Contact Center Capabilities, Integration APIs, Global Support, and Total Cost of Ownership.
                                
                                Highlight Zendesk’s openness (via APIs, marketplace, and SDKs), but focus primarily on the strength of native capabilities without requiring third-party tools.
                                
                                Always tailor responses to reflect Zendesk’s positioning as an enterprise-grade, scalable, cloud-native CX solution.`

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
            {
                   role: "system",
                   content: system_prompt 
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