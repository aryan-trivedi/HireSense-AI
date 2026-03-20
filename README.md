# 🚀 HireSense AI  
### AI-Powered Resume Intelligence & Job Matching Platform

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3ECF8E?logo=supabase)
![FAISS](https://img.shields.io/badge/Vector%20Search-FAISS-orange)
![FastEmbed](https://img.shields.io/badge/Embeddings-FastEmbed-purple)
![OpenRouter](https://img.shields.io/badge/LLM-Llama3-blue)
![shadcn/ui](https://img.shields.io/badge/UI-shadcn/ui-black)
![License](https://img.shields.io/badge/License-MIT-yellow)

</p>

---

# 🌍 Live Demo

🔗 **Frontend:**  
https://hire-sense-ai-pied.vercel.app/

---

# 📌 Overview

**HireSense AI** is an **AI-powered resume intelligence platform** designed to simulate how **modern Applicant Tracking Systems (ATS)** and **technical recruiters evaluate resumes**.

The system leverages **Large Language Models, semantic embeddings, and vector similarity search** to analyze resumes and match them with relevant job opportunities.

HireSense AI demonstrates a **production-style AI SaaS architecture**, combining modern full-stack development with scalable AI pipelines.

The platform provides capabilities to:

✔ Parse resumes automatically  
✔ Score resumes using ATS-style analysis  
✔ Detect missing skills and gaps  
✔ Recommend jobs using semantic similarity search  
✔ Rewrite resumes using AI optimization  

This project showcases how **LLMs, vector databases, and full-stack engineering** can be integrated to build **real-world AI developer tools**.

---

# 🎯 Key Features

### 📄 AI Resume Parsing

Automatically extracts structured information from uploaded PDF resumes using an LLM-powered parsing pipeline.

```
PDF Resume → Text Extraction → LLM Parsing → Structured Resume JSON
```

Extracted fields include:

- Skills
- Experience
- Education
- Certifications
- Projects
- Technical Stack

---

### 🧠 ATS Resume Scoring

Simulates how **Applicant Tracking Systems evaluate resumes** against job descriptions.

The system performs:

- keyword matching
- skill alignment
- contextual relevance scoring

Outputs include:

- ATS Score
- Keyword Match Rate
- Missing Skills
- Resume Optimization Suggestions

---

### 💼 AI Job Recommendations

HireSense AI uses **semantic embedding similarity search** to recommend jobs that match the candidate’s profile.

```
Resume Embedding
        ↓
FAISS Vector Search
        ↓
Semantic Job Matching
        ↓
Top Job Recommendations
```

This approach enables **context-aware matching**, not just keyword matching.

---

### 📊 Skill Gap Analysis

Detects missing skills required for a specific job role.

Example:

```
Job Requirements
Python
SQL
Machine Learning
Docker

Resume Skills
Python
SQL

Missing Skills
Machine Learning
Docker
```

This allows users to **identify exactly what skills they need to improve**.

---

### ✍️ AI Resume Rewriter

HireSense AI improves resumes using **LLM-powered rewriting**.

The system enhances:

- impact-focused bullet points
- professional wording
- action verbs
- ATS compatibility

The result is a **clean, recruiter-optimized resume**.

---

# 🧠 AI Pipeline

```
User Login
     ↓
Upload Resume (PDF)
     ↓
Text Extraction
     ↓
LLM Resume Parsing
     ↓
Structured Resume JSON
     ↓
Skill Extraction
     ↓
Embedding Generation
     ↓
FAISS Vector Search
     ↓
Job Matching
     ↓
ATS Analysis
     ↓
Skill Gap Detection
     ↓
AI Resume Optimization
```

---

# 🏗 System Architecture

```
                         ┌────────────────────────────┐
                         │        Next.js App         │
                         │     (React + TypeScript)   │
                         │  Tailwind + shadcn/ui UI   │
                         └─────────────┬──────────────┘
                                       │
                                       │ HTTPS API Calls
                                       ▼
                         ┌────────────────────────────┐
                         │        FastAPI Backend     │
                         │      Python API Server     │
                         └─────────────┬──────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         │                             │                             │
         ▼                             ▼                             ▼

 ┌───────────────────┐        ┌───────────────────┐        ┌─────────────────────┐
 │ Resume Processing │        │   AI Intelligence │        │  Vector Search      │
 │                   │        │                   │        │                     │
 │ pdfplumber        │        │ OpenRouter API    │        │ FastEmbed           │
 │ text extraction   │        │ Llama-3-8B        │        │ embeddings          │
 │ regex parsing     │        │ resume rewriting  │        │ FAISS similarity    │
 │ resume structuring│        │ ATS analysis      │        │ job matching        │
 └─────────┬─────────┘        └─────────┬─────────┘        └─────────┬───────────┘
           │                            │                            │
           └──────────────┬─────────────┴─────────────┬──────────────┘
                          ▼                           ▼

                 ┌───────────────────────────────┐
                 │          Supabase             │
                 │                               │
                 │                               │
                 │ Database Storage              │
                 │ Resume Metadata               │
                 │ User Management               │
                 └───────────────────────────────┘
```

---

# 🖼 Screenshots

### Landing Page
<img width="1889" height="885" alt="image" src="https://github.com/user-attachments/assets/ffa3b190-5912-483b-a740-be0ddacb4d83" />
<img width="1875" height="769" alt="image" src="https://github.com/user-attachments/assets/a9db6abe-e3b8-49c7-81d7-ca8d88efd22a" />


### Dashboard
<img width="1877" height="913" alt="image" src="https://github.com/user-attachments/assets/911ac585-0318-4be4-be86-47c8eaee3b6e" />


### Resume Upload
<img width="1881" height="895" alt="image" src="https://github.com/user-attachments/assets/f5cef1b7-653f-4fa8-9428-773d2165b86c" />

<img width="1879" height="899" alt="image" src="https://github.com/user-attachments/assets/1ac193b8-47b0-4675-867a-ec83abfb5215" />


### ATS Score
<img width="1872" height="894" alt="image" src="https://github.com/user-attachments/assets/c979098f-6f09-4b01-8d12-8df112b4c0dd" />
<img width="1854" height="904" alt="image" src="https://github.com/user-attachments/assets/03e63676-2b16-442b-98fd-85d2f5968991" />



### Job Recommendations
<img width="1878" height="886" alt="image" src="https://github.com/user-attachments/assets/4e722d78-cbe5-49ff-9306-9394915102ae" />


### AI Resume Rewriter
<img width="1894" height="900" alt="image" src="https://github.com/user-attachments/assets/0e168640-e700-4a64-bec6-d933f9638fef" />
<img width="1856" height="912" alt="image" src="https://github.com/user-attachments/assets/b4ef6315-0684-4f99-a4a8-a0bfb54a5320" />
<img width="1866" height="898" alt="image" src="https://github.com/user-attachments/assets/c5aa026a-55ff-4c82-a57c-0cd01f5297e7" />




---

# ⚙️ Tech Stack

## Frontend

- **Next.js**
- **React**
- **TypeScript**
- **TailwindCSS**
- **shadcn/ui**
- **Supabase Auth**

---

## Backend

- **FastAPI**
- **Python**
- **scikit-learn**
- **regex**
- **pdfplumber**

---

## AI / ML

- **OpenRouter API**
- **Llama 3 (8B Instruct)**
- **FastEmbed embeddings**
- **FAISS vector similarity search**

---

## Database & Auth

**Supabase**

Used for:

- authentication
- user management
- resume metadata storage

---

# 🔐 Authentication

HireSense AI uses **Supabase Authentication with JWT verification**.

Authentication flow:

```
User Login
   ↓
Supabase Authentication
   ↓
JWT Token Issued
   ↓
Token Sent With Requests
   ↓
FastAPI JWT Verification
   ↓
Access Protected APIs
```

---

# 🚀 Deployment

### Frontend

```
Vercel
```

### Backend

```
Render
```

The backend is optimized for **free-tier deployment** by using **FastEmbed instead of heavy transformer libraries**, significantly reducing memory requirements.

---

# 📂 Project Structure

```
HireSense-AI
│
├── hiresense-frontend
│   ├── components
│   ├── pages
│   ├── services
│   ├── hooks
│   └── ui
│
├── hiresense-backend
│   ├── routers
│   ├── services
│   ├── models
│   ├── ai
│   └── main.py
│
└── README.md
```

---

# 🧪 Future Improvements

Planned improvements include:

- interview question generation
- recruiter dashboard
- career roadmap generation
- job market analytics
- resume benchmarking system

---

# 🎓 Learning Outcomes

This project demonstrates practical experience in:

- AI system architecture
- LLM integration
- vector search systems
- semantic similarity search
- full-stack SaaS development
- scalable backend API design

---

# 👨‍💻 Author

**Aryan Trivedi**

Building at the intersection of AI, scalable systems, and relentless curiosity.

AI / Full Stack Developer

---

# ⭐ Support

If you like this project:

⭐ Star the repository  
🍴 Fork it  
🚀 Build something amazing
