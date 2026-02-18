import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def test_groq():
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": "Explain what RAG is in 3 lines."}
        ],
        temperature=0.2,
        max_tokens=200
    )

    print(completion.choices[0].message.content)


if __name__ == "__main__":
    test_groq()
