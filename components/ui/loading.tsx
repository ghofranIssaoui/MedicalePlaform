"use client"

import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-10">
                {/* Logo and spinner */}
                <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl animate-pulse" />
                <div className="bg-card/50 backdrop-blur-sm rounded-full p-6 relative">
                    <Loader2 className="h-14 w-14 text-black animate-spin" strokeWidth={3} />
                </div>
                </div>
            </div>
        </div>
    )
}
