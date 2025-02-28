import { GoogleGenerativeAI } from "@google/generative-ai";

const handler = async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const { query } = req.body; 

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
    });
    
    const chatSession = model.startChat({
        generationConfig: {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
        },
        history: []
    });

    const result = await chatSession.sendMessage(query);
    const responseText = result.response.text();

    return res.status(200).json({ response: responseText });
};
  
export default handler;