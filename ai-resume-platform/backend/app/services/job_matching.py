import logging
import re
from typing import List, Dict

import faiss
import numpy as np
import pandas as pd

from app.services.embedding_service import encode_texts

logger = logging.getLogger(__name__)


class JobMatcher:

    def __init__(self):
        self.jobs: List[Dict] = []
        self.index = None

    # -----------------------------
    # Load jobs from CSV
    # -----------------------------
    def load_jobs_from_csv(self, path: str):

        try:
            df = pd.read_csv(path)

            jobs = []

            for _, row in df.iterrows():

                job = {
                    "title": str(row.get("title", "")),
                    "description": str(row.get("description", "")),
                    "skills": str(row.get("skills", "")),
                }

                jobs.append(job)

            self.build_index(jobs)

            logger.info(f"Loaded {len(jobs)} jobs into FAISS index")

        except Exception as e:
            logger.error(f"Failed to load jobs: {e}")

    # -----------------------------
    # Build FAISS index
    # -----------------------------
    def build_index(self, jobs: List[Dict]):

        if not jobs:
            self.jobs = []
            self.index = None
            return

        self.jobs = jobs

        try:
            texts = [
                f"{job['title']} {job['description']} {job['skills']}"
                for job in jobs
            ]

            embeddings = encode_texts(texts)

            faiss.normalize_L2(embeddings)

            dimension = embeddings.shape[1]

            self.index = faiss.IndexFlatIP(dimension)

            self.index.add(embeddings)

        except Exception as e:
            logger.error(f"Failed to build FAISS index: {e}")
            self.index = None

    # -----------------------------
    # Clean tokens
    # -----------------------------
    def clean_tokens(self, text: str):

        text = text.lower()

        text = re.sub(r"[^a-z0-9\s]", " ", text)

        tokens = text.split()

        return set(tokens)

    # -----------------------------
    # Match resume to jobs
    # -----------------------------
    def match(self, resume_text: str, top_k: int = 5):

        if self.index is None:
            logger.warning("Job index not initialized")
            return []

        try:
            resume_embedding = encode_texts([resume_text])

            faiss.normalize_L2(resume_embedding)

            top_k = min(top_k, len(self.jobs))

            scores, indices = self.index.search(resume_embedding, top_k)

            resume_tokens = self.clean_tokens(resume_text)

            results = []

            for i, idx in enumerate(indices[0]):

                job = self.jobs[idx]

                job_tokens = self.clean_tokens(job["skills"])

                matched_skills = job_tokens & resume_tokens
                missing_skills = list(job_tokens - resume_tokens)

                semantic_score = float(scores[0][i])

                if len(job_tokens) > 0:
                    skill_score = len(matched_skills) / len(job_tokens)
                else:
                    skill_score = 0

                final_score = (0.7 * semantic_score) + (0.3 * skill_score)

                match_percentage = round(final_score * 100, 2)

                match_percentage = min(match_percentage + 20, 100)

                if missing_skills:
                    recommendation = (
                        f"Improve match by learning {', '.join(missing_skills[:3])}."
                    )
                else:
                    recommendation = (
                        "Your resume already matches most skills for this role."
                    )

                results.append(
                    {
                        "title": job["title"],
                        "description": job["description"],
                        "skills": job["skills"],
                        "match_score": f"{match_percentage}%",
                        "matched_skills": list(matched_skills)[:5],
                        "missing_skills": missing_skills[:5],
                        "recommendation": recommendation,
                    }
                )

            return results

        except Exception as e:
            logger.error(f"Job matching failed: {e}")
            return []


job_matcher = JobMatcher()