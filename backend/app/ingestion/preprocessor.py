def preprocess(document):

    docs = []

    for doc in document:
        text = doc.content

        words = text.split()

        chunk_size = 200
        overlap = 50

        start = 0

        while start < len(words):
            end = start + chunk_size
            chunk_words = words[start:end]

            chunk_text = " ".join(chunk_words)

            docs.append({
                "content": chunk_text,
                "meta": doc.meta
            })

            start += chunk_size - overlap

    return docs
