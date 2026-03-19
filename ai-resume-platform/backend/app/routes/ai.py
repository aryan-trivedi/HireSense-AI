from fastapi import APIRouter, Depends, HTTPException
from app.services.llm_service import rewrite_resume
from app.services.supabase_service import supabase
from app.utils.auth import get_current_user

router = APIRouter()


@router.post("/rewrite/{resume_id}")
async def rewrite_resume_api(resume_id: str, user=Depends(get_current_user)):

    result = supabase.table("resumes") \
        .select("*") \
        .eq("id", resume_id) \
        .eq("user_id", user["sub"]) \
        .single() \
        .execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Resume not found")

    resume = result.data["parsed_data"]

    improved_resume = rewrite_resume(resume)

    return {
        "original_resume": resume,
        "improved_resume": improved_resume
    }