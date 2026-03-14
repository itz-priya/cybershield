"use client"
import { CyberCard } from "@/components/ui/cyber-card"
import { ShieldAlert, GlobeLock, UserX, ActivitySquare } from "lucide-react"

import { useDashboardStats } from "@/lib/api"

export function KpiStats() {
  const { stats, isLoading } = useDashboardStats()

  const displayStats = [
    { title: "Total Threats", value: stats?.total_threats || 0, trend: "+12%", icon: ActivitySquare, color: "text-warning" },
    { title: "High Risk Alerts", value: stats?.high_risk || 0, trend: "+2", icon: ShieldAlert, color: "text-danger" },
    { title: "Dark Web Mentions", value: stats?.dark_web_mentions || 0, trend: "+5", icon: GlobeLock, color: "text-info" },
    { title: "Attack Probability", value: `${stats?.attack_probability || 0}%`, trend: "+15%", icon: UserX, color: "text-danger" },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayStats.map((stat, i) => (
        <CyberCard key={i} variant={stat.color.includes("danger") ? "danger" : stat.color.includes("warning") ? "warning" : "default"}>
          <div className={`flex justify-between items-start ${isLoading ? 'opacity-50 blur-sm' : 'transition-opacity'}`}>
            <div className="space-y-2">
              <span className="text-gray-400 text-sm font-medium tracking-wide uppercase">{stat.title}</span>
              <div className="flex items-end gap-3">
                <span className={`text-4xl font-bold tracking-tighter shadow-sm font-mono ${stat.color}`}>
                  {stat.value}
                </span>
                <span className="text-xs text-danger mb-1 font-mono bg-danger/10 px-1 rounded">{stat.trend}</span>
              </div>
            </div>
            <div className={`p-3 rounded-md bg-surface border border-surface-border shadow-inner`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </CyberCard>
      ))}
    </div>
  )
}
