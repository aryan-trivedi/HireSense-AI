"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/services/supabase"

export default function Navbar() {

  const { user } = useAuth()

  const handleLogout = async () => {
    localStorage.removeItem("resume_id")   // FIX: clear stored resume
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (

    <header className="sticky top-0 z-50">

      {/* ambient glow */}

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-900/70 to-transparent blur-2xl" />

      {/* glass navbar */}

      <div className="
        border-b border-white/10
        bg-black/40
        backdrop-blur-xl
      ">

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* LOGO */}

          <Link
            href="/dashboard"
            className="
              text-2xl font-semibold tracking-tight
              bg-gradient-to-r
              from-white
              via-neutral-300
              to-neutral-500
              bg-clip-text
              text-transparent
              transition-opacity
              hover:opacity-80
            "
          >
            HireSense AI
          </Link>


          {/* NAV LINKS */}

          <nav className="flex items-center gap-10 text-sm">

            {[
              { href: "/jobs", label: "Jobs" },
              { href: "/ats", label: "ATS Score" },
              { href: "/rewrite", label: "Rewrite Resume" }
            ].map((item) => (

              <div
                key={item.href}
                className="relative group"
              >

                <Link
                  href={item.href}
                  className="
                    text-neutral-400
                    hover:text-white
                    transition-colors duration-200
                  "
                >
                  {item.label}
                </Link>

                {/* smooth underline */}

                <span
                  className="
                    absolute left-0 -bottom-1
                    h-[2px] w-0
                    bg-gradient-to-r from-white to-neutral-400
                    transition-all duration-300 ease-out
                    group-hover:w-full
                  "
                />

              </div>

            ))}

            <Separator
              orientation="vertical"
              className="h-6 bg-white/10"
            />


            {/* LOGIN / LOGOUT */}

            {user ? (

              <Button
                onClick={handleLogout}
                className="
                  bg-neutral-900
                  border border-neutral-700
                  hover:bg-neutral-800
                  text-white
                  shadow-lg shadow-black/40
                  transition-colors duration-200
                "
              >
                Logout
              </Button>

            ) : (

              <Link href="/login">

                <Button
                  className="
                    bg-neutral-900
                    border border-neutral-700
                    hover:bg-neutral-800
                    text-white
                    shadow-lg shadow-black/40
                    transition-colors duration-200
                  "
                >
                  Login
                </Button>

              </Link>

            )}

          </nav>

        </div>

      </div>

    </header>

  )
}