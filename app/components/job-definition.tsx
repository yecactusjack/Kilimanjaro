"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Upload, ChevronLeft, ChevronRight } from "lucide-react"

export default function JobDefinition() {
  const [step, setStep] = useState(1)
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [datasetName, setDatasetName] = useState("")
  const [dataDescription, setDataDescription] = useState("")
  const [desiredResults, setDesiredResults] = useState("")

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <section id="job-definition" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Define Your Bioinformatics Job</h2>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="w-full max-w-2xl mx-auto bg-white border border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-black">Step {step} of 4</CardTitle>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Upload Your Dataset</h3>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">Supported file types: FASTQ, BAM, VCF (MAX. 500MB)</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                  </div>
                  <Input
                    value={datasetName}
                    onChange={(e) => setDatasetName(e.target.value)}
                    placeholder="Dataset name"
                    className="mt-4 w-full border-gray-300"
                  />
                </div>
              )}
              {step === 2 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Describe Your Dataset</h3>
                  <Textarea
                    value={dataDescription}
                    onChange={(e) => setDataDescription(e.target.value)}
                    placeholder="e.g., 100bp paired-end Illumina RNA-Seq reads, 50 million reads per sample"
                    className="w-full h-32 border-gray-300"
                  />
                </div>
              )}
              {step === 3 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Desired Results</h3>
                  <Textarea
                    value={desiredResults}
                    onChange={(e) => setDesiredResults(e.target.value)}
                    placeholder="e.g., Identify differentially expressed genes between treatment and control groups"
                    className="w-full h-32 border-gray-300"
                  />
                </div>
              )}
              {step === 4 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">AI Recommendation</h3>
                  <form onSubmit={onSubmit}>
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ask for clarification or additional information..."
                      className="w-full mb-4 border-gray-300"
                    />
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Get Recommendation
                    </Button>
                  </form>
                  <div className="mt-4 h-64 overflow-y-auto">
                    {messages.map((m) => (
                      <div key={m.id} className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}>
                        <span
                          className={`inline-block p-2 rounded-lg ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
                        >
                          {m.content}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 && (
                <Button onClick={handlePrevStep} className="bg-gray-200 hover:bg-gray-300 text-black">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
              )}
              {step < 4 && (
                <Button onClick={handleNextStep} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

