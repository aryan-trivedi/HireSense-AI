from fastapi import APIRouter, Depends
from collections import Counter
from app.utils.auth import get_current_user
from app.services.supabase_service import supabase

router = APIRouter()


@router.get("/stats")
async def dashboard_stats(user=Depends(get_current_user)):

    user_id = user["sub"]

    result = supabase.table("resumes") \
        .select("*") \
        .eq("user_id", user_id) \
        .execute()

    resumes = result.data or []

    resume_count = len(resumes)

    skills_counter = Counter()

    for resume in resumes:

        parsed = resume.get("parsed_data", {})

        skills = parsed.get("skills", [])

        if isinstance(skills, list):
            for skill in skills:
                if isinstance(skill, str):
                    skills_counter[skill.lower()] += 1

    top_skills = [skill for skill, _ in skills_counter.most_common(5)]

    return {
        "resume_count": resume_count,
        "top_skills": top_skills
    }