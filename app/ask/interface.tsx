"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"
import { Download } from "lucide-react"
import { Input } from '@/components/ui/input' // Added import statement

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export default function AskInterface() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "How can I help you analyze your genomic data today?" },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userQuery = query;
    setQuery("");
    setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
    setIsLoading(true);

    try {
      const response = await axios.post("/api/ask", { query: userQuery }, { headers: { 'Content-Type': 'application/json' }});

      // Parse the HTML content and set it as the assistant's message
      if (response.data && response.data.htmlContent) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response.data.htmlContent },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "I'm sorry, I couldn't process your request." },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, there was an error processing your request." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Ask about your genomic data</h1>

      <div className="flex justify-center mb-6">
        <div className="beta-badge">Beta 1.0 Kilimanjaro</div>
      </div>

      <div className="chat-container">
        <CardContent className="p-0">
          <div className="bg-secondary/50 border-b px-6 py-3">
            <h2 className="text-lg font-medium">Analysis Chat</h2>
          </div>
          <div className="p-6 h-[60vh] overflow-y-auto">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary border border-border/50"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div dangerouslySetInnerHTML={{ __html: message.content }} />
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </CardContent>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about your genomic data..."
            disabled={isLoading}
            className="flex-1 py-6 px-4 text-base"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="px-6"
          >
            {isLoading ? "Thinking..." : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
}