"use client"

export default function ToolShowcase() {
  return (
    <section id="tools" className="py-16 bg-white border-t border-gray-200">
      <div className="container mx-auto px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center">Our Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 sm:p-8 rounded-md border border-gray-100 hover:shadow-sm transition-shadow">
            <h3 className="text-lg sm:text-xl font-bold mb-4">File Upload</h3>
            <p className="text-gray-600 text-sm sm:text-base">Upload genomic data files for analysis. Supports FASTQ, BAM, VCF, and other formats.</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-md border border-gray-100 hover:shadow-sm transition-shadow">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Interactive Chat</h3>
            <p className="text-gray-600 text-sm sm:text-base">Conversational interface with AI for complex bioinformatics queries and visualizations.</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-md border border-gray-100 hover:shadow-sm transition-shadow">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Question Answering</h3>
            <p className="text-gray-600 text-sm sm:text-base">Ask specific questions about your genomic data and get detailed, accurate answers.</p>
          </div>
        </div>
      </div>
    </section>
  )
}