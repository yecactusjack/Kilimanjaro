import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({
    model: openai("gpt-4-turbo"),
    messages,
    system:
      "You are an AI assistant for Goldbach Labs, a company that automates bioinformatics pipelines. Based on the user's dataset description and desired results, recommend the most suitable algorithm(s) from the following list: Bowtie, BWA, STAR, HISAT2, GATK, SHRiMP, and Canu. Explain why the recommended algorithm(s) are suitable for their specific task and data type. Provide a brief explanation of how the algorithm(s) work and their advantages.",
  })
  return result.toDataStreamResponse()
}

