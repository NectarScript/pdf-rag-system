import os
import shutil
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
VECTORSTORE_DIR = os.path.join(BASE_DIR, "vectorstore")
FAISS_PATH = os.path.join(VECTORSTORE_DIR, "faiss_index")
MODEL_FILE = os.path.join(VECTORSTORE_DIR, "model.txt")

embeddings = HuggingFaceEmbeddings(model_name=MODEL_NAME)


def _model_matches():
    if not os.path.exists(MODEL_FILE):
        return False
    with open(MODEL_FILE, "r") as f:
        return f.read().strip() == MODEL_NAME


def _save_model_name():
    os.makedirs(VECTORSTORE_DIR, exist_ok=True)
    with open(MODEL_FILE, "w") as f:
        f.write(MODEL_NAME)


def _rebuild():
    print("Rebuilding FAISS index...")

    if os.path.exists(VECTORSTORE_DIR):
        shutil.rmtree(VECTORSTORE_DIR)

    os.makedirs(VECTORSTORE_DIR, exist_ok=True)

    vectorstore = FAISS.from_texts(["init"], embeddings)
    vectorstore.save_local(FAISS_PATH)
    _save_model_name()

    return vectorstore


def load_vectorstore():
    if os.path.exists(FAISS_PATH) and _model_matches():
        try:
            print("Loading FAISS index...")
            return FAISS.load_local(
                FAISS_PATH,
                embeddings,
                allow_dangerous_deserialization=True
            )
        except Exception:
            print("Corrupted FAISS. Rebuilding...")
            return _rebuild()
    else:
        return _rebuild()
