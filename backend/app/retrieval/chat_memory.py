# In-memory session storage
chat_sessions = {}


def get_session_history(session_id: str):
    if session_id not in chat_sessions:
        chat_sessions[session_id] = []
    return chat_sessions[session_id]


def add_to_session(session_id: str, question: str, answer: str):
    history = get_session_history(session_id)
    history.append({
        "question": question,
        "answer": answer
    })


def clear_session(session_id: str):
    if session_id in chat_sessions:
        del chat_sessions[session_id]
