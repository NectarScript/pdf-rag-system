"use client"

import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"

interface SummaryModalProps {
    isOpen: boolean
    onClose: () => void
    summary: string
    loading: boolean
    filename: string
}

export function SummaryModal({
    isOpen,
    onClose,
    summary,
    loading,
    filename,
}: SummaryModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Document Summary</DialogTitle>
                    <DialogDescription>
                        Summary for <span className="font-medium text-foreground">{filename}</span>
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-4 h-[60vh] rounded-md border p-4">
                    {loading ? (
                        <div className="flex h-full items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                            {summary || "No summary available."}
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
