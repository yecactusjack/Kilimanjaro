export default function Features() {
  return (
    <section id="features" className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Bioinformatics, Simplified by Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="border border-gray-100 shadow-sm p-8 rounded-md hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-md flex items-center justify-center mb-6 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-3">Natural Language Interface</h3>
            <p className="text-gray-600">Users interact using a ChatGPT-like interface. Describe data in natural language.</p>
          </div>
          <div className="border border-gray-100 shadow-sm p-8 rounded-md hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-md flex items-center justify-center mb-6 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-3">Automated Pipeline Selection</h3>
            <p className="text-gray-600">The AI agent selects the best data processing pipeline. It uses dataset type and research objectives.</p>
          </div>
          <div className="border border-gray-100 shadow-sm p-8 rounded-md hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-md flex items-center justify-center mb-6 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-3">Eliminate Manual Steps</h3>
            <p className="text-gray-600">The system automatically executes required tools and workflows. Efficiency is significantly improved.</p>
          </div>
          <div className="border border-gray-100 shadow-sm p-8 rounded-md hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-md flex items-center justify-center mb-6 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-3">Accessibility</h3>
            <p className="text-gray-600">Our solution bridges the accessibility gap, allowing non-coders to use advanced bioinformatics tools.</p>
          </div>
        </div>
      </div>
    </section>
  )
}