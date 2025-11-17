
import { GoogleGenAI } from "@google/genai";
import type { Email, Settings } from '../types';

const API_KEY = process.env.API_KEY;

// FIX: Conditionally initialize GoogleGenAI to prevent a crash if the API key is missing.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

if (!ai) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

export const generateReply = async (email: Email, settings: Settings): Promise<string> => {
  // FIX: Check if the AI client was initialized before using it.
  if (!ai) {
    return "AI is disabled. Please configure your API key.";
  }

  // FIX: Removed incorrect and unused model accessor `ai.models[...]` which is a deprecated API pattern.

  const lastMessage = email.thread[email.thread.length - 1];

  const threadHistory = email.thread.map(msg => `${msg.sender}:\n${msg.body}`).join('\n---\n');

  const prompt = `
    You are an AI assistant helping a busy professional, Dorathy, manage her email. Your task is to draft a reply to the latest email in a thread.

    **My Information:**
    - My Name: Dorathy C.
    - My Location: Abuja, Nigeria

    **Instructions:**
    1.  Analyze the entire email thread provided below for context.
    2.  Draft a reply to the last message, which is from "${lastMessage.sender}".
    3.  Adopt a **${settings.tone}** tone.
    4.  Keep the reply concise, clear, and actionable.
    5.  **CRITICAL:** Your entire output must be ONLY the body of the email reply. 
    6.  **DO NOT** include a greeting (like "Hi [Name]," or "Dear [Name],"). The app will handle the greeting automatically.
    7.  **DO NOT** include a closing or the signature. The app will append the user's signature, which is: "${settings.signature}".
    8.  If the request is to schedule a meeting, suggest a few times like "Friday at 3:00 PM WAT". Be mindful of the time zone (WAT - West Africa Time).

    **Full Email Thread:**
    ---
    ${threadHistory}
    ---

    Draft the email body reply to "${lastMessage.sender}" now:
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating reply with Gemini API:", error);
    return "There was an error generating a reply. Please try again.";
  }
};
