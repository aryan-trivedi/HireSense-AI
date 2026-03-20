import logging
import numpy as np

logger = logging.getLogger(__name__)

_model = None


def get_embedding_model():
    global _model

    if _model is None:
        logger.info("Loading FastEmbed embedding model...")

        from fastembed import TextEmbedding

        _model = TextEmbedding()

    return _model


def encode_texts(texts):
    """
    Wrapper to generate embeddings compatible with previous
    sentence-transformers usage.
    """
    model = get_embedding_model()

    embeddings = list(model.embed(texts))

    embeddings = np.array(embeddings).astype("float32")

    return embeddings