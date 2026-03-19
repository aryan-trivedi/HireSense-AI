"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Twitter, FileText, Brain, Briefcase, Sparkles, Search } from "lucide-react"

export default function Home() {

  const user = null

  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouse({
      x: e.clientX,
      y: e.clientY
    })
  }

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  }

  if (!user) {
    return (
      <main
        onMouseMove={handleMove}
        className="min-h-screen bg-black text-white relative overflow-hidden"
      >

        {/* Interactive Gradient Mesh */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px,
              rgba(255,255,255,0.08),
              transparent 40%)
            `
          }}
        />

        {/* Floating gradient orb (PURPLE FIXED) */}
        <motion.div
          animate={{ y: [0, -40, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 blur-[160px] rounded-full top-[-200px] left-[20%]"
        />

        {/* HERO */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-10 max-w-5xl mx-auto px-6 pt-40 pb-24 text-center"
        >

          <h1 className="text-6xl font-semibold tracking-tight mb-6 bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            HireSense AI
          </h1>

          <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-10">
            AI-powered resume intelligence that reveals how your resume performs
            against ATS systems and shows exactly how to improve it.
          </p>

          <div className="flex justify-center gap-4">

            <Link href="/login">
              <Button
                size="lg"
                className="
                relative z-20
                backdrop-blur-md
                bg-white/5
                border border-white/10
                text-white
                shadow-lg shadow-black/30
                hover:bg-white/10
                hover:border-white/20
                transition-all duration-300
                hover:scale-[1.05]
                px-8
                "
              >
                Login
              </Button>
            </Link>

            <Link href="/signup">
              <Button
                size="lg"
                className="
                relative z-20
                backdrop-blur-md
                bg-white/5
                border border-white/10
                text-white
                shadow-lg shadow-black/30
                hover:bg-white/10
                hover:border-white/20
                transition-all duration-300
                hover:scale-[1.05]
                px-8
                "
              >
                Sign Up
              </Button>
            </Link>

          </div>

        </motion.section>

        {/* FEATURES */}
        <section className="max-w-5xl mx-auto px-6 pb-32">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid md:grid-cols-3 gap-6"
          >

            {[
              {
                icon: FileText,
                title: "Resume Parsing",
                text: "Extract structure, skills and experience automatically."
              },
              {
                icon: Brain,
                title: "ATS Score",
                text: "Evaluate how well your resume matches job descriptions."
              },
              {
                icon: Briefcase,
                title: "Job Matching",
                text: "Find roles aligned with your experience and skills."
              },
              {
                icon: Sparkles,
                title: "AI Resume Rewrite",
                text: "Rewrite and improve resumes using LLM-powered analysis."
              },
              {
                icon: Brain,
                title: "Skill Gap Detection",
                text: "Identify missing skills blocking ATS success."
              },
              {
                icon: Search,
                title: "Semantic Resume Search",
                text: "Uses embedding similarity to match resumes with job requirements intelligently."
              }
            ].map((feature, i) => {

              const Icon = feature.icon

              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ scale: 1.04 }}
                  className="h-full"
                >

                  <Card className="h-full bg-neutral-900/40 backdrop-blur border-neutral-800 hover:border-neutral-600 transition-all duration-300">

                    <CardContent className="p-6 flex flex-col h-full space-y-4">

                      <div className="w-8 h-8 flex items-center justify-center">
                        <Icon size={20} className="text-neutral-300"/>
                      </div>

                      <h3 className="font-semibold text-white">
                        {feature.title}
                      </h3>

                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {feature.text}
                      </p>

                    </CardContent>

                  </Card>

                </motion.div>
              )

            })}

          </motion.div>

        </section>

        {/* FOOTER */}
        <footer className="w-full bg-black border-t border-neutral-800">

          <div className="max-w-6xl mx-auto px-8 py-10 space-y-6">

            <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
              HireSense AI is an AI-powered resume intelligence platform designed to
              help professionals improve their resumes, evaluate ATS compatibility,
              and discover relevant job opportunities using modern AI techniques.
              The platform demonstrates practical applications of large language
              models, semantic search, and scalable full-stack systems.
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-400">

              <span className="text-gray-500">
                Built by Aryan Trivedi
              </span>

              <a
                href="https://github.com/aryan-trivedi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Github size={16}/>
                GitHub
              </a>

              <a
                href="https://x.com/aryannnnnn95"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Twitter size={16}/>
                X
              </a>

            </div>

            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Aryan Trivedi. All rights reserved.
            </p>

          </div>

        </footer>

      </main>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      Dashboard
    </div>
  )
}