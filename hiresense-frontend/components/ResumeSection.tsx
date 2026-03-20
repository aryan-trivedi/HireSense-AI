"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Props = {
  title: string
  data: any
}

export default function ResumeSection({ title, data }: Props) {

  if (!data || (Array.isArray(data) && data.length === 0)) return null

  const normalizeArray = (value: any) => {
    if (Array.isArray(value)) return value
    if (typeof value === "string") {
      return value.split(",").map((v) => v.trim())
    }
    return []
  }

  const items = normalizeArray(data)

  const renderBullet = (item: any) => {

    if (typeof item === "string") return item

    if (typeof item === "object") {
      return (
        <>
          {item.description}
          {item.impact && (
            <span className="text-green-400 text-xs ml-1">
              ({item.impact})
            </span>
          )}
        </>
      )
    }

    return null
  }

  return (

    <Card className="bg-neutral-900 border-neutral-800">

      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm text-gray-300">

        {/* Skills */}
        {title === "Skills" && (

          typeof data === "object" && !Array.isArray(data) ? (

            <div className="space-y-3">

              {Object.entries(data).map(([category, skills]: any, i) => (

                <div key={i}>

                  <p className="text-xs text-gray-400 mb-1">
                    {category}
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {skills.map((skill: string, idx: number) => (
                      <Badge
                        key={idx}
                        className="bg-blue-500/10 text-blue-400 border border-blue-700"
                      >
                        {skill}
                      </Badge>
                    ))}

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="flex flex-wrap gap-2">

              {items.map((skill: string, i: number) => (
                <Badge
                  key={i}
                  className="bg-blue-500/10 text-blue-400 border border-blue-700"
                >
                  {skill}
                </Badge>
              ))}

            </div>

          )

        )}

        {/* Generic objects */}
        {title !== "Skills" && items.map((item: any, i: number) => (

          <div key={i} className="space-y-1">

            {item?.name && (
              <p className="font-medium text-white">{item.name}</p>
            )}

            {item?.title && (
              <p className="font-medium text-white">{item.title}</p>
            )}

            {item?.company && (
              <p className="text-gray-400 text-xs">{item.company}</p>
            )}

            {item?.description && (
              <p className="text-gray-300">{item.description}</p>
            )}

            {item?.impact && (
              <p className="text-green-400 text-xs">
                Impact: {item.impact}
              </p>
            )}

            {Array.isArray(item?.achievements) && (
              <ul className="list-disc pl-4 space-y-1">
                {item.achievements.map((a: any, idx: number) => (
                  <li key={idx}>
                    {renderBullet(a)}
                  </li>
                ))}
              </ul>
            )}

            {Array.isArray(item?.responsibilities) && (
              <ul className="list-disc pl-4 space-y-1">
                {item.responsibilities.map((a: any, idx: number) => (
                  <li key={idx}>
                    {renderBullet(a)}
                  </li>
                ))}
              </ul>
            )}

          </div>

        ))}

      </CardContent>

    </Card>

  )
}