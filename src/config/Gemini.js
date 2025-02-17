import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-2.0-flash"; 
const API_KEY = import.meta.env.VITE_API_KEY;

let chatSession = null;
let chatHistory = []; // Stores conversation history

async function initializeChat() {
	if (!chatSession) {
		console.log("🟢 Initializing new chat session...");

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

		// Remove system role and send instructions as the first message
		const systemInstructions = `
			You are Gemini, an AI assistant specializing in physiotherapy patient history intake.
			You will ask patients structured questions step by step.
		`;

		chatSession = model.startChat({
			generationConfig,
			safetySettings,
		});

		// Send system instructions as a user message
		await chatSession.sendMessage(systemInstructions);
	}
}

async function runChat(prompt) {
	try {
		if (!API_KEY) throw new Error("❌ API Key is missing! Set VITE_API_KEY.");

		// 🟢 Ensure chat session is initialized
		await initializeChat();

		// 🟢 Append user message to chat history
		chatHistory.push({ role: "user", parts: [{ text: prompt }] });

		console.log("🟢 Sending message to Gemini...");
		const result = await chatSession.sendMessage(prompt); // ✅ Reuses existing session

		if (!result?.response?.text) {
			console.error("❌ Error: No valid response received from Gemini.");
			return { success: false, error: "No response received from AI." };
		}

		const responseText = await result.response.text();
		console.log("🟢 Response from Gemini:", responseText);

		// 🟢 Append AI response to history
		chatHistory.push({ role: "model", parts: [{ text: responseText }] });

		return { success: true, response: typeof responseText === "string" ? responseText : "" };
	} catch (error) {
		console.error("❌ Error during chat execution:", error);
		return { success: false, error: `Could not process request. (${error.message})` };
	}
}

export default runChat;
