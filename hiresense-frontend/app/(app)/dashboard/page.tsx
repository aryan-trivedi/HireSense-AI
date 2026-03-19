"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

import FeatureCard from "@/components/FeatureCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import {
  BarChart,
  FileText,
  Briefcase,
  CheckCircle2,
  Github,
  Twitter
} from "lucide-react"

export default function DashboardPage() {

  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const uploaded = localStorage.getItem("resume_uploaded")

    if (uploaded) {
      setShowSuccess(true)
      localStorage.removeItem("resume_uploaded")
    }
  }, [])

  return (

    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">

      {/* Ambient gradient glow */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[900px] h-[900px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-[180px] rounded-full mt-[-300px]" />
      </div>

      <main className="flex-1 w-full">

        <div className="max-w-6xl mx-auto px-8 py-14 space-y-16">

          {/* HERO */}

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 max-w-4xl"
          >

            <h1 className="text-5xl font-bold tracking-tight leading-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
              Welcome to HireSense AI
            </h1>

            <p className="text-lg text-gray-400 leading-relaxed">
              HireSense AI helps you improve your resume using modern
              AI-powered analysis. Evaluate ATS compatibility, refine your
              resume content, and discover job opportunities aligned with
              your skills and experience.
            </p>

          </motion.section>


          {/* SUCCESS MESSAGE */}

          {showSuccess && (

            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="border border-green-800 bg-green-900/20 rounded-xl p-5 flex items-start gap-3"
            >

              <CheckCircle2 className="text-green-400 mt-1" />

              <div>

                <p className="font-medium text-green-400 text-sm">
                  Resume uploaded successfully
                </p>

                <p className="text-sm text-gray-300">
                  Your resume is ready. Use the tools below to analyze your
                  ATS score, improve resume quality, and explore relevant job
                  opportunities.
                </p>

              </div>

            </motion.section>

          )}


          {/* UPLOAD RESUME CTA */}

          <motion.section
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="relative flex items-center justify-between border border-neutral-800 rounded-xl p-8 bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden"
          >

            {/* gradient highlight (fixed so it doesn't block clicks) */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />

            <div className="space-y-1 relative z-10">

              <h2 className="text-lg font-semibold">
                Upload your resume to unlock AI insights
              </h2>

              <p className="text-sm text-gray-400">
                Analyze ATS compatibility, improve resume content,
                and receive AI-powered job recommendations.
              </p>

            </div>

            <Button
              size="lg"
              className="
                bg-white
                text-black
                hover:bg-gray-200
                font-medium
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
                hover:scale-[1.03]
              "
              onClick={() => router.push("/resume")}
            >
              Upload Resume
            </Button>

          </motion.section>


          {/* FEATURES */}

          <section className="grid md:grid-cols-3 gap-6">

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.15 }}>
              <FeatureCard
                title="Recommended Jobs"
                description="Discover job opportunities that best match your resume using semantic AI job matching."
                icon={<Briefcase className="w-5 h-5 text-purple-400" />}
                href="/jobs"
              />
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.15 }}>
              <FeatureCard
                title="ATS Resume Score"
                description="See how your resume performs against modern ATS systems used by recruiters."
                icon={<BarChart className="w-5 h-5 text-blue-400" />}
                href="/ats"
              />
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.15 }}>
              <FeatureCard
                title="AI Resume Rewrite"
                description="Improve resume bullet points using AI-powered rewriting and optimization."
                icon={<FileText className="w-5 h-5 text-green-400" />}
                href="/rewrite"
              />
            </motion.div>

          </section>

        </div>

      </main>


      {/* FOOTER */}

      <footer className="w-full bg-black border-t border-neutral-800">

        <div className="max-w-6xl mx-auto px-8 py-10 space-y-6">

          <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
            HireSense AI is an AI-powered resume intelligence platform designed to
            help professionals improve their resumes, evaluate ATS compatibility,
            and discover relevant job opportunities using modern AI techniques.
            The platform demonstrates practical applications of large language
            models, semantic search, and scalable full-stack systems.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-400">

            <span className="text-gray-500">
              Built by Aryan Trivedi
            </span>

            <a
              href="https://github.com/aryan-trivedi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>

            <a
              href="https://x.com/aryannnnnn95"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Twitter size={16} />
              X
            </a>

          </div>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Aryan Trivedi. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  )
}