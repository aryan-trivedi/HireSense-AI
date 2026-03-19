"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

import JobCard from "@/components/JobCard"
import { Skeleton } from "@/components/ui/skeleton"
import { supabase } from "@/services/supabase"

type Job = {
  title: string
  description: string
  skills: string
  match_score: string
  matched_skills: string[]
  missing_skills: string[]
  recommendation: string
}

export default function JobsPage() {

  const router = useRouter()

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [needsResume, setNeedsResume] = useState(false)

  useEffect(() => {

    const fetchJobs = async () => {

      const resumeId = localStorage.getItem("resume_id")

      if (!resumeId) {
        setNeedsResume(true)
        setMessage("Upload your resume first to unlock job recommendations.")
        setLoading(false)
        return
      }

      try {

        const { data } = await supabase.auth.getSession()
        const token = data.session?.access_token

        if (!token) {
          console.error("No auth token found")
          setLoading(false)
          return
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/recommend/${resumeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (!res.ok) {
          throw new Error("Failed to fetch jobs")
        }

        const result = await res.json()

        setJobs(result.recommendations || [])

      } catch (error) {

        console.error("Jobs fetch failed", error)
        setMessage("Unable to fetch job recommendations.")

      }

      setLoading(false)
    }

    fetchJobs()

  }, [])

  useEffect(() => {

    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 3500)

      return () => clearTimeout(timer)
    }

  }, [message])

  return (

    <div className="max-w-6xl mx-auto px-8 py-12 space-y-10 relative">

      {/* Premium Popup Notification */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -35 }}
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


      {/* HEADER */}

      <div className="space-y-2">

        <h1 className="text-3xl font-semibold tracking-tight">
          Recommended Jobs
        </h1>

        <p className="text-sm text-gray-400">
          Jobs matched to your resume using semantic AI analysis.
        </p>

      </div>


      {/* Upload Resume CTA */}

      {needsResume && (

        <div className="flex flex-col items-center justify-center gap-6 py-20">

          <p className="text-neutral-400 text-sm text-center max-w-md">
            Upload your resume to unlock personalized job recommendations
            powered by AI-driven semantic matching.
          </p>

          <button
            onClick={() => router.push("/resume")}
            className="
              group
              px-6 py-3
              rounded-lg
              bg-neutral-900
              border border-neutral-700
              text-white
              text-sm
              font-medium
              hover:bg-neutral-800
              transition-all
              duration-300
              shadow-lg shadow-black/40
              hover:scale-[1.03]
            "
          >
            Upload Resume
          </button>

        </div>

      )}


      {/* LOADING */}

      {loading && !needsResume && (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[...Array(6)].map((_, i) => (

            <Skeleton
              key={i}
              className="h-64 w-full bg-neutral-900"
            />

          ))}

        </div>

      )}


      {/* JOBS */}

      {!loading && !needsResume && (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs.map((job, index) => (
            <JobCard
              key={index}
              job={job}
            />
          ))}

        </div>

      )}

    </div>

  )
}