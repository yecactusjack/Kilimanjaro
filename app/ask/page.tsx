
import AskInterface from './interface'

export const metadata = {
  title: 'Ask & Query',
  description: 'Ask questions about your bioinformatics files',
}

export default function AskPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Query Your Bioinformatics Data</h1>
      <AskInterface />
    </div>
  )
}
