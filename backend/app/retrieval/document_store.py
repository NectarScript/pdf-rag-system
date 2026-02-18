import os
from haystack.document_stores import FAISSDocumentStore
from app.config import EMBEDDING_DIM

INDEX_PATH = "faiss.db"

document_store = FAISSDocumentStore(
    faiss_index_factory_str="Flat",
    embedding_dim=EMBEDDING_DIM,
    return_embedding=True
)

# Auto-safe load
if os.path.exists(INDEX_PATH):
    try:
        document_store.load(INDEX_PATH)
        print("✅ FAISS index loaded.")
    except Exception as e:
        print("⚠️ FAISS incompatible. Rebuilding index...")
        os.remove(INDEX_PATH)
        document_store.save(INDEX_PATH)
else:
    document_store.save(INDEX_PATH)
