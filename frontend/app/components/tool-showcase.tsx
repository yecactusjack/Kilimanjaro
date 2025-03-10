import { useState } from "react"

export default function ToolShowcase() {
  const [selectedTool, setSelectedTool] = useState("Krona")

  const tools = [
    { name: "FastQC", description: "" },
    { name: "Bowtie2", description: "" },
    { name: "Kraken2", description: "" },
    { name: "Porechop", description: "" },
    { name: "MultiQC", description: "" },
    { name: "Krona", 
      title: "Interactive metagenomic visualization",
      description: "Creates interactive hierarchical data visualizations, particularly useful for metagenomic classifications." 
    },
  ]

  const handleToolSelect = (toolName: string) => {
    setSelectedTool(toolName)
  }

  const selectedToolData = tools.find(tool => tool.name === selectedTool)

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
          Tools we plan on integrating in our MVP
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {tools.map((tool) => (
            <button
              key={tool.name}
              onClick={() => handleToolSelect(tool.name)}
              className={`border ${
                selectedTool === tool.name
                  ? "bg-black text-white"
                  : "border-gray-300 bg-white text-black"
              } rounded-full px-4 py-2`}
            >
              {tool.name}
            </button>
          ))}
        </div>

        {selectedToolData && (
          <div className="border border-gray-300 rounded-none overflow-hidden">
            <div className="p-6 border-b border-gray-300">
              <h3 className="text-xl font-bold">{selectedToolData.name}</h3>
              {selectedToolData.title && (
                <p className="text-gray-600">{selectedToolData.title}</p>
              )}
            </div>
            {selectedToolData.description && (
              <div className="p-6">
                <p className="text-gray-600">{selectedToolData.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}