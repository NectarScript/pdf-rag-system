from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# ==============================
# Load Environment Variables
# ==============================

load_dotenv()

# Optional check (can remove later)
if not os.getenv("GROQ_API_KEY"):
    print("WARNING: GROQ_API_KEY not found in environment.")

from app.api.routes import router
from app.api.document_routes import document_router

app = FastAPI(
    title="PDF RAG System",
    version="1.0"
)

# ==============================
# CORS Middleware
# ==============================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# Routers
# ==============================

app.include_router(router)
app.include_router(document_router)

@app.get("/")
def root():
    return {"message": "PDF RAG system running"}
