import logging
from sentence_transformers import SentenceTransformer

logger = logging.getLogger(__name__)


class EmbeddingService:

    _model = None

    @classmethod
    def get_model(cls):

        if cls._model is None:
            logger.info("Loading embedding model...")

            cls._model = SentenceTransformer(
                "sentence-transformers/all-MiniLM-L6-v2"
            )

        return cls._model


embedding_service = EmbeddingService()