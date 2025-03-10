
export default function Features() {
  return (
    <section id="features" className="py-16 border-b">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Bioinformatics, Simplified by Intelligence</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="border rounded-lg p-6">
            <div className="w-10 h-10 flex items-center justify-center text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Natural Language Interface</h3>
            <p className="text-gray-600">
              Users interact using a ChatGPT-like interface. Describe data in natural language.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="border rounded-lg p-6">
            <div className="w-10 h-10 flex items-center justify-center text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Automated Pipeline Selection</h3>
            <p className="text-gray-600">
              The AI agent selects the best data processing pipeline. It uses dataset type and research objectives.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="border rounded-lg p-6">
            <div className="w-10 h-10 flex items-center justify-center text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Eliminate Manual Steps</h3>
            <p className="text-gray-600">
              The system automatically executes required tools and workflows. Efficiency is significantly improved.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="border rounded-lg p-6">
            <div className="w-10 h-10 flex items-center justify-center text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Accessibility</h3>
            <p className="text-gray-600">
              Our solution bridges the accessibility gap, allowing non-coders to use advanced bioinformatics tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
