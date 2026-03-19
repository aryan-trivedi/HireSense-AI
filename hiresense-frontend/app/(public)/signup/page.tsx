"use client"

import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/services/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignupPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSignup = async () => {

    setErrorMsg("")
    setMessage("")

    if (!email || !password) {
      setErrorMsg("Please enter email and password")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    setLoading(false)

    if (error) {

      if (error.message.includes("already registered")) {
        setErrorMsg("Account already exists. Please login.")
      } else {
        setErrorMsg(error.message)
      }

    } else {

      setMessage("Verification email sent. Please check your inbox.")

    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">

      <Link href="/" className="text-3xl font-semibold">
        HireSense AI
      </Link>

      <div className="w-full max-w-md space-y-6">

        <h1 className="text-2xl font-semibold text-center">
          Sign Up
        </h1>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        {message && (
          <p className="text-green-400 text-sm text-center">
            {message}
          </p>
        )}

        {errorMsg && (
          <p className="text-red-400 text-sm text-center">
            {errorMsg}
          </p>
        )}

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}