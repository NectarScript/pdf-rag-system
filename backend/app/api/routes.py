from fastapi import APIRouter, UploadFile, File
import shutil

from app.ingestion.pipeline import ingest
from app.retrieval.rag_pipeline import ask_question

router = APIRouter()

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    path = f"data/raw/{file.filename}"

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    ingest(path)

    return {"message": "PDF indexed successfully"}


@router.get("/ask")
def ask(query: str):

    answer = ask_question(query)

    return {"answer": answer}
