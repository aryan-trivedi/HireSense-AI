import logging

logger = logging.getLogger(__name__)

_model = None

def get_embedding_model():
    global _model

    if _model is None:
        logger.info("Loading embedding model...")

        from sentence_transformers import SentenceTransformer

        _model = SentenceTransformer(
            "sentence-transformers/all-MiniLM-L6-v2",
            device="cpu"
        )

    return _model