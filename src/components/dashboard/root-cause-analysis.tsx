"use client"
import { CyberCard } from "@/components/ui/cyber-card"
import { ShieldCheck, Crosshair, Cpu, KeySquare } from "lucide-react"

export function RootCauseAnalysis() {
  return (
    <CyberCard className="h-full">
      <div className="flex items-center gap-2 mb-6 border-b border-surface-border pb-4">
        <Crosshair className="w-5 h-5 text-danger" />
        <h2 className="text-sm font-bold text-gray-200 tracking-wider font-mono">ROOT CAUSE & DEFENSE</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xs text-info-dark mb-2 font-mono flex items-center gap-2">
            <KeySquare className="w-4 h-4" /> THREAT TYPE
          </h3>
          <div className="bg-danger/10 border border-danger/20 text-danger p-3 rounded-md text-sm font-mono tracking-wide shadow-[0_0_10px_rgba(234,0,42,0.05)]">
            Credential Abuse (Brute Force / Stuffing)
          </div>
        </div>

        <div>
          <h3 className="text-xs text-warning mb-2 font-mono flex items-center gap-2 uppercase tracking-wide">
            <Cpu className="w-4 h-4" /> Root Cause Analysis
          </h3>
          <ul className="space-y-2 bg-surface-hover p-4 rounded-md border border-surface-border">
            {['Leaked employee password found on Dark Web', 'Weak authentication policy on legacy portal', 'Outdated VPN server without rate limiting'].map((cause, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-warning mt-0.5 opacity-70">►</span> 
                {cause}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs text-success mb-2 font-mono flex items-center gap-2 uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4" /> Recommended Defense
          </h3>
          <div className="space-y-2 flex-col sm:flex-row flex-wrap sm:space-y-0 gap-2">
            {[
              { text: 'Force password reset for compromised accounts', active: false },
              { text: 'Enable MFA across all external portals', active: true },
              { text: 'Patch VPN server vulnerabilities (CVE-2024-XXXX)', active: false },
            ].map((defense, i) => (
              <div key={i} className={`p-3 rounded-md border flex items-center justify-between transition-colors w-full ${
                defense.active 
                  ? 'bg-success/10 border-success/30 text-success' 
                  : 'bg-surface border-surface-border text-gray-400 hover:border-info/30 cursor-pointer'
              }`}>
                <span className="text-sm font-medium">{defense.text}</span>
                {defense.active ? (
                  <span className="text-[10px] font-mono px-2 py-1 bg-success/20 rounded text-success border border-success/30 font-bold tracking-wider">APPLIED</span>
                ) : (
                  <button className="text-[10px] font-mono px-2 py-1 bg-surface-hover hover:bg-info/20 hover:text-info hover:border-info/30 rounded border border-surface-border transition-colors tracking-wider">APPLY FIX</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </CyberCard>
  )
}
