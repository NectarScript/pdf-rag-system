# 📄 PDF RAG AI — Multi-Document Chat System

A full-stack Retrieval-Augmented Generation (RAG) system that enables users to upload multiple PDFs and interact with them using a Groq-powered Large Language Model (LLM).

This project combines semantic search, metadata filtering, session memory, and streaming responses to deliver a ChatGPT-like experience grounded strictly in document content.

---

## 🚀 Overview

This system allows users to:

- Upload multiple PDF documents
- Perform semantic search over document contents
- Chat with documents using contextual retrieval
- Stream AI-generated responses in real time
- Maintain session-based chat history
- Filter responses by specific file name

The architecture cleanly separates retrieval and generation to ensure responses are grounded in indexed document context.

---

## 🏗️ Architecture

### 🔹 Backend
- **FastAPI**
- **Haystack (FAISSDocumentStore)**
- **SentenceTransformers (Embeddings)**
- **Groq LLM API**
- **SQLite metadata storage**
- Streaming response generator

### 🔹 Frontend
- **Next.js 14 (App Router)**
- **Tailwind CSS**
- **Framer Motion**
- **shadcn/ui**
- Dark/Light mode UI

---

## 🧠 How It Works

1. User uploads one or more PDFs.
2. Each PDF is:
   - Parsed
   - Chunked
   - Embedded using SentenceTransformers
   - Stored in FAISS with metadata
3. When a user asks a question:
   - Hybrid retrieval fetches relevant document chunks
   - Optional metadata filtering narrows results by file
   - Context is constructed
   - Prompt is sent to Groq LLM
   - Response is streamed back to frontend
4. Chat history is stored per session.

The model is instructed to answer strictly using provided document context.

---

## ✨ Features

- ✅ Multi-PDF indexing
- ✅ Hybrid dense retrieval
- ✅ Metadata-based filtering (`file_name`)
- ✅ Session-based chat memory
- ✅ Streaming LLM responses
- ✅ Persistent FAISS index
- ✅ Strict hallucination control
- ✅ Modern animated UI

---

## 📂 Project Structure

pdf-rag/
│
├── backend/
│ ├── app/
│ │ ├── api/
│ │ ├── ingestion/
│ │ ├── retrieval/
│ │ ├── core/
│ │ └── main.py
│ ├── requirements.txt
│ └── .gitignore
│
├── frontend/
│ ├── app/
│ ├── components/
│ ├── lib/
│ └── package.json
│
└── README.md


---

## ⚙️ Backend Setup

### 1️⃣ Create Virtual Environment

```bash
cd backend
python -m venv venv
venv\Scripts\activate
2️⃣ Install Dependencies
pip install -r requirements.txt

3️⃣ Create Environment File

Create a .env file inside backend/:

GROQ_API_KEY=your_groq_api_key_here


⚠️ Do not commit .env to GitHub.

4️⃣ Run Backend
uvicorn app.main:app --reload

Backend runs at:

http://127.0.0.1:8000


Swagger documentation:

http://127.0.0.1:8000/docs

💻 Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:3000
