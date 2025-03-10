
"use client"

import { useState } from "react"

interface Tool {
  id: string
  name: string
  description: string
  detail: string
}

export default function ToolsSection() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  
  const tools: Tool[] = [
    {
      id: "fastqc",
      name: "FastQC",
      description: "Quality control for high throughput sequence data",
      detail: "Provides quality control reports for NGS data, allowing users to identify problems in their sequencing data."
    },
    {
      id: "bowtie2",
      name: "Bowtie2",
      description: "Fast and sensitive read alignment",
      detail: "An ultrafast and memory-efficient tool for aligning sequencing reads to long reference sequences."
    },
    {
      id: "kraken2",
      name: "Kraken2",
      description: "Taxonomic sequence classification system",
      detail: "Uses exact k-mer matches to assign taxonomic labels to metagenomic DNA sequences."
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
      detail: "Searches a directory for analysis logs and compiles a HTML report with plots to visualize quality control results across many samples."
    },
    {
      id: "krona",
      name: "Krona",
      description: "Interactive metagenomic visualization",
      detail: "Creates interactive hierarchical data visualizations, particularly useful for metagenomic classifications."
    }
  ]

  return (
    <section className="border-t border-gray-200 py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Tools we plan on integrating in our MVP</h2>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool)}
              className={`px-4 py-2 rounded-full border ${
                selectedTool?.id === tool.id 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black border-black hover:bg-gray-50'
              }`}
            >
              {tool.name}
            </button>
          ))}
        </div>
        
        {selectedTool && (
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold">{selectedTool.name}</h3>
              <p className="text-gray-700">{selectedTool.description}</p>
            </div>
            <div className="p-4">
              <p>{selectedTool.detail}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
