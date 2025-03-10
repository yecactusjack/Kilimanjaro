
"use client"

import { useState } from "react"

const tools = [
  {
    id: "fastqc",
    name: "FastQC",
    description: "Adapter trimmer for Oxford Nanopore reads"
  },
  {
    id: "bowtie2",
    name: "Bowtie2",
    description: "Aligns DNA sequences to reference genomes"
  },
  {
    id: "kraken2",
    name: "Kraken2",
    description: "Taxonomic classification system for metagenomic data"
  },
  {
    id: "porechop",
    name: "Porechop",
    description: "Adapter trimmer for Oxford Nanopore reads"
  },
  {
    id: "multiqc",
    name: "MultiQC",
    description: "Aggregate results from bioinformatics analyses"
  },
  {
    id: "krona",
    name: "Krona",
    description: "Interactive visualization for metagenomic data"
  }
]

export default function ToolsSection() {
  const [activeTool, setActiveTool] = useState("porechop")

  const activateToolDescription = (id: string) => {
    setActiveTool(id)
  }

  const getToolDescription = () => {
    const tool = tools.find(t => t.id === activeTool)
    return (
      <div className="p-6 border border-gray-100 rounded-md">
        <h3 className="text-xl font-bold mb-3">{tool?.name}</h3>
        <p className="text-gray-700">{tool?.description}</p>
        <p className="mt-4 text-gray-600">
          {activeTool === "porechop" && "Finds and removes adapters from Oxford Nanopore reads, including in the middle of reads."}
          {activeTool === "fastqc" && "A quality control tool for high throughput sequence data."}
          {activeTool === "bowtie2" && "An ultrafast and memory-efficient tool for aligning sequencing reads to long reference sequences."}
          {activeTool === "kraken2" && "A taxonomic classification system using exact k-mer matches."}
          {activeTool === "multiqc" && "Aggregate results from bioinformatics analyses across many samples into a single report."}
          {activeTool === "krona" && "Allows hierarchical data to be explored with zooming, multi-layered pie charts."}
        </p>
      </div>
    )
  }

  return (
    <section id="tools" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Tools we plan on integrating in our MVP</h2>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => activateToolDescription(tool.id)}
              className={`tool-button ${activeTool === tool.id ? 'active' : ''}`}
            >
              {tool.name}
            </button>
          ))}
        </div>
        
        <div className="max-w-2xl mx-auto">
          {getToolDescription()}
        </div>
      </div>
    </section>
  )
}
