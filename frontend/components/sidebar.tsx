"use client"

import * as React from "react"
import { LucideBook, MessageSquarePlus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { DocumentList } from "@/components/document-list"
import { UploadArea } from "@/components/upload-area"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface SidebarProps {
    className?: string
    documents: string[]
    selectedDoc: string | null
    onSelect: (doc: string) => void
    onDelete: (doc: string) => void
    onSummary: (doc: string) => void
    onUpload: (files: File[]) => Promise<void>
    onNewChat: () => void
}

export function Sidebar({ className, ...props }: SidebarProps) {
    // Deep dark background for sidebar
    return (
        <div className={`flex h-full w-[300px] flex-col border-r border-white/5 bg-[#0F1115] ${className}`}>
            <SidebarContent {...props} />
        </div>
    )
}

export function SidebarContent({
    documents,
    selectedDoc,
    onSelect,
    onDelete,
    onSummary,
    onUpload,
    onNewChat
}: Omit<SidebarProps, "className">) {
    const [openUpload, setOpenUpload] = React.useState(false)

    // Wrap upload to close dialog
    const handleUpload = async (files: File[]) => {
        await onUpload(files)
        setOpenUpload(false)
    }

    return (
        <>
            {/* Header */}
            <div className="flex h-14 items-center justify-between border-b border-border px-4 lg:h-[60px]">
                <span className="flex items-center gap-2 font-semibold text-foreground tracking-tight">
                    <div className="rounded-md bg-gradient-to-br from-primary to-primary/80 p-1.5 text-primary-foreground shadow-sm">
                        <LucideBook className="size-4" />
                    </div>
                    <span>PDF RAG</span>
                </span>
                <ThemeToggle />
            </div>

            {/* Actions */}
            <div className="p-4 space-y-3">
                <Button
                    className="w-full justify-start gap-2 shadow-sm bg-card hover:bg-muted text-foreground border border-border transition-all hover:border-primary/20"
                    onClick={onNewChat}
                >
                    <MessageSquarePlus className="size-4 text-primary" />
                    New Chat
                </Button>

                <Dialog open={openUpload} onOpenChange={setOpenUpload}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start gap-2 border-dashed border-border bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-primary/20 transition-all">
                            <Plus className="size-4" />
                            Upload PDF
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card border-border text-foreground">
                        <DialogHeader>
                            <DialogTitle>Upload Documents</DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Upload PDFs to index them for AI analysis.
                            </DialogDescription>
                        </DialogHeader>
                        <UploadArea onUpload={handleUpload} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Documents */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="px-4 py-2 mt-2">
                    <h2 className="mb-2 text-[10px] font-bold uppercase text-muted-foreground/60 tracking-widest">
                        My Documents
                    </h2>
                </div>
                <DocumentList
                    documents={documents}
                    selectedDoc={selectedDoc}
                    onSelect={onSelect}
                    onDelete={onDelete}
                    onSummary={onSummary}
                />
            </div>
        </>
    )
}
