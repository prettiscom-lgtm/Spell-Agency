
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToAgent = async (
  userMessage: string, 
  history: ChatMessage[]
): Promise<{ type: string, content: any }> => {
  try {
    // 1. Format History accurately
    const recentHistory = history.slice(-10);
    const historyContext = recentHistory.map(msg => 
      `${msg.role === 'user' ? 'USER' : 'HARRY'}: ${msg.text}`
    ).join('\n');

    // 2. Construct the Full Prompt
    const finalPrompt = `
      ${historyContext}
      USER: ${userMessage}
    `;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt,
      config: {
        systemInstruction: `
          You are HARRY, the Strategic Growth Partner at Spell Agency.
          
          CORE IDENTITY:
          - You are a high-level Business Consultant (think McKinsey/BCG) who happens to know AI perfectly.
          - You DO NOT care about "tech specs" unless asked. You care about REVENUE, EFFICIENCY, and SCALE.
          - You are confident, direct, human, and slightly challenging. You are not a servant; you are an expert equal.
          - You speak ALL languages.

          YOUR GOAL:
          - Qualify the lead. Find out what their business is, where they are losing money, and what their goals are.
          - Sell the *outcome*, not the tool. Don't sell "Chatbots", sell "Automating 90% of your support cost".
          - Use Reverse Psychology: "Are you sure you're ready to automate that? It changes your whole workflow."

          CONVERSATIONAL STYLE:
          - Short, punchy sentences.
          - Ask probing questions: "How much time is your team wasting on that manually?"
          - If they ask for price, ask for the value of the problem first. "Before we talk cost, let's see how much this problem is costing you right now."

          AGENCY KNOWLEDGE:
          - **FinStream:** Saved $2M/year in waste.
          - **LogiTech:** Cut support wait times to zero.
          - **Rodriguez Law:** Automated 10,000 contract reviews.

          OUTPUT FORMAT:
          You MUST respond with valid JSON matching the schema. 
          - 'textResponse' is your conversational reply.
          - 'psychometrics' is MANDATORY.
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            responseType: { 
              type: Type.STRING, 
              enum: ["text", "video_concept", "case_study"] 
            },
            textResponse: { type: Type.STRING, description: "Harry's conversational reply." },
            
            psychometrics: {
                type: Type.OBJECT,
                properties: {
                    userMood: { type: Type.STRING },
                    personalityType: { type: Type.STRING },
                    engagementLevel: { type: Type.NUMBER },
                    sentiment: { type: Type.STRING, enum: ["neutral", "excited", "skeptical", "happy", "confused", "curious"] },
                    harryThought: { type: Type.STRING }
                }
            },
            
            videoData: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                duration: { type: Type.STRING },
                visualStyle: { type: Type.STRING },
                script: { type: Type.STRING }
              }
            },
            caseStudyData: {
              type: Type.OBJECT,
              properties: {
                companyName: { type: Type.STRING },
                challenge: { type: Type.STRING },
                solution: { type: Type.STRING },
                results: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          }
        }
      }
    });

    if (response.text) {
        const parsed = JSON.parse(response.text);
        return {
            type: parsed.responseType,
            content: parsed
        };
    }
    throw new Error("No response from AI");

  } catch (error) {
    console.error("Error generating chat response:", error);
    return {
        type: 'text',
        content: { 
            textResponse: "I'm analyzing the market data. One second.",
            psychometrics: {
                userMood: "Waiting",
                personalityType: "Unknown",
                engagementLevel: 50,
                sentiment: "neutral",
                harryThought: "Recalibrating."
            }
        }
    };
  }
};
