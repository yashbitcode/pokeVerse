import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

async function runQuery(query) {
    const chatSession = model.startChat({
        generationConfig,
        history: []
    });

    const result = await chatSession.sendMessage(query);
    return JSON.parse(result.response.text());
};
  
export default runQuery;