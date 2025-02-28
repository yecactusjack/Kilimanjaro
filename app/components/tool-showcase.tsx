"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  {
    name: "FastQC",
    description: "Quality control tool for high throughput sequence data",
    details:
      "Provides a comprehensive report on sequence quality, including per base quality scores, GC content, and overrepresented sequences.",
  },
  {
    name: "Bowtie2",
    description: "Fast and sensitive read alignment",
    details:
      "Aligns short DNA sequences (reads) to a reference genome, particularly effective for reads 50-100 bp long.",
  },
  {
    name: "Kraken2",
    description: "Taxonomic classification of sequencing reads",
    details: "Assigns taxonomic labels to metagenomic DNA sequences with high accuracy and speed.",
  },
  {
    name: "Porechop",
    description: "Adapter trimmer for Oxford Nanopore reads",
    details: "Finds and removes adapters from Oxford Nanopore reads, including in the middle of reads.",
  },
  {
    name: "MultiQC",
    description: "Aggregate results from bioinformatics analyses",
    details:
      "Searches a directory for analysis logs and compiles a HTML report with plots to visualize quality control results across many samples.",
  },
  {
    name: "Krona",
    description: "Interactive metagenomic visualization",
    details:
      "Creates interactive hierarchical data visualizations, particularly useful for metagenomic classifications.",
  },
]

export default function ToolShowcase() {
  const [selectedTool, setSelectedTool] = useState(tools[0])

  return (
    <section id="tools" className="py-16 bg-white text-black">
      <div className="aesthetic-divider"></div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Tools we plan on integrating in our MVP</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tools.map((tool) => (
            <motion.button
              key={tool.name}
              onClick={() => setSelectedTool(tool)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedTool.name === tool.name
                  ? "bg-primary text-white"
                  : "bg-secondary text-primary hover:bg-primary hover:text-white"
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tool.name}
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTool.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white text-gray-800 overflow-hidden shadow-lg">
              <CardHeader className="bg-secondary border-b border-gray-200">
                <CardTitle className="text-2xl text-primary">{selectedTool.name}</CardTitle>
                <CardDescription className="text-gray-600 text-lg">{selectedTool.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-4">
                <p className="text-gray-700 text-lg leading-relaxed">{selectedTool.details}</p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}