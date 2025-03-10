
import UploadInterface from './interface'

export const metadata = {
  title: 'Upload Files',
  description: 'Upload your bioinformatics files for analysis',
}

export default function UploadPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <UploadInterface />
    </div>
  )
}
