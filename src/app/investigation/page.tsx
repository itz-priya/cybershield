"use client"
import React, { useState, useEffect, Suspense } from 'react'
import { CyberCard } from '@/components/ui/cyber-card'
import { Microscope, Search, AlertOctagon, Terminal, Play, ShieldAlert, Cpu } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

function InvestigationContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [hasScanned, setHasScanned] = useState(false)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setQuery(q)
      // Auto-trigger scan
      setIsSearching(true)
      setTimeout(() => {
        setIsSearching(false)
        setHasScanned(true)
      }, 1500)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      setHasScanned(true)
    }, 1500)
  }

  return (
    <div className="space-y-6 pb-20 animate-in fade-in zoom-in duration-500">
      <header className="flex items-center justify-between mb-8 pb-4 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-2 h-10 bg-warning rounded-sm shadow-[0_0_15px_rgba(255,159,28,0.6)]" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-mono drop-shadow-md">Investigation Lab</h1>
            <p className="text-gray-400 text-sm mt-1">Deep analysis and forensic workspace for threat vectors.</p>
          </div>
        </div>
        <div className="bg-warning/10 border border-warning/40 text-warning px-5 py-2.5 rounded font-mono text-sm tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(255,159,28,0.2)]">
          <Microscope className="w-5 h-5" />
          FORENSICS
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Search & Indicators */}
        <div className="space-y-6">
          <CyberCard>
            <div className="flex items-center gap-2 mb-4 border-b border-surface-border pb-2">
              <Search className="w-5 h-5 text-info" />
              <h2 className="text-sm font-bold text-gray-200 tracking-wider font-mono">DYNAMIC IOC MATCHING</h2>
            </div>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter IP, Hash, Domain, or CVE..."
                className="flex-1 bg-[#0a0e17] border border-surface-border rounded px-3 py-2 text-sm text-gray-200 font-mono outline-none focus:border-info/50 focus:ring-1 focus:ring-info/30"
              />
              <button 
                type="submit"
                disabled={isSearching}
                className="bg-info hover:bg-info-dark text-[#050505] font-bold px-4 rounded font-mono text-sm transition-all disabled:opacity-50"
              >
                {isSearching ? <span className="animate-spin inline-block">↻</span> : 'SCAN'}
              </button>
            </form>
          </CyberCard>

          <CyberCard>
            <div className="flex items-center gap-2 mb-4 border-b border-surface-border pb-2">
              <AlertOctagon className="w-5 h-5 text-warning" />
              <h2 className="text-sm font-bold text-gray-200 tracking-wider font-mono">ACTIVE INDICATORS</h2>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-surface border border-surface-border rounded hover:border-danger/40 transition-colors cursor-pointer group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-danger font-bold">SHA256: e3b0c44298fc1c14...</span>
                  <span className="bg-danger/20 text-danger px-2 py-0.5 rounded">MALWARE</span>
                </div>
                <p className="text-gray-500">Associated with APT-29 payload delivery.</p>
              </div>
              <div className="p-3 bg-surface border border-surface-border rounded hover:border-warning/40 transition-colors cursor-pointer group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-warning font-bold">IP: 185.39.11.23</span>
                  <span className="bg-warning/20 text-warning px-2 py-0.5 rounded">C2 SERVER</span>
                </div>
                <p className="text-gray-500">Command and Control communication detected.</p>
              </div>
              <div className="p-3 bg-surface border border-surface-border rounded hover:border-info/40 transition-colors cursor-pointer group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-info font-bold">DOMAIN: secure-login.api.xyz</span>
                  <span className="bg-info/20 text-info px-2 py-0.5 rounded">PHISHING</span>
                </div>
                <p className="text-gray-500">Newly registered domain mimicking SSO portal.</p>
              </div>
            </div>
          </CyberCard>
        </div>

        {/* Right Column: AI Analysis Lab */}
        <div className="lg:col-span-2">
          <CyberCard className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 border-b border-surface-border pb-2">
              <Cpu className="w-5 h-5 text-info" />
              <h2 className="text-sm font-bold text-gray-200 tracking-wider font-mono">AI FORENSIC ANALYSIS</h2>
              <span className="ml-auto flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-info opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-info"></span>
              </span>
            </div>
            
            <div className="flex-1 bg-[#05080f] rounded border border-surface-border/50 p-4 font-mono text-sm overflow-hidden relative">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.02)_0%,transparent_70%)] pointer-events-none z-0" />
               
               {isSearching ? (
                 <div className="h-full flex flex-col items-center justify-center text-info animate-pulse">
                   <Terminal className="w-8 h-8 mb-4" />
                   <p className="tracking-widest">ANALYZING INDICATOR CROSS-REFERENCES...</p>
                 </div>
               ) : (
                 <div className="relative z-10 text-gray-300 space-y-4">
                   <div className="text-gray-500">{'/* ML Model Confidence: 94.2% */'}</div>
                   <div className="flex gap-2 items-start">
                     <span className="text-info mt-1">&gt;</span>
                     <p>Correlation found between the provided hash <span className="text-danger">e3b0c442</span> and an active ransomware campaign discussed on 0xBreach forum 24 hours ago.</p>
                   </div>
                   <div className="flex gap-2 items-start">
                     <span className="text-info mt-1">&gt;</span>
                     <p>Threat actors are attempting to exploit <span className="text-warning">CVE-2023-38606</span> (Privilege Escalation) to deploy the executable.</p>
                   </div>
                   <div className="flex gap-2 items-start">
                     <span className="text-info mt-1">&gt;</span>
                     <div>
                       <p className="mb-2">Recommended Mitigation Policies:</p>
                       <ul className="list-disc list-inside text-gray-400 ml-2 space-y-1 text-xs">
                         <li>Block outbound C2 traffic to AS-4433.</li>
                         <li>Force patch deployment for MS-Windows via MDM.</li>
                         <li>Revoke sessions for 3 potentially compromised service accounts.</li>
                       </ul>
                     </div>
                   </div>
                 </div>
               )}
            </div>
            
            <div className="mt-4 flex gap-3">
              <button className="flex-1 bg-surface-hover border border-info/30 hover:bg-info/10 hover:border-info text-info font-bold px-4 py-3 rounded font-mono text-xs transition-all flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                EXECUTE PLAYBOOK
              </button>
              <button className="flex-1 bg-surface-hover border border-danger/30 hover:bg-danger/10 hover:border-danger text-danger font-bold px-4 py-3 rounded font-mono text-xs transition-all flex items-center justify-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                ISOLATE HOSTS
              </button>
            </div>
          </CyberCard>
        </div>

      </div>
    </div>
  )
}

export default function InvestigationLab() {
  return (
    <Suspense fallback={<div className="text-info font-mono animate-pulse">LOADING FORENSIC LAB...</div>}>
      <InvestigationContent />
    </Suspense>
  )
}
