from fastapi import APIRouter, Depends
from app.utils.auth import get_current_user
from app.services.supabase_service import supabase

router = APIRouter()


@router.get("/profile")
async def get_profile(user=Depends(get_current_user)):

    user_id = user["sub"]
    email = user.get("email")

    # count user resumes
    result = supabase.table("resumes") \
        .select("id", count="exact") \
        .eq("user_id", user_id) \
        .execute()

    resume_count = result.count if result.count else 0

    return {
        "user_id": user_id,
        "email": email,
        "resume_count": resume_count
    }