"use client"

import * as React from "react"
import { FileText, Trash2, FileOutput } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface DocumentListProps {
    documents: string[]
    selectedDoc: string | null
    onSelect: (doc: string) => void
    onDelete: (doc: string) => void
    onSummary: (doc: string) => void
}

export function DocumentList({
    documents,
    selectedDoc,
    onSelect,
    onDelete,
    onSummary,
}: DocumentListProps) {
    if (documents.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <p className="text-sm text-muted-foreground">No documents found.</p>
            </div>
        )
    }

    return (
        <ScrollArea className="flex-1">
            <div className="flex flex-col gap-2 p-4">
                {documents.map((doc) => (
                    <div
                        key={doc}
                        className={cn(
                            "group flex items-center justify-between rounded-lg border p-3 text-sm transition-all hover:bg-accent/50",
                            selectedDoc === doc && "bg-accent border-primary/50"
                        )}
                        onClick={() => onSelect(doc)}
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className={cn("rounded-md p-1.5",
                                selectedDoc === doc ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}>
                                <FileText className="h-4 w-4" />
                            </div>
                            <span className="truncate font-medium">{doc}</span>
                        </div>

                        <div className="flex items-center opacity-0 transition-opacity group-hover:opacity-100">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onSummary(doc)
                                            }}
                                        >
                                            <FileOutput className="h-4 w-4" />
                                            <span className="sr-only">Summary</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Summary</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onDelete(doc)
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Delete</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}
