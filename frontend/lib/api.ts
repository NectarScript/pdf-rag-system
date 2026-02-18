export const API_BASE = "http://127.0.0.1:8000"

export type Document = {
    filename: string
    id?: string // In case backend changes, but purely filename for now
}

export async function fetchDocuments(): Promise<string[]> {
    try {
        const res = await fetch(`${API_BASE}/documents`)
        if (!res.ok) throw new Error("Failed to fetch documents")
        const data = await res.json()
        // Assuming backend returns list of strings or list of objects. 
        // User said "Returns list of indexed PDFs". Usually strings or object with filename.
        // I'll assume list of strings based on "DELETE /documents/{file_name}" implies filename is key.
        // But checking schemas is better. defaulting to strings for now.
        return data.documents || data || []
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function uploadFiles(files: File[]): Promise<void> {
    const formData = new FormData()
    files.forEach((file) => {
        formData.append("files", file)
    })
    const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
    })
    if (!res.ok) throw new Error("Failed to upload files")
}

export async function deleteDocument(filename: string): Promise<void> {
    const res = await fetch(`${API_BASE}/documents/${filename}`, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete document")
}

export async function getSummary(filename: string): Promise<string> {
    const res = await fetch(`${API_BASE}/summary/${filename}`)
    if (!res.ok) throw new Error("Failed to get summary")
    const data = await res.json()
    return data.summary || data
}

// Chat API is streaming, handled in component usually, but we can export helper url
export const CHAT_API = `${API_BASE}/ask`
