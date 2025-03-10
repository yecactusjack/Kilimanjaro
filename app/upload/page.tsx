
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Interface from "./interface"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-black">Upload Files</h1>
          <p className="text-gray-600 mt-2">
            Upload your bioinformatics files here for analysis. After uploading, you can ask questions about your data in the Analysis section.
          </p>
          <div className="mt-4 flex gap-4">
            <div className="flex items-center text-sm bg-black text-white px-3 py-1">
              <span>You are here: Upload</span>
            </div>
            <Link href="/chat" className="flex items-center text-sm text-black border border-black px-3 py-1 hover:bg-gray-100">
              <span>Next step: Analyze</span>
            </Link>
          </div>
        </div>

        <Interface />
      </div>
    </div>
  )
}
