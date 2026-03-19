"use client"

import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/services/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ResetPasswordPage() {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {

    setErrorMsg("")
    setMessage("")

    if (!email) {
      setErrorMsg("Please enter your email address.")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email)

    setLoading(false)

    if (error) {

      if (error.message.includes("rate limit")) {
        setErrorMsg(
          "Too many requests. Please wait a moment before trying again."
        )
      } else {
        setErrorMsg(error.message)
      }

    } else {

      setMessage(
        "If an account exists for this email, a password reset link has been sent."
      )

    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-10">

      {/* Logo */}
      <Link href="/" className="text-3xl font-semibold tracking-tight">
        HireSense AI
      </Link>

      {/* Card Container */}
      <div className="w-full max-w-md space-y-6">

        <h1 className="text-2xl font-semibold text-center">
          Reset Password
        </h1>

        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          className="w-full bg-neutral-900 border border-neutral-700 hover:bg-neutral-800"
          onClick={handleReset}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </Button>

        {/* Success Message */}
        {message && (
          <p className="text-green-400 text-sm text-center">
            {message}
          </p>
        )}

        {/* Error Message */}
        {errorMsg && (
          <p className="text-red-400 text-sm text-center">
            {errorMsg}
          </p>
        )}

        <Link
          href="/login"
          className="text-sm text-gray-400 text-center block hover:underline"
        >
          Back to Login
        </Link>

      </div>

    </div>
  )
}