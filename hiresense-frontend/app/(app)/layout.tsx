import Navbar from "@/components/Navbar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      <Navbar />

      {/* PAGE CONTENT */}
      <main className="flex-1 w-full">
        {children}
      </main>

    </div>
  )
}