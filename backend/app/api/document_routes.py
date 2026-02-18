from fastapi import APIRouter
from app.retrieval.document_store import document_store

document_router = APIRouter(prefix="/documents", tags=["Documents"])


@document_router.get("/")
def list_documents():

    docs = document_store.get_all_documents()

    file_names = list(set(
        doc.meta.get("file_name")
        for doc in docs
    ))

    return {
        "total_files": len(file_names),
        "files": file_names
    }



@document_router.delete("/clear")
def clear_documents():
    document_store.delete_documents()

    return {
        "message": "All documents deleted successfully"
    }
