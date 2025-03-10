"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isTyping, setIsTyping] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsTyping(true)
    handleSubmit(e).finally(() => setIsTyping(false))
  }

  return (
    <section id="chat" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Try Our AI-Powered Pipeline</h2>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Roslind AI Chat</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] overflow-y-auto">
            {messages.map((m) => (
              <div key={m.id} className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                >
                  {m.content}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="text-left">
                <span className="inline-block p-2 rounded-lg bg-gray-200 text-black">AI is processing...</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <form onSubmit={onSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Describe your bioinformatics data and task..."
                className="flex-grow"
              />
              <Button type="submit" disabled={isTyping}>
                Process
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

