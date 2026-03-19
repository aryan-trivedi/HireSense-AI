"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from "recharts"

type Job = {
  title: string
  description: string
  skills: string
  match_score: string
  matched_skills: string[]
  missing_skills: string[]
  recommendation: string
}

export default function JobCard({ job }: { job: Job }) {

  const score = parseFloat(job.match_score)

  const chartData = [
    {
      name: "score",
      value: score
    }
  ]

  const isTopMatch = score >= 85

  return (

    <Card
      className={`
        bg-neutral-900
        border-neutral-800
        transition-all
        duration-300
        hover:border-neutral-700
        hover:shadow-xl
        ${isTopMatch ? "ring-1 ring-green-500/40 shadow-green-500/10" : ""}
      `}
    >

      <CardHeader className="flex flex-row items-start justify-between pb-3">

        <div className="space-y-1">

          <CardTitle className="text-xl font-semibold text-white leading-tight">
            {job.title}
          </CardTitle>

          {isTopMatch && (
            <p className="text-xs text-green-400 font-medium">
              Top Match
            </p>
          )}

        </div>

        {/* Circular Match Score */}

        <RadialBarChart
          width={76}
          height={76}
          innerRadius="72%"
          outerRadius="100%"
          data={chartData}
          startAngle={90}
          endAngle={-270}
        >

          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
          />

          <RadialBar
            dataKey="value"
            fill="#22c55e"
            cornerRadius={20}
            background={{ fill: "#262626" }}
            animationDuration={900}
          />

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white text-sm font-semibold"
          >
            {score.toFixed(0)}%
          </text>

        </RadialBarChart>

      </CardHeader>

      <CardContent className="space-y-6">

        {/* Description */}

        <p className="text-sm text-gray-300 leading-relaxed">
          {job.description}
        </p>

        <Separator className="bg-neutral-800" />

        {/* Matched Skills */}

        <div className="space-y-2">

          <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
            Matched Skills
          </p>

          <div className="flex flex-wrap gap-2">

            {job.matched_skills.map((skill, i) => (

              <Badge
                key={i}
                className="
                bg-green-500/10
                text-green-400
                border
                border-green-700
                font-medium
                "
              >
                {skill}
              </Badge>

            ))}

          </div>

        </div>

        {/* Missing Skills */}

        <div className="space-y-2">

          <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
            Missing Skills
          </p>

          <div className="flex flex-wrap gap-2">

            {job.missing_skills.map((skill, i) => (

              <Badge
                key={i}
                className="
                bg-red-500/10
                text-red-400
                border
                border-red-700
                font-medium
                "
              >
                {skill}
              </Badge>

            ))}

          </div>

        </div>

        <Separator className="bg-neutral-800" />

        {/* Recommendation */}

        <p className="text-sm text-gray-400 leading-relaxed">
          {job.recommendation}
        </p>

      </CardContent>

    </Card>
  )
}