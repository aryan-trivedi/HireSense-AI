import logging
from sklearn.metrics.pairwise import cosine_similarity
from typing import Dict

from app.services.llm_service import extract_job_skills
from app.services.embedding_service import embedding_service

logger = logging.getLogger(__name__)


class ATSEngine:

    # -----------------------------
    # Build resume text for embeddings
    # -----------------------------
    def build_resume_text(self, resume: Dict) -> str:

        parts = []

        parts.extend(resume.get("skills", []))

        for exp in resume.get("experience", []):
            parts.append(str(exp))

        for proj in resume.get("projects", []):
            parts.append(str(proj))

        return " ".join(parts)

    # -----------------------------
    # Semantic similarity
    # -----------------------------
    def semantic_score(self, resume_text: str, job_desc: str):

        model = embedding_service.get_model()

        embeddings = model.encode(
            [resume_text, job_desc],
            show_progress_bar=False
        )

        similarity = cosine_similarity(
            [embeddings[0]],
            [embeddings[1]]
        )[0][0]

        return float(round(similarity * 100, 2))

    # -----------------------------
    # Resume skill extraction
    # -----------------------------
    def extract_resume_skills(self, resume: Dict):

        skills = resume.get("skills", [])
        extracted = []

        for skill in skills:

            if isinstance(skill, dict):
                extracted.extend(skill.get("items", []))

            elif isinstance(skill, str):
                extracted.append(skill)

        normalized = [s.lower().strip() for s in extracted]

        return list(set(normalized))

    # -----------------------------
    # Skill coverage
    # -----------------------------
    def skill_match(self, resume: Dict, job_desc: str):

        resume_skills = self.extract_resume_skills(resume)
        job_skills = extract_job_skills(job_desc)

        matched = []
        missing = []

        for skill in job_skills:

            if skill in resume_skills:
                matched.append(skill)
            else:
                missing.append(skill)

        coverage = 0

        if job_skills:
            coverage = round(len(matched) / len(job_skills) * 100, 2)

        return {
            "resume_skills": resume_skills,
            "job_skills": job_skills,
            "matched_skills": matched,
            "missing_skills": missing,
            "skill_match_score": coverage,
        }

    # -----------------------------
    # Resume structure scoring
    # -----------------------------
    def structure_score(self, resume: Dict):

        checks = {
            "summary": bool(resume.get("summary")),
            "projects": len(resume.get("projects", [])) > 0,
            "experience": len(resume.get("experience", [])) > 0,
            "skills": len(resume.get("skills", [])) > 0,
        }

        score = sum(checks.values()) / len(checks) * 100

        return {
            "structure_score": float(round(score, 2)),
            "checks": checks,
        }

    # -----------------------------
    # Recommendation generator
    # -----------------------------
    def generate_recommendations(self, semantic, skills, structure):

        recs = []

        if semantic < 65:
            recs.append(
                "Improve resume wording to better match job description keywords."
            )

        if skills["missing_skills"]:
            recs.append(
                f"Add or highlight these skills: {', '.join(skills['missing_skills'][:5])}."
            )

        if not structure["checks"]["summary"]:
            recs.append("Add a professional summary section.")

        if not structure["checks"]["projects"]:
            recs.append("Include relevant projects to strengthen your resume.")

        if not recs:
            recs.append("Your resume aligns well with the job description.")

        return recs

    # -----------------------------
    # Final ATS scoring
    # -----------------------------
    def full_score(self, resume: Dict, job_desc: str):

        resume_text = self.build_resume_text(resume)

        semantic = self.semantic_score(resume_text, job_desc)
        skills = self.skill_match(resume, job_desc)
        structure = self.structure_score(resume)

        job_skill_count = len(skills["job_skills"])

        if job_skill_count >= 5:
            semantic_weight = 0.50
            skill_weight = 0.35
        else:
            semantic_weight = 0.75
            skill_weight = 0.10

        structure_weight = 0.15

        raw_score = (
            semantic_weight * semantic
            + skill_weight * skills["skill_match_score"]
            + structure_weight * structure["structure_score"]
        )

        calibrated_score = raw_score * 1.2

        final_score = float(round(min(calibrated_score, 100), 2))

        recommendations = self.generate_recommendations(
            semantic,
            skills,
            structure,
        )

        return {
            "final_score": final_score,
            "semantic_score": semantic,
            "skill_score": skills["skill_match_score"],
            "structure": structure,
            "skills": skills,
            "recommendations": recommendations,
        }


ats_engine = ATSEngine()