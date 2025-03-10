"use client"

import { useState } from "react"

export default function ToolShowcase() {
  return (
    <section id="tools" className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-4">File Upload</h3>
            <p className="text-gray-600 mb-6">Upload genomic data files for analysis. Supports FASTQ, BAM, VCF, and other formats.</p>
            <a href="/upload" className="text-blue-600 hover:text-blue-800 font-medium">Try It →</a>
          </div>
          <div className="bg-white p-8 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-4">Interactive Chat</h3>
            <p className="text-gray-600 mb-6">Conversational interface with AI for complex bioinformatics queries and visualizations.</p>
            <a href="/chat" className="text-blue-600 hover:text-blue-800 font-medium">Try It →</a>
          </div>
          <div className="bg-white p-8 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-4">Question Answering</h3>
            <p className="text-gray-600 mb-6">Ask specific questions about your genomic data and get detailed, accurate answers.</p>
            <a href="/ask" className="text-blue-600 hover:text-blue-800 font-medium">Try It →</a>
          </div>
        </div>
      </div>
    </section>
  )
}