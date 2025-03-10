
"use client"

"use client"

import { useState } from "react"

export default function ToolShowcase() {
  const [selectedTool, setSelectedTool] = useState("MultiQC")
  
  const tools = [
    {
      id: "FastQC",
      name: "FastQC",
      description: "Quality control tool for sequencing data",
      details: "Provides quality control checks on raw sequence data coming from high throughput sequencing pipelines."
    },
    {
      id: "Bowtie2",
      name: "Bowtie2",
      description: "Read alignment",
      details: "An ultrafast and memory-efficient tool for aligning sequencing reads to long reference sequences."
    },
    {
      id: "Kraken2",
      name: "Kraken2",
      description: "Taxonomic classification",
      details: "Taxonomic classification system using exact k-mer matches to achieve high accuracy and fast classification speeds."
    },
    {
      id: "Porechop",
      name: "Porechop",
      description: "Adapter trimming for Oxford Nanopore reads",
      details: "Tool for finding and removing adapters from Oxford Nanopore reads."
    },
    {
      id: "MultiQC",
      name: "MultiQC",
      description: "Aggregate results from bioinformatics analyses",
      details: "Searches a directory for analysis logs and compiles a HTML report with plots to visualize quality control results across many samples."
    },
    {
      id: "Krona",
      name: "Krona",
      description: "Interactive visualization of taxonomic data",
      details: "Interactive metagenomic visualization in a web browser."
    }
  ]

  const currentTool = tools.find(tool => tool.id === selectedTool) || tools[0]

  return (
    <section id="tools" className="py-16 border-b">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Tools we plan on integrating in our MVP</h2>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`px-4 py-2 border rounded-full transition-colors ${
                selectedTool === tool.id 
                  ? 'bg-black text-white' 
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              {tool.name}
            </button>
          ))}
        </div>
        
        <div className="border rounded-lg">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">{currentTool.name}</h3>
            <p className="text-gray-600">{currentTool.description}</p>
          </div>
          <div className="p-6">
            <p>{currentTool.details}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
