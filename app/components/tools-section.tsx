"use client"

import { useState } from "react"

export default function ToolsSection() {
  const [activeTool, setActiveTool] = useState('Porechop')

  const tools = {
    'FastQC': {
      title: 'FastQC',
      description: 'Quality control tool for high throughput sequence data',
      details: 'Provides quality control checks on raw sequence data coming from high throughput sequencing pipelines.'
    },
    'Bowtie2': {
      title: 'Bowtie2',
      description: 'Fast and sensitive read alignment',
      details: 'An ultrafast and memory-efficient tool for aligning sequencing reads to long reference sequences.'
    },
    'Kraken2': {
      title: 'Kraken2',
      description: 'Taxonomic classification system',
      details: 'Assigns taxonomic labels to short DNA sequences with high accuracy and speed.'
    },
    'Porechop': {
      title: 'Porechop',
      description: 'Adapter trimmer for Oxford Nanopore reads',
      details: 'Finds and removes adapters from Oxford Nanopore reads, including in the middle of reads.'
    },
    'MultiQC': {
      title: 'MultiQC',
      description: 'Aggregate analysis reports',
      details: 'Searches for analysis logs and compiles them into a single HTML report for easy visualization.'
    },
    'Krona': {
      title: 'Krona',
      description: 'Interactive metagenomic visualization',
      details: 'Creates interactive hierarchical data visualizations, particularly useful for metagenomic classifications.'
    }
  }

  return (
    <section id="tools" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Tools we plan on integrating in our MVP</h2>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8">
          {Object.keys(tools).map((toolName) => (
            <button
              key={toolName}
              onClick={() => setActiveTool(toolName)}
              className={`px-4 py-2 rounded-full ${
                activeTool === toolName ? 'bg-black text-white' : 'bg-white text-black border border-gray-300'
              }`}
            >
              {toolName}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-xl font-bold">{tools[activeTool].title}</h3>
            <p>{tools[activeTool].description}</p>
          </div>
          <div className="p-4">
            <p>{tools[activeTool].details}</p>
          </div>
        </div>
      </div>
    </section>
  )
}