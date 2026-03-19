import { Card, CardContent } from "@/components/ui/card"

export default function FeatureSection() {
  return (
    <div className="grid md:grid-cols-3 gap-6 py-20">

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold">Resume Parsing</h3>
          <p className="text-gray-400 mt-2">
            AI extracts skills, experience and insights from your resume.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold">ATS Score</h3>
          <p className="text-gray-400 mt-2">
            Evaluate how well your resume matches industry standards.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold">Smart Job Matching</h3>
          <p className="text-gray-400 mt-2">
            Discover jobs using semantic AI matching.
          </p>
        </CardContent>
      </Card>

    </div>
  )
}