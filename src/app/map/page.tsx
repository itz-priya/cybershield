"use client"
import { ThreatGlobe } from "@/components/dashboard/threat-globe"
import { CyberCard } from "@/components/ui/cyber-card"
import { Activity } from "lucide-react"

export default function GlobalMapPage() {
   return (
      <div className="space-y-6 pb-20 animate-in fade-in zoom-in duration-500 h-[calc(100vh-100px)] flex flex-col">
         <header className="flex items-center justify-between mb-4 pb-4 border-b border-surface-border shrink-0">
         <div className="flex items-center gap-3">
            <div className="w-2 h-10 bg-info rounded-sm shadow-[0_0_15px_rgba(0,240,255,0.6)]" />
            <div>
               <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-mono drop-shadow-md">Global Threat Map</h1>
               <p className="text-gray-400 text-sm mt-1">Real-time geographical attack vector visualization</p>
            </div>
         </div>
         <div className="bg-info/10 border border-info/40 text-info px-4 py-2 rounded font-mono text-sm tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Activity className="w-4 h-4 animate-pulse" />
            SATELLITE SYNC ACTIVE
         </div>
         </header>

         <div className="flex-1 w-full relative">
            <CyberCard className="h-full w-full p-0 overflow-hidden border-info/30">
               <ThreatGlobe />
            </CyberCard>
         </div>
      </div>
   )
}
