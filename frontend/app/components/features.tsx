import { Terminal, BarChart, FileText, Cpu } from "lucide-react"

export default function Features() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 border border-black">
            <div className="mb-4">
              <Terminal size={36} className="text-black" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Command Line Interface</h3>
            <p className="text-gray-600">
              Access powerful bioinformatics tools through a simple chat interface
            </p>
          </div>

          <div className="bg-white p-6 border border-black">
            <div className="mb-4">
              <BarChart size={36} className="text-black" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Data Visualization</h3>
            <p className="text-gray-600">
              Visualize your genomic data with interactive charts and diagrams
            </p>
          </div>

          <div className="bg-white p-6 border border-black">
            <div className="mb-4">
              <FileText size={36} className="text-black" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">File Analysis</h3>
            <p className="text-gray-600">
              Upload and analyze genetic sequences, alignments, and more
            </p>
          </div>

          <div className="bg-white p-6 border border-black">
            <div className="mb-4">
              <Cpu size={36} className="text-black" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">AI Processing</h3>
            <p className="text-gray-600">
              Let our AI help interpret your data and suggest next steps
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}