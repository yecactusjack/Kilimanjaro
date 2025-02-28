"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const algorithms = [
  {
    name: "FastQC",
    description: "Quality control tool for high throughput sequence data",
    details:
      "Provides a comprehensive report on sequence quality, including per base quality scores, GC content, and overrepresented sequences.",
    icon: "📊",
  },
  {
    name: "Bowtie2",
    description: "Fast and sensitive read alignment",
    details:
      "Aligns short DNA sequences (reads) to a reference genome, particularly effective for reads 50-100 bp long.",
    icon: "🎯",
  },
  {
    name: "Trimmomatic",
    description: "Flexible read trimming tool for Illumina NGS data",
    details:
      "Performs a variety of trimming tasks for Illumina paired-end and single-ended data, including adapter removal and quality trimming.",
    icon: "✂️",
  },
  {
    name: "SAMtools",
    description: "Utilities for manipulating alignments in SAM/BAM format",
    details:
      "Provides various tools for manipulating alignments, including sorting, merging, indexing, and generating alignments in various formats.",
    icon: "🧰",
  },
  {
    name: "BLAST",
    description: "Basic Local Alignment Search Tool",
    details:
      "Finds regions of local similarity between sequences, comparing nucleotide or protein sequences to sequence databases.",
    icon: "🔬",
  },
  {
    name: "DESeq2",
    description: "Differential gene expression analysis",
    details:
      "R package for analyzing count data from high-throughput sequencing assays and testing for differential expression.",
    icon: "📈",
  },
  {
    name: "GATK",
    description: "Genome Analysis Toolkit",
    details:
      "Offers a wide variety of tools for variant discovery, genotyping, and many other common variant analysis tasks.",
    icon: "🧬",
  },
]

export default function AlgorithmShowcase() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0])

  return (
    <section id="algorithms" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Our Cutting-Edge Tools</h2>
        <Tabs defaultValue={algorithms[0].name} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8">
            {algorithms.map((algo) => (
              <TabsTrigger
                key={algo.name}
                value={algo.name}
                onClick={() => setSelectedAlgorithm(algo)}
                className="px-6 py-3 text-sm bg-white text-black border border-gray-200 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-full shadow-sm"
              >
                {algo.icon} {algo.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={selectedAlgorithm.name}>
            <motion.div
              key={selectedAlgorithm.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white text-black border border-gray-200 overflow-hidden shadow-lg">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <CardTitle className="text-3xl text-blue-600">{selectedAlgorithm.name}</CardTitle>
                  <CardDescription className="text-gray-600 text-lg">{selectedAlgorithm.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-4">
                  <p className="text-gray-800 text-lg leading-relaxed">{selectedAlgorithm.details}</p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

