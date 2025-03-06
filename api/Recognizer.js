import { GoogleGenerativeAI } from "@google/generative-ai";

const handler = async (req, res) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });
    
    const { base64 } = req.body;

    const base64Data = base64.replace(/^data:image\/(png|jpeg|webp);base64,/, '');
    const mimeTypeMatch = base64.match(/^data:image\/(png|jpeg|webp);base64,/);
    const mimeType = mimeTypeMatch ? `image/${mimeTypeMatch[1]}` : "image/jpeg"; 

    const result = await model.generateContent([
        {
            inlineData: {
                data: base64Data,
                mimeType: mimeType,
            },
        },
        `Identify all Pokémon present in the given image and return array in this format:
        [100 words summary, pokemon array each element in double quotes]
        If no Pokémon are detected, return:
        ["Out Of Context Image Doesn't Have Any Pokemon", []]
        
        Do not include any extra text, explanations, or formatting outside this.`
    ]);
    
    const responseText = result.response.text();
    return res.status(200).json({response: responseText});
}

export default handler