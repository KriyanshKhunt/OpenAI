import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = 'AIzaSyB7IdGvlVrldtU_TET4w49jBxj7Ai22Wbk';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
});

const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
};

async function gemini(input) {
      const chatSession = model.startChat({
            generationConfig,
            history: [
            ],
      });

      const result = await chatSession.sendMessage(input);
      return result.response.text();
}

export default gemini;