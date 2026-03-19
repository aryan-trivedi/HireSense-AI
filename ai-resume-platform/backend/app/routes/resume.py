from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
import pdfplumber
from app.services.llm_service import parse_resume
from app.utils.auth import get_current_user
from app.services.supabase_service import supabase

router = APIRouter()


# -----------------------------
# Extract text from PDF
# -----------------------------
def extract_text_from_pdf(file):
    text = ""

    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    return text


# -----------------------------
# Upload + Parse + Save Resume
# -----------------------------
@router.post("/parse")
async def parse_resume_api(
    file: UploadFile = File(...),
    title: str = "Untitled Resume",
    user=Depends(get_current_user),
):

    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF allowed")

    text = extract_text_from_pdf(file.file)

    structured_data = parse_resume(text)

    result = supabase.table("resumes").insert({
        "user_id": user["sub"],
        "title": title,
        "parsed_data": structured_data
    }).execute()

    return {
        "message": "Resume saved",
        "data": result.data
    }


# -----------------------------
# List all resumes for user
# -----------------------------
@router.get("/list")
async def list_resumes(user=Depends(get_current_user)):

    result = supabase.table("resumes") \
        .select("*") \
        .eq("user_id", user["sub"]) \
        .order("created_at", desc=True) \
        .execute()

    return {
        "resumes": result.data
    }


# -----------------------------
# Get single resume
# -----------------------------
@router.get("/{resume_id}")
async def get_resume(resume_id: str, user=Depends(get_current_user)):

    result = supabase.table("resumes") \
        .select("*") \
        .eq("id", resume_id) \
        .eq("user_id", user["sub"]) \
        .single() \
        .execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Resume not found")

    return {
        "resume": result.data
    }


# -----------------------------
# Update resume
# -----------------------------
@router.put("/{resume_id}")
async def update_resume(
    resume_id: str,
    updated_data: dict,
    user=Depends(get_current_user)
):

    # verify resume exists and belongs to user
    check = supabase.table("resumes") \
        .select("*") \
        .eq("id", resume_id) \
        .eq("user_id", user["sub"]) \
        .single() \
        .execute()

    if not check.data:
        raise HTTPException(status_code=404, detail="Resume not found")

    result = supabase.table("resumes") \
        .update({
            "parsed_data": updated_data
        }) \
        .eq("id", resume_id) \
        .eq("user_id", user["sub"]) \
        .execute()

    return {
        "message": "Resume updated",
        "data": result.data
    }


# -----------------------------
# Delete resume
# -----------------------------
@router.delete("/{resume_id}")
async def delete_resume(resume_id: str, user=Depends(get_current_user)):

    result = supabase.table("resumes") \
        .delete() \
        .eq("id", resume_id) \
        .eq("user_id", user["sub"]) \
        .execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Resume not found")

    return {
        "message": "Resume deleted successfully",
        "data": result.data
    }