"use client"
import { KpiStats } from "@/components/dashboard/kpi-stats"
import { ThreatPredictionChart } from "@/components/dashboard/threat-prediction-chart"
import { DarkWebFeed } from "@/components/dashboard/dark-web-feed"
import { RootCauseAnalysis } from "@/components/dashboard/root-cause-analysis"
import { LiveAlerts } from "@/components/dashboard/live-alerts"
import { ThreatGlobe } from "@/components/dashboard/threat-globe"
import { ThreatGraph } from "@/components/dashboard/threat-graph"
import { ShieldAlert } from "lucide-react"

export default function Dashboard() {
  return (
    <>
      <div className="space-y-6 pb-20 animate-in fade-in zoom-in duration-500">
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-surface-border">
          <div className="flex items-center gap-3">
            <div className="w-2 h-10 bg-info rounded-sm shadow-[0_0_15px_rgba(0,240,255,0.6)]" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-mono drop-shadow-md">SOC Threat Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">Global security posture and active intelligence feeds</p>
            </div>
          </div>
          <div className="bg-danger/10 border border-danger/40 text-danger px-5 py-2.5 rounded font-mono text-sm tracking-widest flex items-center gap-2 animate-pulse shadow-[0_0_20px_rgba(234,0,42,0.2)]">
            <ShieldAlert className="w-5 h-5" />
            DEFCON 3
          </div>
        </header>

        <KpiStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[400px]">
          <div className="lg:col-span-2 shadow-xl">
            <ThreatPredictionChart />
          </div>
          <div className="h-[400px] lg:h-full shadow-xl">
            <DarkWebFeed />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 shadow-xl">
            <RootCauseAnalysis />
          </div>
          
          <div className="h-[400px] lg:h-full shadow-xl">
            <ThreatGlobe />
          </div>
        </div>

        <div className="mt-6 shadow-xl h-[500px]">
          <ThreatGraph />
        </div>
      </div>
      <LiveAlerts />
    </>
  )
}
