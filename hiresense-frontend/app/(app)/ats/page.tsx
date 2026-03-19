"use client"

import { useState, useEffect } from "react"
import { getATSScore } from "@/services/ats"
import { ATSResponse } from "@/types/ats"
import ScoreCard from "@/components/ScoreCard"
import SkillSection from "@/components/SkillSection"
import Recommendations from "@/components/Recommendations"
import { motion, AnimatePresence } from "framer-motion"

export default function ATSPage() {

  const [jobDescription, setJobDescription] = useState("")
  const [result, setResult] = useState<ATSResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  async function handleAnalyze() {

    const resumeId = localStorage.getItem("resume_id")

    if (!resumeId) {
      setMessage("Upload your resume first to run ATS analysis.")
      return
    }

    if (!jobDescription.trim()) {
      setMessage("Please provide a job description.")
      return
    }

    try {

      setLoading(true)

      const data = await getATSScore(
        resumeId,
        jobDescription
      )

      setResult(data)

    } catch (error) {

      console.error(error)
      setMessage("Something went wrong while calculating the ATS score.")

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10 relative">

      {/* POPUP NOTIFICATION */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="
              fixed
              top-6
              left-1/2
              -translate-x-1/2
              z-50
              bg-neutral-900/80
              backdrop-blur-xl
              border border-neutral-700
              text-white
              px-6 py-4
              rounded-xl
              shadow-2xl
              shadow-black/50
              text-sm
              font-medium
            "
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          ATS Resume Analyzer
        </h1>

        <p className="text-gray-400 mt-2">
          Analyze how well your resume matches a job description using AI-powered ATS scoring.
        </p>
      </div>

      {/* Job Description Input */}
      <div className="space-y-4">

        <textarea
          placeholder="Paste the job description here..."
          className="w-full border border-gray-800 bg-black text-white p-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
          rows={8}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-white text-black rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>

      </div>

      {result && (
        <div className="space-y-10">

          {/* ATS Score */}
          <div>
            <h2 className="text-3xl font-semibold">
              ATS Score: {result.final_score.toFixed(2)}%
            </h2>
          </div>

          {/* Score Cards */}
          <div className="grid md:grid-cols-3 gap-6">

            <ScoreCard
              title="Semantic Score"
              score={result.semantic_score}
            />

            <ScoreCard
              title="Skill Match"
              score={result.skill_score}
            />

            <ScoreCard
              title="Structure Score"
              score={result.structure.structure_score}
            />

          </div>

          {/* Skills */}
          <SkillSection
            matched={result.skills.matched_skills}
            missing={result.skills.missing_skills}
          />

          {/* Recommendations */}
          <Recommendations
            list={result.recommendations}
          />

        </div>
      )}

    </div>
  )
}