interface Props {
  matched: string[]
  missing: string[]
}

export default function SkillSection({ matched, missing }: Props) {

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-10">

      {/* Matched Skills */}
      <div className="border border-gray-800 rounded-xl p-6 bg-[#0f0f0f]">

        <h3 className="text-lg font-semibold mb-4 text-green-400">
          Matched Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {matched.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="px-3 py-1 text-sm rounded-full border border-green-500/30 bg-green-500/10 text-green-300"
            >
              {skill}
            </span>
          ))}
        </div>

      </div>

      {/* Missing Skills */}
      <div className="border border-gray-800 rounded-xl p-6 bg-[#0f0f0f]">

        <h3 className="text-lg font-semibold mb-4 text-red-400">
          Missing Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {missing.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="px-3 py-1 text-sm rounded-full border border-red-500/30 bg-red-500/10 text-red-300"
            >
              {skill}
            </span>
          ))}
        </div>

      </div>

    </div>
  )
}