from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# -----------------------------
# Routes
# -----------------------------
from app.routes import ai, resume, ats, jobs
from app.routes import user
from app.routes import dashboard

# -----------------------------
# App
# -----------------------------
app = FastAPI(
    title="HireSense AI Backend",
    version="1.0"
)

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Routers
# -----------------------------
app.include_router(ai.router, prefix="/ai", tags=["AI"])
app.include_router(ats.router, prefix="/ats", tags=["ATS"])
app.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])

app.include_router(resume.router, prefix="/resume", tags=["Resume"])

app.include_router(user.router, prefix="/user", tags=["User"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])

# -----------------------------
# Root
# -----------------------------
@app.get("/")
def root():
    return {
        "message": "HireSense AI Backend",
        "docs": "/docs"
    }

# -----------------------------
# Health check
# -----------------------------
@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "HireSense AI",
        "version": "1.0"
    }