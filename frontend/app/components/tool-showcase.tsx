
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ToolShowcase() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
          Powerful Tools
        </h2>
        
        <Tabs defaultValue="sequence" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-none border border-black">
            <TabsTrigger value="sequence" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white">
              Sequence Analysis
            </TabsTrigger>
            <TabsTrigger value="alignment" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white">
              Alignment
            </TabsTrigger>
            <TabsTrigger value="variant" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white">
              Variant Analysis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sequence" className="mt-6 p-6 border border-black">
            <h3 className="text-xl font-bold text-black mb-4">Sequence Analysis Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2">BLAST</h4>
                <p className="text-gray-600">Basic Local Alignment Search Tool for finding regions of similarity between sequences.</p>
              </div>
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2">FastQC</h4>
                <p className="text-gray-600">Quality control tool for high throughput sequence data.</p>
              </div>
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2">Trimmomatic</h4>
                <p className="text-gray-600">A flexible read trimming tool for Illumina NGS data.</p>
              </div>
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2">Cutadapt</h4>
                <p className="text-gray-600">Removes adapter sequences, primers, and other specified sequences.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="alignment" className="mt-6 p-6 border border-black">
            <h3 className="text-xl font-bold text-black mb-4">Alignment Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2">Bowtie2</h4>
                <p className="text-gray-600">An ultrafast and memory-efficient tool for aligning sequencing reads to long reference sequences.</p>
              </div>
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2">BWA</h4>
                <p className="text-gray-600">Burrows-Wheeler Aligner for mapping low-divergent sequences against a large reference genome.</p>
              </div>
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2">STAR</h4>
                <p className="text-gray-600">Spliced Transcripts Alignment to a Reference for RNA-seq data.</p>
              </div>
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2">HISAT2</h4>
                <p className="text-gray-600">Fast and sensitive alignment program for mapping next-generation sequencing reads.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="variant" className="mt-6 p-6 border border-black">
            <h3 className="text-xl font-bold text-black mb-4">Variant Analysis Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2">SAMtools</h4>
                <p className="text-gray-600">Provides various utilities for manipulating alignments in the SAM format.</p>
              </div>
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2">BCFtools</h4>
                <p className="text-gray-600">Set of utilities for variant calling and manipulating VCFs and BCFs.</p>
              </div>
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2">GATK</h4>
                <p className="text-gray-600">Genome Analysis Toolkit for variant discovery and genotyping.</p>
              </div>
              <div className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2">VEP</h4>
                <p className="text-gray-600">Variant Effect Predictor for determining the effect of variants on genes, transcripts, and protein sequences.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
