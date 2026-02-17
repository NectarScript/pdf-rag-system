from haystack.nodes import EmbeddingRetriever
from app.retrieval.document_store import document_store
from app.config import EMBEDDING_MODEL

retriever = EmbeddingRetriever(
    document_store=document_store,
    embedding_model=EMBEDDING_MODEL
)
