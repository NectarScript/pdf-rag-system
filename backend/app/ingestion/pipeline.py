from app.ingestion.pdf_loader import load_pdf
from app.ingestion.preprocessor import preprocess
from app.retrieval.document_store import document_store
from app.retrieval.retriever import retriever

def ingest(pdf_path):

    document = load_pdf(pdf_path)

    docs = preprocess(document)

    document_store.write_documents(docs)

    document_store.update_embeddings(retriever)

    return True
