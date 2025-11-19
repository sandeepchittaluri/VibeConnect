import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Fallback to empty string if not present, will fail gracefully

const ai = new GoogleGenAI({ apiKey });

export const generateAiBio = async (interests: string[], age: number, gender: string): Promise<string> => {
  try {
    if (!apiKey) {
        console.warn("No API Key for Gemini");
        return "I'm a mysterious person who forgot to configure their API key, but I love fun!";
    }

    const prompt = `
      Write a short, catchy, and fun dating app bio (max 30 words) for a user with these details:
      Age: ${age}
      Gender: ${gender}
      Interests: ${interests.join(', ')}
      
      The tone should be casual, friendly, and inviting. Do not include hashtags.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating bio:", error);
    return "Just a cool person looking to connect!";
  }
};
