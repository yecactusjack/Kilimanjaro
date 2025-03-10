import Header from "../components/header"
import Footer from "../components/footer"
import UploadInterface from "./interface"

export default function UploadPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow py-12">
        <UploadInterface />
      </main>
      <Footer />
    </div>
  )
}