"use client"

import { useState } from "react"

export default function ToolShowcase() {
  const [selectedTool, setSelectedTool] = useState("MultiQC")

  const tools = [
    "FastQC",
    "Bowtie2",
    "Kraken2",
    "Porechop",
    "MultiQC",
    "Krona"
  ]

  const toolDescriptions = {
    FastQC: "Quality control tool for high throughput sequence data.",
    Bowtie2: "Fast and sensitive read alignment tool for aligning sequencing reads to reference genomes.",
    Kraken2: "Taxonomic classification system using exact k-mer matches to achieve high accuracy and speed.",
    Porechop: "Tool for finding and removing adapters from Oxford Nanopore reads.",
    MultiQC: "Aggregate results from bioinformatics analyses across many samples into a single report.",
    Krona: "Visualization tool that enables intuitive exploration of relative abundances in metagenomic data."
  }

  return (
    <div className="mt-12 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-12 text-center">Tools we plan on integrating in our MVP</h2>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tools.map((tool) => (
          <button
            key={tool}
            className={`px-6 py-3 rounded-full transition-colors ${
              selectedTool === tool 
                ? "bg-black text-white" 
                : "bg-white text-black border border-gray-200 hover:bg-blue-50"
            }`}
            onClick={() => setSelectedTool(tool)}
          >
            {tool}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-2">{selectedTool}</h3>
        <p className="text-gray-600 mb-6">
          {toolDescriptions[selectedTool as keyof typeof toolDescriptions]}
        </p>

      </div>
    </div>
  )
}