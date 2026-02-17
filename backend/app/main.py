from fastapi import FastAPI

from app.api.routes import router

app = FastAPI(title="RAG PDF QA System")

app.include_router(router)
