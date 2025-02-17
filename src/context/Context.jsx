import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // ✅ Store full chat history

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setChatHistory((prev) => {
        let updatedChat = [...prev];
        updatedChat[updatedChat.length - 1].text += nextWord;
        return updatedChat;
      });
    }, 10 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResults(false);
    setChatHistory([]); // ✅ Clears history when starting a new chat
  };

  const onSent = async (prompt) => {
    setLoading(true);
    setShowResults(true);
    setInput("");
    
    if (prompt) {
      setRecentPrompt(prompt);
      setChatHistory((prev) => [
        ...prev,
        { role: "user", text: prompt }, // ✅ Store user prompt
      ]);
    }

    let response = await runChat(prompt);

    if (response.success) {
      let formattedResponse = response.response
        .split("\n")
        .join("<br/>");

      setChatHistory((prev) => [
        ...prev,
        { role: "ai", text: "" }, // ✅ Create empty AI response first
      ]);

      let newResponseArray = formattedResponse.split("");
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord);
      }
    } else {
      console.error("Error while running chat:", response.error);
    }

    setLoading(false);
  };

  return (
    <Context.Provider
      value={{
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        input,
        setInput,
        showResults,
        loading,
        chatHistory,
        newChat,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
