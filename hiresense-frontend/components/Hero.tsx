import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="py-28 text-center space-y-8">

      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
        AI Powered Resume Analysis
      </h1>

      <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
        HireSense AI analyzes your resume, calculates ATS score, and
        recommends the best matching jobs using semantic AI models.
      </p>

      <div className="flex justify-center gap-4 pt-4">

        <Link href="/resume">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200 transition"
          >
            Upload Resume
          </Button>
        </Link>

        <Link href="/jobs">
          <Button
            size="lg"
            variant="ghost"
            className="text-white border border-white/20 hover:bg-white/10 transition"
          >
            Explore Jobs
          </Button>
        </Link>

      </div>

    </section>
  )
}