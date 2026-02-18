from fastapi import APIRouter, UploadFile, File
from fastapi.responses import StreamingResponse
from typing import List
import shutil
import os

from app.retrieval.document_store import document_store
from app.ingestion.pipeline import ingest
from app.retrieval.rag_pipeline import stream_answer
from app.retrieval.chat_memory import clear_session

router = APIRouter()

# Folder to store uploaded PDFs
UPLOAD_DIR = "data/raw"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ===============================
# MULTI-PDF UPLOAD
# ===============================
@router.post("/upload")
async def upload_pdf(files: List[UploadFile] = File(...)):

    uploaded_files = []

    for file in files:

        file_path = os.path.join(UPLOAD_DIR, file.filename)

        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Ingest into vector store
        ingest(file_path)

        uploaded_files.append(file.filename)

    return {
        "message": "PDFs indexed successfully",
        "files": uploaded_files,
        "count": len(uploaded_files)
    }


# ===============================
# ASK QUESTION (STREAMING)
# ===============================
@router.get("/ask")
def ask(query: str, session_id: str, file_name: str = None):

    return StreamingResponse(
        stream_answer(
            query=query,
            session_id=session_id,
            file_name=file_name
        ),
        media_type="text/plain"
    )




# ===============================
# LIST DOCUMENTS
# ===============================
@router.get("/documents")
def list_documents():

    docs = document_store.get_all_documents()

    file_names = {
        doc.meta["file_name"]
        for doc in docs
        if doc.meta and "file_name" in doc.meta
    }

    return {
        "documents": list(file_names),
        "count": len(file_names)
    }


# ===============================
# DELETE DOCUMENT
# ===============================
@router.delete("/documents/{file_name}")
def delete_document(file_name: str):

    docs = document_store.get_all_documents()

    ids_to_delete = [
        doc.id
        for doc in docs
        if doc.meta and doc.meta.get("file_name") == file_name
    ]

    if not ids_to_delete:
        return {
            "message": "File not found",
            "file_name": file_name
        }

    # Delete from FAISS
    document_store.delete_documents(ids=ids_to_delete)

    # Save updated FAISS index
    document_store.save("vector_store/faiss_index")

    # Delete file from disk
    file_path = os.path.join(UPLOAD_DIR, file_name)
    if os.path.exists(file_path):
        os.remove(file_path)

    return {
        "message": "Document deleted successfully",
        "file_name": file_name,
        "chunks_removed": len(ids_to_delete)
    }


# ===============================
# DOCUMENT SUMMARY
# ===============================
@router.get("/summary/{file_name}")
def summarize_document(file_name: str):

    docs = document_store.get_all_documents()

    file_chunks = [
        doc.content
        for doc in docs
        if doc.meta and doc.meta.get("file_name") == file_name
    ]

    if not file_chunks:
        return {"error": "File not found"}

    # Limit chunks to avoid overload
    combined_text = "\n".join(file_chunks[:10])

    summary_prompt = f"""
Summarize the following document clearly and concisely.

Document:
{combined_text}

Summary:
"""

    inputs = tokenizer(
        summary_prompt,
        return_tensors="pt",
        truncation=True,
        max_length=512
    )

    outputs = model.generate(
        inputs["input_ids"],
        max_length=200,
        temperature=0.3
    )

    summary = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return {
        "file_name": file_name,
        "summary": summary
    }


# ===============================
# CLEAR CHAT SESSION
# ===============================
@router.delete("/chat")
def clear_chat(session_id: str):
    clear_session(session_id)
    return {"message": "Chat session cleared"}

