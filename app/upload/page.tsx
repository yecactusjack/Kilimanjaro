import UploadInterface from './interface'
import ToolsSection from '../components/tools-section'
import Footer from '../components/footer'

export const metadata = {
  title: 'Upload bioinformatics files',
  description: 'Upload your genomic data for processing',
}

export default function UploadPage() {
  return (
    <>
      <div className="container mx-auto py-8 px-4 border-b border-gray-200">
        <UploadInterface />
      </div>
      <ToolsSection />
      <Footer />
    </>
  )
}