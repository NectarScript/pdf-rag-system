from haystack.document_stores import FAISSDocumentStore

document_store = FAISSDocumentStore(
    faiss_index_factory_str="Flat",
    embedding_dim=384,
    sql_url="sqlite:///faiss.db",
    index="document",
)
