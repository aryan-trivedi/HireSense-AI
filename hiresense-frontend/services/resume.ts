const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function uploadResume(file: File, token: string) {

  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`${API_URL}/resume/parse`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })

  const text = await response.text()

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Server returned non-JSON:", text)
    throw new Error("Server error during resume upload")
  }
}