
import AskInterface from './interface'

export const metadata = {
  title: 'Ask Questions',
  description: 'Ask questions about your bioinformatics files',
}

export default function AskPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Ask Questions About Your File</h1>
      <p className="mb-6 text-gray-600">
        Ask questions about your uploaded file in natural language. 
        Our AI will analyze the file and provide insightful answers.
      </p>
      <AskInterface />
    </div>
  )
}
