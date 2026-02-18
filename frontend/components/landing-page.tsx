"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, FileText, Cpu, Zap, Github, Layers, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function LandingPage() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <div className="flex min-h-screen flex-col bg-[#0B0F14] text-white selection:bg-[#14B8A6]/30 overflow-hidden">

            {/* Navbar */}
            <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0B0F14]/80 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-6">
                    <div className="flex items-center gap-2 font-bold tracking-tighter text-xl">
                        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#22D3EE] flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                            <div className="h-3 w-3 rounded-full bg-white animate-pulse" />
                        </div>
                        <span>PDF RAG AI</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button size="sm" asChild className="rounded-full px-6 bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] text-black font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(20,184,166,0.5)] border-0">
                            <Link href="/chat">
                                Get Started
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1">

                {/* HERO SECTION */}
                <section ref={ref} className="relative flex min-h-screen flex-col items-center justify-center pt-20 overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 z-0 select-none pointer-events-none">
                        {/* Slow drifting radial glow */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.3, 0.2],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[#14B8A6] blur-[150px] mix-blend-screen opacity-20"
                        />
                        <motion.div
                            animate={{
                                x: [-20, 20, -20],
                                y: [-20, 20, -20],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute top-1/3 left-1/3 h-[500px] w-[500px] rounded-full bg-[#22D3EE] blur-[120px] mix-blend-screen opacity-10"
                        />

                        {/* Floating Particles */}
                        <Particles />

                        {/* Vignette */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0F14_90%)]" />
                    </div>

                    <motion.div
                        style={{ y, opacity }}
                        className="container relative z-10 flex flex-col items-center text-center px-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8 inline-flex items-center rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 px-4 py-1.5 text-xs font-medium text-[#22D3EE] backdrop-blur-sm"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-[#14B8A6] mr-2 animate-pulse shadow-[0_0_10px_#14B8A6]" />
                            Production-Ready AI Architecture
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="max-w-5xl text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl text-white"
                        >
                            Your Documents. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] via-[#22D3EE] to-[#14B8A6] bg-[length:200%_auto] animate-gradient">Understood by AI.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-8 max-w-2xl text-lg text-gray-400 sm:text-xl leading-relaxed"
                        >
                            Upload any document. Ask questions. Get real-time, context-aware answers powered by hybrid semantic search and Retrieval-Augmented Generation.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-12 flex flex-wrap gap-6 items-center justify-center"
                        >
                            <Button asChild size="lg" className="h-14 rounded-full px-10 text-lg bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] text-black font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(20,184,166,0.4)] border-0">
                                <Link href="/chat">
                                    Let's Get Started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-14 rounded-full px-10 text-lg border-white/10 bg-transparent text-white hover:bg-white/5 backdrop-blur-sm transition-all">
                                <a href="https://github.com/piyush-chiwande" target="_blank">
                                    View on GitHub
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </section>

                {/* FEATURES SECTION */}
                <section id="features" className="py-32 relative z-10 bg-[#0B0F14]">
                    <div className="container mx-auto px-6">
                        <div className="mb-20 text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-white mb-6">
                                Intelligent Processing
                            </h2>
                            <p className="text-lg text-gray-400">
                                No hallucinations. No guesswork. Just grounded answers from your data.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <FeatureCard
                                icon={<FileText className="h-6 w-6 text-[#14B8A6]" />}
                                title="Smart Understanding"
                                description="Extracts, chunks, embeds, and indexes your PDFs using advanced vectorization models for precise retrieval."
                                delay={0.1}
                            />
                            <FeatureCard
                                icon={<Cpu className="h-6 w-6 text-[#22D3EE]" />}
                                title="Context-Aware Answers"
                                description="Uses hybrid semantic search to pinpoint the exact paragraphs needed, ensuring completely grounded responses."
                                delay={0.2}
                            />
                            <FeatureCard
                                icon={<Zap className="h-6 w-6 text-white" />}
                                title="Real-Time Streaming"
                                description="Experience zero-latency responses. Watch the AI think and type in real-time with our optimized pipeline."
                                variant="glow"
                                delay={0.3}
                            />
                        </div>
                    </div>
                </section>

                {/* CREATOR SECTION */}
                <section id="creator" className="py-32 relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl border border-white/10 bg-[#111827]/50 backdrop-blur-md p-10 md:p-16 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 relative z-10">
                                <div className="flex-1 space-y-8 text-center md:text-left">
                                    <div className="inline-flex items-center rounded-full border border-[#14B8A6]/20 bg-[#14B8A6]/10 px-4 py-1.5 text-sm font-semibold text-[#14B8A6]">
                                        Built by Piyush
                                    </div>
                                    <h2 className="text-4xl font-bold tracking-tight text-white">
                                        IT Engineer & <br />
                                        <span className="text-[#14B8A6]">Backend Developer</span>
                                    </h2>
                                    <p className="text-gray-400 text-xl leading-relaxed max-w-xl">
                                        Focused on building scalable AI systems using FastAPI, FAISS, hybrid search, and modern LLM pipelines.
                                        This project demonstrates a production-grade RAG architecture with a clean developer-first interface.
                                    </p>
                                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                        <Badge>FastAPI</Badge>
                                        <Badge>FAISS</Badge>
                                        <Badge>Hybrid Search</Badge>
                                        <Badge>Next.js 14</Badge>
                                        <Badge>Streaming</Badge>
                                    </div>
                                </div>

                                <div className="relative h-80 w-full md:w-1/3 rounded-2xl border border-white/10 bg-black/40 overflow-hidden flex items-center justify-center shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/10 to-transparent" />
                                    <Layers className="h-32 w-32 text-gray-700 group-hover:text-[#14B8A6]/40 transition-colors duration-500" />

                                    {/* Animated Code Lines */}
                                    <div className="absolute bottom-6 left-6 right-6 space-y-3">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: "75%" }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                            className="h-2 bg-[#14B8A6]/40 rounded-full"
                                        />
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: "50%" }}
                                            transition={{ duration: 1.5, delay: 0.7 }}
                                            className="h-2 bg-[#22D3EE]/40 rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="py-32 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14B8A6]/10 to-transparent -z-10" />

                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8 text-white">
                            Turn Any PDF Into <br />
                            <span className="text-[#22D3EE]">Instant Intelligence.</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                            Join the future of document processing. Fast, secure, and intelligent.
                        </p>
                        <Button asChild size="lg" className="h-16 rounded-full px-12 text-xl bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] text-black font-bold shadow-[0_0_50px_rgba(20,184,166,0.3)] hover:scale-105 transition-transform duration-300 border-0">
                            <Link href="/chat">
                                Start Now
                            </Link>
                        </Button>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-white/5 py-12 text-center text-sm text-gray-500 bg-[#0B0F14]">
                    <p>© {new Date().getFullYear()} PDF RAG System. Built with precision.</p>
                </footer>

            </main>
        </div>
    )
}

function FeatureCard({ icon, title, description, variant, delay }: { icon: React.ReactNode, title: string, description: string, variant?: 'glow', delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className={cn(
                "group relative rounded-2xl border border-white/5 bg-[#111827] p-10 transition-all hover:border-[#14B8A6]/30",
                variant === 'glow' && "shadow-[0_0_40px_-10px_rgba(34,211,238,0.1)] border-[#22D3EE]/20 hover:border-[#22D3EE]/50"
            )}
        >
            <div className={cn(
                "mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-all group-hover:bg-[#14B8A6]/10 group-hover:ring-[#14B8A6]/30",
                variant === 'glow' && "bg-gradient-to-br from-[#14B8A6] to-[#22D3EE] text-black ring-0 group-hover:bg-gradient-to-br"
            )}>
                {icon}
            </div>
            <h3 className="mb-4 text-xl font-bold text-white group-hover:text-[#14B8A6] transition-colors">
                {title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    )
}

function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-[#14B8A6]/10 hover:text-[#14B8A6] hover:border-[#14B8A6]/20 cursor-default">
            {children}
        </span>
    )
}

function Particles() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full opacity-20"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        y: [null, Math.random() * -100 + "%"],
                    }}
                    transition={{
                        duration: Math.random() * 20 + 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: Math.random() * 4 + 1 + "px",
                        height: Math.random() * 4 + 1 + "px",
                    }}
                />
            ))}
        </div>
    )
}
