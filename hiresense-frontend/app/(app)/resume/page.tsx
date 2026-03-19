import ResumeUpload from "@/components/ResumeUpload"
import { FileText, Sparkles, BarChart } from "lucide-react"

export default function ResumePage() {

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">

      {/* HERO SECTION */}

      <section className="space-y-6 max-w-3xl">

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          Optimize Your Resume with AI
        </h1>

        <p className="text-xl text-gray-300 leading-relaxed">
          Upload your resume and let HireSense AI analyze it using
          modern ATS intelligence. Discover skill gaps, improve your
          resume content, and unlock personalized job recommendations.
        </p>

      </section>


      {/* FEATURES */}

      <section className="grid md:grid-cols-3 gap-6">

        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 space-y-3">

          <Sparkles className="text-blue-400" />

          <h3 className="text-lg font-semibold">
            AI Resume Improvement
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed">
            Automatically enhance your resume bullet points using
            AI-powered rewriting that improves clarity, impact,
            and recruiter appeal.
          </p>

        </div>


        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 space-y-3">

          <BarChart className="text-purple-400" />

          <h3 className="text-lg font-semibold">
            ATS Compatibility Analysis
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed">
            See how your resume performs against modern Applicant
            Tracking Systems used by companies and identify
            improvements to increase your chances.
          </p>

        </div>


        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 space-y-3">

          <FileText className="text-green-400" />

          <h3 className="text-lg font-semibold">
            Job Match Insights
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed">
            Discover roles that align with your resume using semantic
            job matching powered by AI embeddings and vector search.
          </p>

        </div>

      </section>


      {/* UPLOAD SECTION */}

      <section className="space-y-6">

        <div className="space-y-2">

          <h2 className="text-2xl font-semibold">
            Upload Your Resume
          </h2>

          <p className="text-gray-400">
            Upload a PDF resume to begin your AI-powered resume analysis.
          </p>

        </div>

        <ResumeUpload />

      </section>

    </div>
  )
}