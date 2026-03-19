import httpx
import json
import re
from app.config import OPENROUTER_API_KEY

URL = "https://openrouter.ai/api/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:8000",
    "X-Title": "HireSense AI",
}


def call_llm(prompt: str):

    response = httpx.post(
        URL,
        headers=headers,
        json={
            "model": "meta-llama/llama-3-8b-instruct",
            "temperature": 0.1,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a strict AI system that returns only valid structured outputs."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
        },
        timeout=60,
    )

    data = response.json()

    if "error" in data:
        raise Exception(f"LLM API error: {data['error']}")

    return data["choices"][0]["message"]["content"]


# -----------------------------
# Extract skills from job description
# -----------------------------
def extract_job_skills(job_description: str):

    prompt = f"""
Extract the professional skills required in this job description.

Rules:
- Return ONLY a JSON array
- Do NOT include explanations
- Only include actual professional skills
- Do NOT include words like team, work, ability

Example output:

["python","fastapi","docker","aws","postgresql"]

Job description:
{job_description}
"""

    content = call_llm(prompt)

    # Remove markdown
    content = re.sub(r"```json", "", content)
    content = re.sub(r"```", "", content)

    content = content.strip()

    # Extract JSON array safely
    match = re.search(r"\[.*\]", content, re.DOTALL)

    if match:
        try:
            skills = json.loads(match.group(0))
            return [s.lower().strip() for s in skills]
        except:
            pass

    return []


# -----------------------------
# Resume rewriting
# -----------------------------
# -----------------------------
# Resume rewriting (structured)
# -----------------------------
# Resume rewriting (structured)
# -----------------------------
def rewrite_resume(resume: dict):

    prompt = f"""
You are a senior technical recruiter and ATS resume optimization expert.

Your job is to **significantly improve and rewrite the resume below** for software engineering / backend / AI roles.

IMPORTANT RULES

1. DO NOT copy the original bullet points.
2. Rewrite every bullet point to be **more technical and impactful**.
3. Replace weak language with **strong engineering action verbs** such as:
   Designed, Architected, Implemented, Developed, Optimized, Engineered, Automated, Built.
4. Convert responsibilities into **achievement-oriented bullet points**.
5. Use **technical terminology** commonly seen in strong software engineering resumes.
6. Improve ATS keyword coverage.
7. Add measurable impact **ONLY when reasonable**.
8. Make project descriptions **sound more technical and system-focused**.
9. Use concise and professional engineering language.
10. Do NOT invent technologies or experience not present in the original resume.

SKILLS SECTION RULES

Instead of listing skills randomly, organize them into **technical categories**:

Programming Languages  
Backend Development  
Databases  
Cloud & DevOps  
Tools & Practices

Example format:

Programming Languages: Python, JavaScript (ES6+), TypeScript, Java

Backend Development: Node.js, Express.js, FastAPI, RESTful API design, middleware architecture

Databases: MongoDB, Oracle SQL, SQLite, schema design, query optimization

Cloud & DevOps: AWS (S3, EC2), Docker, CI/CD pipelines, GitHub Actions

Tools & Practices: Git, distributed version control, API development, system design fundamentals

PROJECT SECTION RULES

Each project must:

• sound technically advanced  
• mention architecture or backend logic when possible  
• highlight technologies used  
• emphasize engineering contributions  

Example transformation:

Original:
"Built a MERN stack application"

Improved:
"Developed a full-stack MERN platform implementing JWT-based authentication, RESTful APIs, and optimized MongoDB queries to support scalable user interactions."

Return ONLY valid JSON in this format:

{{
"name": "",
"summary": "",
"skills": [],
"experience": [],
"projects": []
}}

Resume JSON:
{json.dumps(resume, indent=2)}
"""

    content = call_llm(prompt)

    if not content:
        return resume

    # Remove markdown formatting if present
    content = re.sub(r"```json", "", content)
    content = re.sub(r"```", "", content)
    content = content.strip()

    # Extract JSON block safely
    match = re.search(r"\{[\s\S]*\}", content)

    if match:
        try:
            return json.loads(match.group(0))
        except Exception:
            pass

    # fallback if parsing fails
    return {
        "error": "Failed to parse improved resume",
        "raw_output": content
    }

# -----------------------------
# JSON cleanup
# -----------------------------
def clean_json(content: str):

    content = re.sub(r"```json", "", content)
    content = re.sub(r"```", "", content)

    content = content.strip()

    match = re.search(r"\{[\s\S]*\}", content)

    if match:
        return match.group(0)

    return content


def fix_invalid_json(cleaned: str):

    cleaned = re.sub(
        r':\s*(\d+\.\d+\s*/\s*\d+)',
        r': "\1"',
        cleaned
    )

    cleaned = re.sub(r",\s*}", "}", cleaned)
    cleaned = re.sub(r",\s*]", "]", cleaned)

    cleaned = re.sub(r'""(.*?)""', r'"\1"', cleaned)

    return cleaned


# -----------------------------
# Resume parsing
# -----------------------------
def parse_resume(text: str):

    prompt = f"""
Extract structured resume information.

Return ONLY valid JSON.

Structure:

{{
"name": "",
"email": "",
"phone": "",
"skills": [],
"experience": [],
"education": [],
"projects": []
}}

Resume:
{text}
"""

    content = call_llm(prompt)

    cleaned = clean_json(content)

    cleaned = fix_invalid_json(cleaned)

    try:
        return json.loads(cleaned)
    except:
        return {
            "error": "JSON parsing failed",
            "cleaned_output": cleaned,
            "raw_output": content,
        }