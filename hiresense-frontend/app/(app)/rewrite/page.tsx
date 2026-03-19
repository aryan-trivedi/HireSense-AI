"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import ResumeUpload from "@/components/ResumeUpload"
import ResumeComparison from "@/components/ResumeComparison"
import Loading from "@/components/Loading"

import { supabase } from "@/services/supabase"

export default function RewritePage() {

  const [resume, setResume] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [resumeId, setResumeId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {

    const id = localStorage.getItem("resume_id")

    if (id) {
      setResumeId(id)
    } else {
      setMessage("Upload your resume first to use AI rewrite.")
    }

  }, [])

  useEffect(() => {

    if (!resumeId) return

    const fetchRewrite = async () => {

      setLoading(true)

      try {

        const { data: sessionData } = await supabase.auth.getSession()

        const token = sessionData.session?.access_token

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/ai/rewrite/${resumeId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        )

        const response = await res.json()

        setResume(response)

      } catch (err) {

        console.error("Rewrite failed", err)
        setMessage("Something went wrong while rewriting the resume.")

      }

      setLoading(false)

    }

    fetchRewrite()

  }, [resumeId])


  useEffect(() => {

    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 3500)

      return () => clearTimeout(timer)
    }

  }, [message])


  return (

    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 relative">

      {/* POPUP NOTIFICATION */}
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


      <div className="space-y-4 max-w-3xl">

        <h1 className="text-5xl font-bold tracking-tight">
          AI Resume Rewrite
        </h1>

        <p className="text-gray-400 text-lg">
          Improve your resume using AI optimization.
        </p>

      </div>

      {!resumeId && (
        <ResumeUpload />
      )}

      {loading && <Loading />}

      {resume && !loading && (
        <ResumeComparison
          original={resume.original_resume}
          improved={resume.improved_resume}
        />
      )}

    </div>

  )
}