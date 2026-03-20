"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/services/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ResetPasswordPage() {

  const [mode, setMode] = useState<"request" | "update">("request")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)

  // Detect if user came from Supabase recovery email
  useEffect(() => {
    if (typeof window === "undefined") return

    const hash = window.location.hash

    if (hash.includes("type=recovery")) {
      setMode("update")
    }
  }, [])

  // Step 1: send reset email
  const handleReset = async () => {

    setErrorMsg("")
    setMessage("")

    if (!email) {
      setErrorMsg("Please enter your email address.")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://hire-sense-ai-pied.vercel.app/reset-password"
    })

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

  // Step 2: update password after user clicks email link
  const handleUpdatePassword = async () => {

    setErrorMsg("")
    setMessage("")

    if (!password) {
      setErrorMsg("Please enter a new password.")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    setLoading(false)

    if (error) {
      setErrorMsg(error.message)
    } else {
      setMessage("Password updated successfully. You can now log in.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-10">

      {/* Logo */}
      <Link href="/" className="text-3xl font-semibold tracking-tight">
        HireSense AI
      </Link>

      <div className="w-full max-w-md space-y-6">

        {mode === "request" && (
          <>
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
          </>
        )}

        {mode === "update" && (
          <>
            <h1 className="text-2xl font-semibold text-center">
              Set New Password
            </h1>

            <Input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className="w-full bg-neutral-900 border border-neutral-700 hover:bg-neutral-800"
              onClick={handleUpdatePassword}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </>
        )}

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