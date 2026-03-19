import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingHero() {
  return (
    <section className="py-32 text-center space-y-8">

      <h1 className="text-6xl font-semibold tracking-tight">
        HireSense AI
      </h1>

      <p className="text-gray-400 text-lg max-w-xl mx-auto">
        AI-powered resume intelligence for smarter job matching.
      </p>

      <div className="flex justify-center gap-4 pt-6">

        <Link href="/login">
          <Button size="lg">
            Login
          </Button>
        </Link>

        <Link href="/signup">
          <Button size="lg">
            Sign Up
          </Button>
        </Link>

      </div>

    </section>
  )
}