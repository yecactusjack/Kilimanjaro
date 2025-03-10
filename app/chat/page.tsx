"use client"

import { useState, useRef, FormEvent } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Footer from "../components/footer"
import ChatInterface from "./interface"


export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-black">Bioinformatics Assistant</h1>
          <p className="text-gray-600 mt-2">
            Ask questions about your data or run analyses through our interactive chat
          </p>
        </div>

        <div className="flex flex-col bg-white border border-black rounded-none h-[70vh] flex-grow">
          <ChatInterface />
        </div>
      </div>
      <Footer />
    </div>
  )
}