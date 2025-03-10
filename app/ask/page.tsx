import AskInterface from './interface'

// Placeholder components - these would need to be properly implemented
const ToolsSection = () => <div>This is a placeholder for the Tools Section</div>;
const Footer = () => <div>This is a placeholder for the Footer</div>;

export const metadata = {
  title: 'Ask questions about your data',
  description: 'Get answers about your bioinformatics data',
}

export default function AskPage() {
  return (
    <>
      <div className="container mx-auto py-8 px-4 border-b border-gray-200">
        <AskInterface />
      </div>
      <ToolsSection />
      <Footer />
    </>
  )
}