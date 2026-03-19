from fastapi import APIRouter, Depends, HTTPException
from app.utils.auth import get_current_user
from app.services.job_matching import job_matcher
from app.services.supabase_service import supabase

router = APIRouter()

job_matcher.load_jobs_from_csv("data/jobs_dataset.csv")


@router.get("/recommend/{resume_id}")
async def recommend_jobs(resume_id: str, user=Depends(get_current_user)):

    result = supabase.table("resumes") \
        .select("*") \
        .eq("id", resume_id) \
        .eq("user_id", user["sub"]) \
        .single() \
        .execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Resume not found")

    resume = result.data["parsed_data"]

    resume_text = str(resume)

    recommendations = job_matcher.match(resume_text)

    return {"recommendations": recommendations}