interface Props {
  title: string
  score: number
}

export default function ScoreCard({ title, score }: Props) {

  const radius = 40
  const circumference = 2 * Math.PI * radius
  const progress = circumference - (score / 100) * circumference

  return (
    <div className="border border-gray-800 rounded-xl p-6 bg-[#0f0f0f] hover:border-gray-700 transition flex flex-col items-center justify-center">

      {/* Circular Progress */}
      <div className="relative w-24 h-24 mb-4">

        <svg
          className="transform -rotate-90"
          width="96"
          height="96"
        >

          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#1f2937"
            strokeWidth="8"
            fill="transparent"
          />

          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#22c55e"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
          />

        </svg>

        {/* Score Text */}
        <div className="absolute inset-0 flex items-center justify-center">

          <span className="text-lg font-semibold">
            {score.toFixed(0)}%
          </span>

        </div>

      </div>

      {/* Title */}
      <h3 className="text-sm text-gray-400 text-center">
        {title}
      </h3>

    </div>
  )
}