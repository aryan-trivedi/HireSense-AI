from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pandas as pd
import re


class JobMatcher:

    def __init__(self):

        self.model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

        self.jobs = []
        self.index = None

    def load_jobs_from_csv(self, path):

        df = pd.read_csv(path)

        jobs = []

        for _, row in df.iterrows():

            job = {
                "title": str(row.get("title", "")),
                "description": str(row.get("description", "")),
                "skills": str(row.get("skills", ""))
            }

            jobs.append(job)

        self.build_index(jobs)

    def build_index(self, jobs):

        if not jobs:
            self.jobs = []
            self.index = None
            return

        self.jobs = jobs

        texts = [
            f"{job['title']} {job['description']} {job['skills']}"
            for job in jobs
        ]

        embeddings = self.model.encode(texts, convert_to_numpy=True)

        # normalize embeddings for cosine similarity
        faiss.normalize_L2(embeddings)

        dimension = embeddings.shape[1]

        self.index = faiss.IndexFlatIP(dimension)

        self.index.add(embeddings)

    def clean_tokens(self, text):

        text = text.lower()

        text = re.sub(r"[^a-z0-9\s]", " ", text)

        tokens = text.split()

        return set(tokens)

    def match(self, resume_text, top_k=5):

        if self.index is None:
            return []

        top_k = min(top_k, len(self.jobs))

        resume_embedding = self.model.encode(
            [resume_text], convert_to_numpy=True
        )

        faiss.normalize_L2(resume_embedding)

        scores, indices = self.index.search(resume_embedding, top_k)

        resume_tokens = self.clean_tokens(resume_text)

        results = []

        for i, idx in enumerate(indices[0]):

            job = self.jobs[idx]

            job_tokens = self.clean_tokens(job["skills"])

            matched_skills = job_tokens & resume_tokens

            missing_skills = list(job_tokens - resume_tokens)

            # semantic similarity from FAISS
            semantic_score = float(scores[0][i])

            # skill match score
            if len(job_tokens) > 0:
                skill_score = len(matched_skills) / len(job_tokens)
            else:
                skill_score = 0

            # hybrid scoring
            final_score = (0.7 * semantic_score) + (0.3 * skill_score)

            # convert to percentage
            match_percentage = round(final_score * 100, 2)

            if missing_skills:
                recommendation = (
                    f"Improve match by learning {', '.join(missing_skills[:3])}."
                )
            else:
                recommendation = "Your resume already matches most skills for this role."

            results.append(
                {
                    "title": job["title"],
                    "description": job["description"],
                    "skills": job["skills"],
                    "match_score": f"{match_percentage+25}%",
                    "matched_skills": list(matched_skills)[:5],
                    "missing_skills": missing_skills[:5],
                    "recommendation": recommendation
                }
            )

        return results


job_matcher = JobMatcher()