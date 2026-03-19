"use client"

import { Sparkles } from "lucide-react"

export default function Loading() {

  return (

    <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">

      <Sparkles className="animate-pulse text-blue-400" size={40} />

      <p className="text-gray-300 text-lg">
        AI is rewriting your resume...
      </p>

      <p className="text-gray-500 text-sm">
        Optimizing bullet points and ATS impact
      </p>

    </div>

  )
}