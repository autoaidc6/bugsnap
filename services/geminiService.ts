import { InsectData } from "../types";

export const identifyInsect = async (base64Image: string): Promise<InsectData> => {
  try {
    const response = await fetch("/api/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base64Image }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.error === "GEMINI_API_KEY_MISSING") {
        throw new Error("GEMINI_API_KEY_MISSING");
      }
      throw new Error(errorData.message || "Failed to identify insect. Please try again.");
    }

    const data = await response.json();
    return data as InsectData;
  } catch (error: any) {
    console.error("Client identification fetch error:", error);
    if (error.message === "GEMINI_API_KEY_MISSING") {
      throw new Error("GEMINI_API_KEY_MISSING");
    }
    throw new Error(error.message || "Failed to identify insect. Please try again.");
  }
};
