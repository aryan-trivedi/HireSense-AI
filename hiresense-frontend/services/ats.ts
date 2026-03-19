import { ATSResponse } from "@/types/ats"
import { getToken } from "@/services/auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function getATSScore(
  resumeId: string,
  jobDescription: string
): Promise<ATSResponse> {

  const token = getToken()

  if (!token) {
    throw new Error("User not authenticated")
  }

  const url = `${API_URL}/ats/score/${resumeId}?job_description=${encodeURIComponent(jobDescription)}`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("ATS API error:", errorText)
    throw new Error("Failed to fetch ATS score")
  }

  return response.json()
}