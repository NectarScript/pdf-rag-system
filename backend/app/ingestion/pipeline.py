from app.ingestion.pdf_loader import load_pdf
from app.ingestion.preprocessor import preprocess
from app.retrieval.document_store import document_store
from app.retrieval.retriever import retriever



from haystack.schema import Document
import os


def ingest(pdf_path):

    # Load PDF text
    text = load_pdf(pdf_path)

    # Split into chunks
    chunks = preprocess(text)

    file_name = os.path.basename(pdf_path)

    documents = []

    for chunk in chunks:

        # If chunk is dict
        if isinstance(chunk, dict):
            content = chunk.get("content", "")
        else:
            content = chunk

        doc = Document(
            content=str(content),
            meta={
                "file_name": file_name
            }
        )

        documents.append(doc)

    # Write documents
    document_store.write_documents(documents)

    # Generate embeddings
    document_store.update_embeddings(retriever)

    return True
