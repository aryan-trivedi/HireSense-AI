export interface ATSResponse {
  final_score: number
  semantic_score: number
  skill_score: number

  structure: {
    structure_score: number
    checks: {
      summary: boolean
      projects: boolean
      experience: boolean
      skills: boolean
    }
  }

  skills: {
    resume_skills: string[]
    job_skills: string[]
    matched_skills: string[]
    missing_skills: string[]
    skill_match_score: number
  }

  recommendations: string[]
}