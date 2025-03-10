
import AskInterface from './file'

export const metadata = {
  title: 'Ask About Your Data',
  description: 'Ask questions about your bioinformatics data',
}

export default function AskPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <AskInterface />
    </div>
  )
}
