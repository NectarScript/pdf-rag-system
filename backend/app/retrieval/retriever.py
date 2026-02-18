from app.retrieval.document_store import document_store
from haystack.nodes import EmbeddingRetriever
from app.config import EMBEDDING_MODEL

retriever = EmbeddingRetriever(
    document_store=document_store,
    embedding_model=EMBEDDING_MODEL,
    use_gpu=False
)


def hybrid_retrieve(query: str, top_k: int = 5, filters=None):

    docs = retriever.retrieve(query, top_k=top_k)

    # Manual file filtering (since FAISS doesn't support it)
    if filters and "file_name" in filters:
        allowed_files = filters["file_name"]
        docs = [
            doc for doc in docs
            if doc.meta and doc.meta.get("file_name") in allowed_files
        ]

    return docs


