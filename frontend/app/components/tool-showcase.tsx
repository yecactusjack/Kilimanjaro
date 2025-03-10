"use client"

import { useState } from "react"

export default function ToolShowcase() {
  const [selectedTool, setSelectedTool] = useState("Krona")

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Bioinformatics Tools</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {["Krona", "IGV", "BLAST"].map((tool) => (
          <button
            key={tool}
            className={`p-3 rounded-md ${
              selectedTool === tool 
                ? "bg-primary text-white" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedTool(tool)}
          >
            {tool}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        {selectedTool === "Krona" && (
          <div>
            <h3 className="font-bold mb-2">Krona Interactive Visualization</h3>
            <p className="mb-4">Create hierarchical, interactive visualizations of your metagenomic data.</p>
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              [Krona Visualization Placeholder]
            </div>
          </div>
        )}

        {selectedTool === "IGV" && (
          <div>
            <h3 className="font-bold mb-2">Integrated Genome Viewer</h3>
            <p className="mb-4">Explore genomic data and annotations in a responsive visual interface.</p>
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              [IGV Visualization Placeholder]
            </div>
          </div>
        )}

        {selectedTool === "BLAST" && (
          <div>
            <h3 className="font-bold mb-2">BLAST Sequence Alignment</h3>
            <p className="mb-4">Find regions of similarity between biological sequences.</p>
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              [BLAST Results Placeholder]
            </div>
          </div>
        )}
      </div>
    </div>
  )
}