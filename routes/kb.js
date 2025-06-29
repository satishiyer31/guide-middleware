const kb = require('express').Router();
//import OpenAI from "openai";
const OpenAI = require('openai')
const {SATISH_OPENAI_TOKEN} = process.env;

kb.post('/',async(req,res)=>{

    let company = req.body.company;
    let website = req.body.website;
    let prompt = `I am a Pre-Sales Solutions Engineer analyzing the customer service needs for a company. Below is the company's name and its website:

    Company Name: ${company}
    Website URL: ${website}
    
    I want you to act as a Customer Experience Analyst. Please do the following:
    
    Analyze the Company and the Website, Plus review all relevant public info over the internet.
    
    Identify Customer Service Use Cases: Based on the content and services/products offered, list key customer service-related touchpoints and recurring support scenarios. These should reflect actual user needs.
    
    Create 5 High-Level Customer Service Categories: Group the use cases into 5 logical customer service categories based on frequency, function, or user journey phase.
    
    Define 2 Sub-Categories per Category: For each main category, create 2 relevant sub-categories that further narrow down the types of customer support (e.g., under “Account & Billing”, you could have “Subscription Management” and “Refund Requests”).
    
    Generate Knowledge Base (KB) Articles for Zendesk: Based on the categories and subcategories, create 2 knowledge base articles for each sub category, It should have a title and a body. Body should be detailed, over 300 words, informative, specific to the ${company}'s Products or services and designed to solve common customer problems.
    
    Provide 5 Example Customer Questions: Create 5 two-step customer service questions (i.e., questions that require clarification or step-wise help) that are specific to ${company}'s product and service and which would require an answer from atleast 2 of the KB articles. Make the subject look like a forward or keep subject at a minimum, like a real email`
    
   
    

    const openai = new OpenAI({
    apiKey: SATISH_OPENAI_TOKEN,
    });


    async function runFunctionCall() {
        try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o", // or "gpt-4-turbo"
            messages: [
            {
                role: "user",
                content: prompt,
            },
            ],
            tools: [
                {
                type: "function",
                function: {
                    name: "generate_customer_service_structure",
                    description:
                    "Generates structured customer service categories, subcategories, knowledge base articles, and detailed customer questions.",
                    parameters: {
                    type: "object",
                    properties: {
                        categories: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                            name: { type: "string" },
                            subcategories: {
                                type: "array",
                                items: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    kb_articles: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                        subject: { type: "string" },
                                        body: { type: "string" }
                                        },
                                        required: ["subject", "body"]
                                    }
                                    }
                                },
                                required: ["name", "kb_articles"]
                                }
                            }
                            },
                            required: ["name", "subcategories"]
                        }
                        },
                        customer_questions: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                            subject: { type: "string" },
                            body: { type: "string" }
                            },
                            required: ["subject", "body"]
                        }
                        }
                    },
                    required: ["categories", "customer_questions"]
                    }
                }
                }
            ],
            tool_choice: "auto"
            });
        
            const toolCall = response.choices[0].message.tool_calls?.[0];
            if (toolCall) {
            const args = JSON.parse(toolCall.function.arguments);
            console.log("Structured JSON Output:");
            console.dir(args, { depth: null });
            res.status(200).json(args)
            } else {
            console.log("No function call was made.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
        }
        
        runFunctionCall();


})

module.exports = kb;