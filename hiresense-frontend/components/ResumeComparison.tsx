"use client"

import ResumeSection from "./ResumeSection"

type Props = {
  original: any
  improved: any
}

export default function ResumeComparison({ original, improved }: Props) {

  return (

    <div className="grid md:grid-cols-2 gap-10">

      {/* ORIGINAL */}

      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-gray-300">
          Original Resume
        </h2>

        <ResumeSection title="Skills" data={original.skills} />
        <ResumeSection title="Experience" data={original.experience} />
        <ResumeSection title="Projects" data={original.projects} />
        <ResumeSection title="Education" data={original.education} />

      </div>


      {/* IMPROVED */}

      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-green-400">
          AI Improved Resume
        </h2>

        {improved.summary && (
          <div className="bg-green-500/10 border border-green-700 rounded-lg p-4 text-sm text-gray-200">
            {improved.summary}
          </div>
        )}

        <ResumeSection title="Skills" data={improved.skills} />
        <ResumeSection title="Experience" data={improved.experience} />
        <ResumeSection title="Projects" data={improved.projects} />
        <ResumeSection title="Education" data={improved.education} />

      </div>

    </div>

  )
}