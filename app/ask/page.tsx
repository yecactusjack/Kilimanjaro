
import QueryInterface from './interface'

export const metadata = {
  title: 'Analyze Files',
  description: 'Ask questions about your bioinformatics files',
}

export default function AskPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <QueryInterface />
    </div>
  )
}
