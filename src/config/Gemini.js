// node --version # Should be >= 18
// npm install @google/generative-ai

import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-2.0-flash"; // Using the latest model
const API_KEY = import.meta.env.VITE_API_KEY;

async function runChat(prompt) {
	const genAI = new GoogleGenerativeAI(API_KEY);
	const model = genAI.getGenerativeModel({ model: MODEL_NAME });

	// Updated generationConfig as per Google's recommendation
	const generationConfig = {
		temperature: 1,  // More creative and natural responses
		topK: 40,        // Larger candidate pool for better token selection
		topP: 0.95,      // More diverse responses
		maxOutputTokens: 8192,  // Allows longer, structured responses
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

	const chat = model.startChat({
		generationConfig,
		safetySettings,
		history: [],
	});

	const result = await chat.sendMessage(prompt);
	const response = result.response;
	console.log(response.text());
	return response.text();
}

export default runChat;
