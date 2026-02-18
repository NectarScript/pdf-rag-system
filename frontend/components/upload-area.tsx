"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloud, File, X, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface UploadAreaProps {
    onUpload: (files: File[]) => Promise<void>;
}

export function UploadArea({ onUpload }: UploadAreaProps) {
    const [files, setFiles] = React.useState<File[]>([])
    const [uploading, setUploading] = React.useState(false)
    const [progress, setProgress] = React.useState(0)

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        // Filter for PDFs
        const pdfs = acceptedFiles.filter(f => f.type === "application/pdf")
        setFiles(prev => [...prev, ...pdfs])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] } })

    const handleUpload = async () => {
        if (files.length === 0) return
        setUploading(true)
        setProgress(10)
        try {
            // Simulate progress for UX
            const interval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90))
            }, 200)

            await onUpload(files)

            clearInterval(interval)
            setProgress(100)
            setTimeout(() => {
                setFiles([])
                setProgress(0)
                setUploading(false)
            }, 1000)
        } catch (e) {
            console.error(e)
            setUploading(false)
            setProgress(0)
        }
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Drop Zone */}
            <div
                {...getRootProps()}
                className={cn(
                    "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/5 p-6 transition-colors hover:bg-muted/10 cursor-pointer",
                    isDragActive && "border-primary bg-primary/5",
                    uploading && "pointer-events-none opacity-50"
                )}
            >
                <input {...getInputProps()} />
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <UploadCloud className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="mt-2 text-center text-sm">
                    <span className="font-medium text-foreground">Click to upload</span> or drag and drop
                </div>
                <p className="text-xs text-muted-foreground">PDFs only (max 10MB)</p>
            </div>

            {/* File List */}
            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-2"
                    >
                        {files.map((file, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="flex items-center justify-between rounded-md border bg-card p-2 text-sm"
                            >
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <File className="h-4 w-4 shrink-0 text-primary" />
                                    <span className="truncate max-w-[150px]">{file.name}</span>
                                </div>
                                {!uploading && (
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); removeFile(i); }}>
                                        <X className="h-3 w-3" />
                                    </Button>
                                )}
                            </motion.div>
                        ))}

                        {uploading ? (
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>Uploading...</span>
                                    <span>{progress}%</span>
                                </div>
                                <Progress value={progress} className="h-1" />
                            </div>
                        ) : (
                            <Button size="sm" onClick={handleUpload} className="w-full">
                                Upload {files.length} {files.length === 1 ? 'file' : 'files'}
                            </Button>
                        )}

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
