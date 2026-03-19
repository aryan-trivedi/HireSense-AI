from dotenv import load_dotenv
import os

load_dotenv()

# -----------------------------
# LLM
# -----------------------------
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# -----------------------------
# Supabase
# -----------------------------
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# -----------------------------
# Embedding + Vector DB (future)
# -----------------------------
VECTOR_DB_TYPE = os.getenv("VECTOR_DB_TYPE", "faiss")
EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL",
    "sentence-transformers/all-MiniLM-L6-v2"
)

# -----------------------------
# Security validation
# -----------------------------
if not OPENROUTER_API_KEY:
    raise ValueError("Missing OpenRouter key")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase config missing")