
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Interface from "./interface"
import Footer from "../components/footer"

export default function UploadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="container mx-auto py-8 px-4 flex-grow">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-black">Upload Your Files</h1>
          <p className="text-gray-600 mt-2">
            Upload your bioinformatics files for analysis with HiveMind
          </p>
        </div>

        <Interface />
      </div>
      <Footer />
    </div>
  )
}
