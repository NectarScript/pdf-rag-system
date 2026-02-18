"use client"

import * as React from "react"
import { toast } from "sonner"
import { v4 as uuidv4 } from 'uuid'
import { ChatWindow, type Message } from "@/components/chat-window"
import { SummaryModal } from "@/components/summary-modal"
import { Button } from "@/components/ui/button"
import { fetchDocuments, uploadFiles, deleteDocument, getSummary, CHAT_API } from "@/lib/api"

export function ClientApp() {
    const [documents, setDocuments] = React.useState<string[]>([])
    const [selectedDoc, setSelectedDoc] = React.useState<string | null>(null)
    const [messages, setMessages] = React.useState<Message[]>([])
    const [sessionId, setSessionId] = React.useState<string>("")
    const [isStreaming, setIsStreaming] = React.useState(false)
    const [input, setInput] = React.useState("")

    // Summary Modal State - keeping for now if we want to add summary button back
    const [summaryOpen, setSummaryOpen] = React.useState(false)
    const [summaryLoading, setSummaryLoading] = React.useState(false)
    const [summaryContent, setSummaryContent] = React.useState("")
    const [summaryDoc, setSummaryDoc] = React.useState("")

    React.useEffect(() => {
        // Initialize session ID
        setSessionId(uuidv4())
        loadDocuments()
    }, [])

    const loadDocuments = async () => {
        try {
            const docs = await fetchDocuments()
            setDocuments(docs)
        } catch (error) {
            toast.error("Failed to load documents")
        }
    }

    const handleUpload = async (files: File[]) => {
        try {
            await uploadFiles(files)
            toast.success("PDF indexed successfully.")
            await loadDocuments()
            if (files.length > 0) {
                // Optionally select the uploaded doc or just notify
                // We'll set it as selected so the chat context knows
                setSelectedDoc(files[0].name)
            }
        } catch (error) {
            toast.error("Upload failed")
        }
    }

    const handleDelete = async (filename: string) => {
        try {
            await deleteDocument(filename)
            toast.success(`Deleted ${filename}`)
            if (selectedDoc === filename) setSelectedDoc(null)
            await loadDocuments()
        } catch (error) {
            toast.error("Failed to delete document")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e as any)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isStreaming) return

        const currentInput = input
        setInput("")

        const userMsg: Message = { role: "user", content: currentInput, id: uuidv4() }
        setMessages(prev => [...prev, userMsg])
        setIsStreaming(true)

        try {
            const queryParams = new URLSearchParams({
                query: currentInput,
                session_id: sessionId,
            })
            if (selectedDoc) {
                queryParams.append("file_name", selectedDoc)
            }

            const response = await fetch(`${CHAT_API}?${queryParams.toString()}`)

            if (!response.ok || !response.body) {
                throw new Error("Failed to get response")
            }

            const reader = response.body.getReader()
            const decoder = new TextDecoder()

            let aiMsgId = uuidv4()
            let aiContent = ""

            // Add empty AI message
            setMessages(prev => [...prev, { role: "assistant", content: "", id: aiMsgId }])

            while (true) {
                const { done, value } = await reader.read()
                if (done) break
                const chunk = decoder.decode(value, { stream: true })
                aiContent += chunk

                setMessages(prev => prev.map(msg =>
                    msg.id === aiMsgId ? { ...msg, content: aiContent } : msg
                ))
            }

        } catch (error) {
            console.error(error)
            toast.error("Failed to send message")
        } finally {
            setIsStreaming(false)
        }
    }

    const handleClearChat = () => {
        setMessages([])
        setSessionId(uuidv4())
        toast.info("Chat cleared")
    }

    const handleNewChat = () => {
        handleClearChat()
        setSelectedDoc(null)
    }

    return (
        <div id="app-section" className="flex h-screen w-full overflow-hidden bg-[#e5e7eb] relative">
            <main className="flex-1 flex items-center justify-center min-w-0">
                <ChatWindow
                    messages={messages}
                    input={input}
                    setInput={setInput}
                    isStreaming={isStreaming}
                    handleKeyDown={handleKeyDown}
                    handleSubmit={handleSubmit}
                    selectedDoc={selectedDoc}
                    onClearChat={handleClearChat}
                    onUpload={handleUpload}
                />
            </main>
        </div>
    )
}
