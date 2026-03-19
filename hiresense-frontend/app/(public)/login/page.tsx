"use client"

import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/services/supabase"
import { setToken } from "@/services/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleLogin = async () => {

    setErrorMsg("")
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setLoading(false)

    if (error) {

      if (error.message.includes("Invalid login")) {
        setErrorMsg("Invalid email or password.")
      } else {
        setErrorMsg(error.message)
      }

      return
    }

    if (data.session) {
      setToken(data.session.access_token)
    }

    window.location.href = "/dashboard"
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">

      <Link href="/" className="text-3xl font-semibold">
        HireSense AI
      </Link>

      <div className="w-full max-w-md space-y-6">

        <h1 className="text-2xl font-semibold text-center">
          Login
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
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {errorMsg && (
          <p className="text-red-400 text-sm text-center">
            {errorMsg}
          </p>
        )}

        <Link
          href="/reset-password"
          className="text-sm text-center text-gray-400 block hover:underline"
        >
          Forgot Password?
        </Link>

        <p className="text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-white hover:underline">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  )
}