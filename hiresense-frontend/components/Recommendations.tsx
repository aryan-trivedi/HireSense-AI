import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle2, Sparkles } from "lucide-react"

interface Props {
  list: string[]
}

export default function Recommendations({ list }: Props) {

  return (
    <div className="mt-12">

      <Card className="bg-[#0f0f0f] border border-gray-800">

        <CardHeader>

          <div className="flex items-center gap-2">

            <Sparkles className="w-5 h-5 text-purple-400" />

            <h3 className="text-xl font-semibold text-white">
              AI Recommendations
            </h3>

          </div>

        </CardHeader>

        <CardContent>

          <div className="space-y-4">

            {list.map((rec, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg border border-gray-800 bg-black/40 hover:border-gray-700 transition"
              >

                <CheckCircle2 className="text-green-400 w-5 h-5 mt-1" />

                <p className="text-gray-300 text-sm leading-relaxed">
                  {rec}
                </p>

              </div>
            ))}

          </div>

        </CardContent>

      </Card>

    </div>
  )
}