from app.retrieval.retriever import hybrid_retrieve
from app.retrieval.chat_memory import (
    get_session_history,
    add_to_session
)

from groq import Groq
import os


# ==============================
# Initialize Groq Client
# ==============================

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ==============================
# Streaming RAG Answer (Groq)
# ==============================

def stream_answer(query: str, session_id: str, file_name: str = None):

    try:
        filters = {"file_name": [file_name]} if file_name else None

        # Retrieve relevant documents
        docs = hybrid_retrieve(
            query=query,
            top_k=4,  # reduce for token safety
            filters=filters
        )

        context = "\n\n".join([doc.content for doc in docs])

        history = get_session_history(session_id)

        # Build messages list for chat model
        messages = [
            {
                "role": "system",
                "content": """You are a highly accurate AI assistant.

Strict Rules:
1. Answer ONLY using the provided context.
2. If the answer is not found in the context, say:
   "Information not found in provided documents."
3. Do NOT hallucinate.
4. Be clear and well structured.
"""
            }
        ]

        # Add previous chat history
        for item in history:
            messages.append({"role": "user", "content": item["question"]})
            messages.append({"role": "assistant", "content": item["answer"]})

        # Add current query with context
        user_prompt = f"""
--- CONTEXT ---
{context}
--- END CONTEXT ---

Question:
{query}
"""

        messages.append({"role": "user", "content": user_prompt})

        # Call Groq streaming API
        stream = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.2,
            max_tokens=1024,
            stream=True
        )

        full_answer = ""

        for chunk in stream:
            content = chunk.choices[0].delta.content
            if content:
                full_answer += content
                yield content

        # Save to session memory
        add_to_session(session_id, query, full_answer)

    except Exception as e:
        yield f"\n\n[ERROR]: {str(e)}"
