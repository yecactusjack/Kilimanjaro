// node --version # Should be >= 18
// npm install @google/generative-ai

import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-2.0-flash"; 
const API_KEY = import.meta.env.VITE_API_KEY;

async function runChat(prompt) {
	try {
		console.log("🟢 Starting chat request...");

		const genAI = new GoogleGenerativeAI(API_KEY);
		const model = genAI.getGenerativeModel({ model: MODEL_NAME });

		const generationConfig = {
			temperature: 1,  
			topK: 40,        
			topP: 0.95,      
			maxOutputTokens: 8192,  
		};

		const safetySettings = [
			{
				category: HarmCategory.HARM_CATEGORY_HARASSMENT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
		];

		// System Instructions for AI behavior
		const systemInstructions = `
			You are Gemini, an AI assistant specializing in physiotherapy patient history intake.
			You will ask patients structured questions step by step.
		`;

		console.log("🟢 Creating chat session...");
		const chat = model.startChat({
			generationConfig,
			safetySettings,
		});

		console.log("🟢 Sending message to Gemini...");
		const result = await chat.sendMessage(systemInstructions + "\n\nUser: " + prompt); // ✅ Fixed: Send as a single string

		if (!result || !result.response) {
			console.error("❌ Error: No response received from Gemini.");
			return "Error: No response received from AI.";
		}

		const responseText = await result.response.text();
		console.log("🟢 Response from Gemini:", responseText);
		return responseText;
	} catch (error) {
		console.error("❌ Error during chat execution:", error);
		return `Error: Could not process the request. (${error.message})`;
	}
}

export default runChat;
