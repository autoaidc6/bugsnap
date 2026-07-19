import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type, Schema } from "@google/genai";

const app = express();
const PORT = 3000;

// Use JSON body parser with increased limit to handle base64 images
app.use(express.json({ limit: "50mb" }));

// Initialize GoogleGenAI lazily to prevent crashing if key is missing during startup/build
let aiInstance: GoogleGenAI | null = null;
const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY_MISSING");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

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

// API Route for identification
app.post("/api/identify", async (req, res): Promise<any> => {
  const { base64Image } = req.body;
  if (!base64Image) {
    return res.status(400).json({ error: "Missing base64Image parameter" });
  }

  // Remove header if present (e.g., "data:image/jpeg;base64,")
  const cleanBase64 = base64Image.split(',')[1] || base64Image;

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: cleanBase64
            }
          },
          {
            text: "Identify this insect in the image. Provide detailed information including its common name, scientific name, and behavior. If it's a pest, provide eco-friendly solutions. Return the data in the specified JSON format."
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

    const data = JSON.parse(text);
    return res.json(data);
  } catch (error: any) {
    console.error("Server-side Gemini Error:", error);
    if (error.message === "GEMINI_API_KEY_MISSING") {
      return res.status(500).json({ error: "GEMINI_API_KEY_MISSING", message: "Gemini API Key is missing. Please configure it in the backend environment variables." });
    }
    return res.status(500).json({ error: "IDENTIFICATION_FAILED", message: error.message || "Failed to identify insect" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
