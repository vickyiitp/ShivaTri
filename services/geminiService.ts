
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { StartupAnalysis, ValidationStatus } from "../types";
import { MODEL_NAME, SYSTEM_INSTRUCTION } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    isStartupRelated: { type: Type.BOOLEAN },
    refusalMessage: { type: Type.STRING },
    
    // New field for comprehensive Q&A
    detailedResponse: { 
      type: Type.STRING, 
      description: "A comprehensive, Markdown-formatted answer addressing ALL specific questions asked by the user. Use this to provide detailed explanations." 
    },

    problemAnalysis: { type: Type.STRING },
    marketGap: { type: Type.STRING },
    competitiveLandscape: { type: Type.STRING },
    validationStatus: {
      type: Type.STRING,
      enum: [ValidationStatus.VALID, ValidationStatus.INVALID, ValidationStatus.NEEDS_REFINEMENT],
    },
    reasoning: { type: Type.STRING },
    targetAudience: { type: Type.ARRAY, items: { type: Type.STRING } },
    improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
    
    swotAnalysis: {
      type: Type.OBJECT,
      properties: {
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
        opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
        threats: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["strengths", "weaknesses", "opportunities", "threats"],
    },
    elevatorPitch: { type: Type.STRING },
    monetizationStrategies: { type: Type.ARRAY, items: { type: Type.STRING } },
    mvpFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
    techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
    
    legalCompliance: {
      type: Type.OBJECT,
      properties: {
        regulations: { type: Type.ARRAY, items: { type: Type.STRING } },
        governmentSchemes: { type: Type.ARRAY, items: { type: Type.STRING } },
        ipStrategy: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["regulations", "governmentSchemes", "ipStrategy"],
    },
    executionRoadmap: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phase: { type: Type.STRING },
          description: { type: Type.STRING },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["phase", "description", "steps"],
      },
    },
    videoSearchQueries: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-4 YouTube search terms relevant to the user's idea."
    },
    suggestedQuestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Follow-up questions."
    }
  },
  required: ["isStartupRelated"],
};

export const analyzeIdea = async (idea: string): Promise<StartupAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: idea,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.5,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini.");
    }

    return JSON.parse(text) as StartupAnalysis;
  } catch (error) {
    console.error("Error analyzing idea:", error);
    throw error;
  }
};
