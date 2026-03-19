from fastapi import APIRouter, Depends, HTTPException
from app.utils.auth import get_current_user
from app.services.supabase_service import supabase
from app.services.ats_service import ats_engine

router = APIRouter()


@router.post("/score/{resume_id}")
async def score_resume(
    resume_id: str,
    job_description: str,
    user=Depends(get_current_user),
):

    # Fetch resume
    result = supabase.table("resumes") \
        .select("*") \
        .eq("id", resume_id) \
        .eq("user_id", user["sub"]) \
        .execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Resume not found")

    resume_data = result.data[0]["parsed_data"]

    score = ats_engine.full_score(resume_data, job_description)

    return score