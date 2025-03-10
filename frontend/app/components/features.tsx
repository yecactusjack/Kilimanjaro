
import { MessageSquare, Zap, SquareDashedBottom, Users } from "lucide-react"

export default function Features() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
          Bioinformatics, Simplified by Intelligence
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 border border-gray-200">
            <div className="mb-4 text-blue-600">
              <MessageSquare size={36} />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Natural Language Interface</h3>
            <p className="text-gray-600">
              Users interact using a ChatGPT-like interface. Describe data in natural language.
            </p>
          </div>

          <div className="bg-white p-6 border border-gray-200">
            <div className="mb-4 text-blue-600">
              <Zap size={36} />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Automated Pipeline Selection</h3>
            <p className="text-gray-600">
              The AI agent selects the best data processing pipeline. It uses dataset type and research objectives.
            </p>
          </div>

          <div className="bg-white p-6 border border-gray-200">
            <div className="mb-4 text-blue-600">
              <SquareDashedBottom size={36} />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Eliminate Manual Steps</h3>
            <p className="text-gray-600">
              The system automatically executes required tools and workflows. Efficiency is significantly improved.
            </p>
          </div>

          <div className="bg-white p-6 border border-gray-200">
            <div className="mb-4 text-blue-600">
              <Users size={36} />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Accessibility</h3>
            <p className="text-gray-600">
              Our solution bridges the accessibility gap, allowing non-coders to use advanced bioinformatics tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
