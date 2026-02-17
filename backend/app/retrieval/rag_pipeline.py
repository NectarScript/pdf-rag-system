from app.retrieval.retriever import retriever
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

# =========================
# Model setup
# =========================

model_name = "google/flan-t5-base"

print("Loading FLAN-T5 model...")

tokenizer = AutoTokenizer.from_pretrained(model_name)

model = AutoModelForSeq2SeqLM.from_pretrained(
    model_name,
    torch_dtype=torch.float32
)

# Use GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

print(f"Model loaded on: {device}")


# =========================
# Question answering function
# =========================

def ask_question(query: str):

    # Retrieve more documents for better context
    docs = retriever.retrieve(query, top_k=8)

    if not docs:
        return "No relevant information found in the document."

    # Limit context size safely
    context_parts = []
    total_length = 0
    max_context_length = 1500

    for doc in docs:
        text = doc.content.strip()
        if total_length + len(text) > max_context_length:
            break
        context_parts.append(text)
        total_length += len(text)

    context = "\n\n".join(context_parts)

    # Strong prompt for detailed answers
    prompt = f"""
You are an intelligent AI assistant.

Use ONLY the provided context to answer the question.

Provide a detailed, structured, and complete answer.

If possible, explain clearly in multiple sentences.

Context:
{context}

Question:
{query}

Detailed Answer:
"""

    # Tokenize
    inputs = tokenizer(
        prompt,
        return_tensors="pt",
        truncation=True,
        max_length=512
    ).to(device)

    # Generate detailed output
    outputs = model.generate(
        inputs["input_ids"],

        max_length=512,          # increased output length
        min_length=150,           # ensure detailed answer

        num_beams=4,             # better reasoning
        early_stopping=True,

        temperature=0.7,
        top_p=0.9,         # more factual
        do_sample=True,

        repetition_penalty=1.2,  # avoid repetition

        no_repeat_ngram_size=3
    )

    answer = tokenizer.decode(
        outputs[0],
        skip_special_tokens=True
    )

    return answer
