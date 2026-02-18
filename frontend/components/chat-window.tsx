"use client"

import * as React from "react"
import { Send, Loader2, Sparkles, X, ChevronRight, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface Message {
    id: string
    role: "user" | "assistant"
    content: string
}

interface ChatWindowProps {
    messages: Message[]
    input: string
    setInput: (value: string) => void
    isStreaming: boolean
    handleKeyDown: (e: React.KeyboardEvent) => void
    handleSubmit: (e: React.FormEvent) => void
    selectedDoc: string | null
    onClearChat: () => void
    onUpload: (files: File[]) => void
}

export function ChatWindow({
    messages,
    input,
    setInput,
    isStreaming,
    handleKeyDown,
    handleSubmit,
    selectedDoc,
    onClearChat,
    onUpload
}: ChatWindowProps) {
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, isStreaming])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onUpload(Array.from(e.target.files))
            // Reset input value so same file can be selected again if needed
            e.target.value = ""
        }
    }

    return (
        <div className="flex h-full w-full items-center justify-center p-4 md:p-6 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="relative flex h-full max-h-[800px] w-full max-w-[720px] flex-col overflow-hidden rounded-[32px] bg-[#F8FAFC] dark:bg-[#111827] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white/50 dark:border-gray-800"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-[#F8FAFC] to-transparent dark:from-[#111827] via-[#111827]/80">
                    <div className="flex items-center gap-2">
                        {/* Optional: Add a small logo or title if needed */}
                    </div>
                    {messages.length > 0 && (
                        <Button variant="ghost" size="icon" onClick={onClearChat} className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-1 relative flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1 px-2 sm:px-6">
                        <div className="flex min-h-full flex-col justify-end pb-4 pt-16 space-y-6">

                            {/* Zero State / Welcome Screen */}
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center space-y-8 mt-auto mb-auto animate-in fade-in duration-700">
                                    {/* AI Orb - Glossy Green Sphere */}
                                    <motion.div
                                        animate={{
                                            y: [0, -8, 0],
                                            scale: [1, 1.02, 1],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="relative h-32 w-32 md:h-40 md:w-40"
                                    >
                                        {/* Glow behind */}
                                        <div className="absolute inset-0 rounded-full bg-green-500/40 blur-[40px] animate-pulse" />

                                        {/* Main Sphere */}
                                        <div
                                            className="absolute inset-0 rounded-full shadow-[0_0_80px_rgba(34,197,94,0.4)]"
                                            style={{
                                                background: "radial-gradient(circle at 30% 30%, #6EE7B7, #22C55E, #16A34A)"
                                            }}
                                        />

                                        {/* Surface Glare/Highlight */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent opacity-80" />
                                        <div className="absolute top-4 left-6 h-10 w-16 rounded-full bg-white/60 blur-[2px] transform -rotate-12" />
                                    </motion.div>

                                    <div className="text-center space-y-2 max-w-sm px-4">
                                        <h2 className="text-2xl font-medium text-gray-600 dark:text-gray-300 tracking-tight">
                                            What do you want to know about <br />
                                            <span className="text-green-600 dark:text-green-400 font-semibold">{selectedDoc || "your document"}</span>?
                                        </h2>
                                    </div>
                                </div>
                            )}

                            {/* Messages List */}
                            <AnimatePresence initial={false} mode="popLayout">
                                {messages.map((msg, index) => {
                                    const isSameSender = index > 0 && messages[index - 1].role === msg.role
                                    const showAvatar = !isSameSender

                                    return (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            className={cn(
                                                "flex w-full",
                                                msg.role === "user" ? "justify-end" : "justify-start",
                                                isSameSender ? "mt-1" : "mt-6"
                                            )}
                                        >
                                            {/* AI Avatar (Left) */}
                                            {msg.role === "assistant" && (
                                                <div className={cn("flex-shrink-0 mr-3 w-8 flex flex-col justify-end", !showAvatar && "invisible")}>
                                                    <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                                        <Sparkles className="h-4 w-4 text-emerald-500 fill-emerald-500/20" />
                                                    </div>
                                                </div>
                                            )}

                                            <div
                                                className={cn(
                                                    "relative px-5 py-3 text-[15px] leading-relaxed max-w-[75%] shadow-sm transition-all duration-200",
                                                    msg.role === "user"
                                                        ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl rounded-tr-sm"
                                                        : "bg-white dark:bg-[#1F2937] text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm",
                                                )}
                                            >
                                                {msg.content}
                                            </div>

                                            {/* User Avatar (Right) */}
                                            {msg.role === "user" && (
                                                <div className={cn("flex-shrink-0 ml-3 w-8 flex flex-col justify-end", !showAvatar && "invisible")}>
                                                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center shadow-md text-white font-medium text-xs">
                                                        U
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>

                            {/* Streaming Indicator */}
                            {isStreaming && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start mt-4"
                                >
                                    <div className="flex-shrink-0 mr-3 w-8 flex flex-col justify-end">
                                        <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-pulse">
                                            <Sparkles className="h-4 w-4 text-emerald-500 fill-emerald-500/20" />
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-[#1F2937] border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm px-5 py-4 flex gap-1 items-center shadow-sm">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></span>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>
                </div>

                {/* Input Area Group */}
                <div className="p-4 sm:p-6 pt-2 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent dark:from-[#111827] dark:via-[#111827]">
                    <div className="flex items-end gap-2">
                        {/* Upload Button */}
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf"
                        />
                        <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="h-[54px] rounded-2xl border-gray-200 dark:border-gray-700 bg-[#F9FAFB] dark:bg-[#1F2937] text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200 px-4 transition-all shadow-sm flex-shrink-0"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            <span className="hidden sm:inline">Upload PDF</span>
                        </Button>

                        {/* Input Field Area */}
                        <div className="relative flex-1 items-center shadow-sm">
                            <input
                                className="w-full bg-[#F9FAFB] dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 pr-12 text-base text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all shadow-inner h-[54px]"
                                placeholder="Ask me anything..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isStreaming}
                            />
                            <Button
                                onClick={(e) => handleSubmit(e as any)}
                                disabled={!input.trim() || isStreaming}
                                size="icon"
                                className={cn(
                                    "absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl transition-all duration-200",
                                    input.trim()
                                        ? "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transform hover:scale-105"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                                )}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-end items-center mt-3 px-1">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">AI can make mistakes. Check important info.</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
