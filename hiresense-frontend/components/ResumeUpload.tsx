"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Upload, CheckCircle2, File } from "lucide-react"

import { getToken } from "@/services/auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ResumeUpload() {

  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleUpload() {

    if (!file) {
      setError("Choose a resume first")
      return
    }

    const token = getToken()

    if (!token) {
      setError("User not authenticated")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {

      setLoading(true)
      setError("")

      const response = await fetch(`${API_URL}/resume/parse`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      const data = await response.json()

      const resumeId = data?.data?.[0]?.id

      if (!resumeId) {
        throw new Error("resume_id missing from response")
      }

      localStorage.setItem("resume_id", resumeId)
      localStorage.setItem("resume_uploaded", "true")

      setSuccess(true)

      setTimeout(() => {
        router.push("/dashboard")
      }, 2500)

    } catch (err) {

      console.error(err)
      setError("Upload failed. Please try again.")

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="max-w-xl mx-auto">

      <Card className="bg-neutral-950 border border-neutral-800 shadow-sm">

        <CardHeader className="space-y-2">

          <CardTitle className="text-2xl font-semibold flex items-center gap-2">

            <Upload className="w-5 h-5 text-blue-400" />

            Upload Your Resume

          </CardTitle>

          <p className="text-gray-400 text-sm">
            Upload your resume to analyze ATS compatibility,
            improve resume content, and get job recommendations.
          </p>

        </CardHeader>

        <CardContent className="space-y-6">

          {!success && (

            <>
              {/* Upload Area */}

              <label className="flex flex-col items-center justify-center border border-dashed border-neutral-700 rounded-lg p-6 bg-neutral-900 hover:bg-neutral-800 transition cursor-pointer">

                <File className="w-8 h-8 text-gray-400 mb-2" />

                <span className="text-gray-300 text-sm font-medium">
                  Click to choose your resume
                </span>

                <span className="text-gray-500 text-xs mt-1">
                  PDF only
                </span>

                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    setFile(e.target.files?.[0] || null)
                    setError("")
                  }}
                />

              </label>

              {/* Selected File */}

              {file && (
                <div className="text-sm text-gray-300">
                  Selected file: <span className="font-medium">{file.name}</span>
                </div>
              )}

              {/* Error */}

              {error && (
                <div className="text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Upload Button */}

              <Button
                onClick={handleUpload}
                disabled={loading}
                className="w-full bg-white text-black hover:bg-gray-200 font-semibold shadow-sm"
              >
                {loading ? "Uploading..." : "Upload Resume"}
              </Button>

            </>
          )}

          {success && (

            <div className="flex items-start gap-3 bg-green-900/20 border border-green-800 rounded-lg p-4">

              <CheckCircle2 className="text-green-400 mt-1" size={20} />

              <div>

                <p className="font-semibold text-green-400">
                  Resume uploaded successfully
                </p>

                <p className="text-sm text-gray-300">
                  Try our resume improvement and ATS analysis tools.
                  Redirecting to dashboard...
                </p>

              </div>

            </div>

          )}

        </CardContent>

      </Card>

    </div>

  )
}