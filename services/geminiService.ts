import { GoogleGenAI, Type, Schema } from "@google/genai";
import { InsectData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const insectSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    commonName: { type: Type.STRING, description: "Common name of the insect" },
    scientificName: { type: Type.STRING, description: "Scientific name of the insect" },
    description: { type: Type.STRING, description: "A brief, 2-sentence description of the insect." },
    toxicity: { type: Type.STRING, description: "Toxicity level (e.g., Non-toxic, Mildly toxic, Highly toxic) and bite/sting info." },
    habitat: { type: Type.STRING, description: "Typical habitat where this insect is found." },
    behavior: { type: Type.STRING, description: "Key behavioral traits (e.g., solitary, swarming, nocturnal)." },
    isPest: { type: Type.BOOLEAN, description: "True if generally considered a garden or household pest." },
    pestSolutions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3 eco-friendly pest control solutions if it is a pest, otherwise empty."
    },
    safetyTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Safety tips if the insect is dangerous or venomous."
    }
  },
  required: ["commonName", "scientificName", "description", "toxicity", "habitat", "behavior", "isPest", "pestSolutions", "safetyTips"]
};

export const identifyInsect = async (base64Image: string): Promise<InsectData> => {
  // Remove header if present (e.g., "data:image/jpeg;base64,")
  const cleanBase64 = base64Image.split(',')[1] || base64Image;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: cleanBase64
            }
          },
          {
            text: "Identify this insect. If it is not an insect or bug, return 'Unknown' for names but still try to describe it."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: insectSchema,
        temperature: 0.4, 
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as InsectData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to identify insect. Please try again.");
  }
};