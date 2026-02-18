"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LandingHero() {
    const scrollToApp = () => {
        const appElement = document.getElementById("app-section")
        if (appElement) {
            appElement.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 pt-16 text-center md:pt-0">
            {/* Background Gradients */}
            <div className="absolute top-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background" />
            <div className="absolute -top-[20%] left-[20%] -z-10 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[100px]" />
            <div className="absolute -bottom-[20%] right-[20%] -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />

            <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div className="flex flex-col items-start text-left space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                        AI-Powered Analysis
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground"
                    >
                        PDF Intelligence <br />
                        <span className="text-primary italic">Reimagined.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="max-w-xl text-lg text-muted-foreground"
                    >
                        Upload your documents and let our advanced AI extract insights, summarize content, and answer your questions instantly.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex gap-4"
                    >
                        <Button size="lg" onClick={scrollToApp} className="group h-12 rounded-full px-8 text-base">
                            Start Using
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button size="lg" variant="ghost" className="h-12 rounded-full px-8 text-base">
                            Learn more
                        </Button>
                    </motion.div>
                </div>

                {/* 3D Cube Animation Container */}
                <div className="relative flex items-center justify-center perspective-[1000px]">
                    <Cube3D />
                </div>
            </div>
        </div>
    )
}

function Cube3D() {
    return (
        <div className="relative h-64 w-64 md:h-80 md:w-80">
            <motion.div
                className="relative h-full w-full preserve-3d"
                animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Faces */}
                <div className="absolute inset-0 border border-orange-500/30 bg-orange-500/5 backdrop-blur-sm [transform:translateZ(128px)]" /> {/* Front */}
                <div className="absolute inset-0 border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm [transform:rotateY(180deg)_translateZ(128px)]" /> {/* Back */}
                <div className="absolute inset-0 border border-blue-500/30 bg-blue-500/5 backdrop-blur-sm [transform:rotateY(90deg)_translateZ(128px)]" /> {/* Right */}
                <div className="absolute inset-0 border border-pink-500/30 bg-pink-500/5 backdrop-blur-sm [transform:rotateY(-90deg)_translateZ(128px)]" /> {/* Left */}
                <div className="absolute inset-0 border border-indigo-500/30 bg-indigo-500/5 backdrop-blur-sm [transform:rotateX(90deg)_translateZ(128px)]" /> {/* Top */}
                <div className="absolute inset-0 border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm [transform:rotateX(-90deg)_translateZ(128px)]" /> {/* Bottom */}

                {/* Inner Cube (Ghost) */}
                <div className="absolute inset-10 border border-white/10 bg-white/5 [transform:translateZ(60px)]" />
                <div className="absolute inset-10 border border-white/10 bg-white/5 [transform:rotateY(180deg)_translateZ(60px)]" />
            </motion.div>
            {/* Glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-orange-500/20 to-purple-500/20 blur-[60px]" />
        </div>
    )
}
