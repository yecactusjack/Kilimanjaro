
"use client"

import { useState } from "react"

// Define the tool data structure
interface Tool {
  id: string;
  name: string;
  description: string;
  detail: string;
}

export default function ToolsSection() {
  // Define the available tools
  const tools: Tool[] = [
    {
      id: "fastqc",
      name: "FastQC",
      description: "Quality control tool for high throughput sequence data",
      detail: "Provides quality control checks on raw sequence data coming from high throughput sequencing pipelines."
    },
    {
      id: "bowtie2",
      name: "Bowtie2",
      description: "Ultrafast and memory-efficient tool for aligning sequencing reads",
      detail: "An ultrafast and memory-efficient tool for aligning sequencing reads to long reference sequences."
    },
    {
      id: "kraken2",
      name: "Kraken2",
      description: "Taxonomic classification of sequencing reads",
      detail: "Assigns taxonomic labels to short DNA sequences, usually obtained from metagenomic studies."
    },
    {
      id: "porechop",
      name: "Porechop",
      description: "Adapter trimmer for Oxford Nanopore reads",
      detail: "Finds and removes adapters from Oxford Nanopore reads, including in the middle of reads."
    },
    {
      id: "multiqc",
      name: "MultiQC",
      description: "Aggregate results from bioinformatics analyses",
      detail: "Searches a directory for analysis logs and compiles a HTML report that summarizes all results."
    },
    {
      id: "krona",
      name: "Krona",
      description: "Interactive metagenomic visualization",
      detail: "Allows intuitive exploration of relative abundances and confidences within the complex hierarchies of metagenomic classifications."
    }
  ]

  const [selectedTool, setSelectedTool] = useState<Tool | null>(tools.find(t => t.id === "porechop") || null);

  return (
    <section id="tools" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Tools we plan on integrating in our MVP</h2>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool)}
              className={`px-5 py-2.5 rounded-full border transition-all duration-200 ${
                selectedTool?.id === tool.id 
                  ? 'bg-black text-white font-medium' 
                  : 'bg-white text-black border-black hover:bg-gray-50'
              }`}
            >
              {tool.name}
            </button>
          ))}
        </div>
        
        {selectedTool && (
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-3xl mx-auto">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-xl font-bold">{selectedTool.name}</h3>
              <p className="mt-2">{selectedTool.description}</p>
            </div>
            <div className="p-5">
              <p className="leading-relaxed">{selectedTool.detail}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
