"use client"
import React from 'react'
import { AlertOctagon, ShieldAlert, CheckCircle, Clock, Trash2, Shield } from 'lucide-react'
import { CyberCard } from '@/components/ui/cyber-card'
import { useThreatStore } from '@/lib/store'

export default function AlertsCenterPage() {
   const { alerts, clearAlerts } = useThreatStore()

   const criticalCount = alerts.filter(a => a.risk === 'CRITICAL').length
   const highCount = alerts.filter(a => a.risk === 'HIGH').length

   const formatTime = (isoString: string) => {
      const date = new Date(isoString);
      return date.toLocaleTimeString('en-US', { hour12: false }) + ' CST';
   }

   return (
      <div className="space-y-6 pb-20 animate-in fade-in zoom-in duration-500 h-[calc(100vh-100px)] flex flex-col">
         <header className="flex items-center justify-between mb-4 pb-4 border-b border-surface-border shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-2 h-10 bg-danger rounded-sm shadow-[0_0_15px_rgba(234,0,42,0.6)]" />
               <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-mono drop-shadow-md">Alerts Center</h1>
                  <p className="text-gray-400 text-sm mt-1">Centralized repository for global threat alerts & notifications</p>
               </div>
            </div>
            
            <div className="flex gap-4">
               <div className="flex bg-surface border border-surface-border rounded overflow-hidden">
                  <div className="px-3 py-2 flex items-center gap-2 border-r border-surface-border bg-danger/10 text-danger font-mono text-sm tracking-widest">
                     <AlertOctagon className="w-4 h-4" />
                     {criticalCount} CRITICAL
                  </div>
                  <div className="px-3 py-2 flex items-center gap-2 bg-warning/10 text-warning font-mono text-sm tracking-widest">
                     <ShieldAlert className="w-4 h-4" />
                     {highCount} HIGH
                  </div>
               </div>
               <button 
                  onClick={clearAlerts}
                  className="bg-surface-hover hover:bg-danger/20 border border-surface-border hover:border-danger/50 text-gray-400 hover:text-danger px-4 py-2 rounded transition-colors flex items-center gap-2"
               >
                  <Trash2 className="w-4 h-4" />
                  <span className="font-mono text-sm">Dismiss All</span>
               </button>
            </div>
         </header>

         <div className="flex-1 overflow-hidden relative">
            <CyberCard className="h-full p-0 flex flex-col border-danger/20 overflow-hidden">
               <div className="flex items-center gap-4 bg-[#0a0e17] px-6 py-3 border-b border-surface-border font-mono text-xs text-gray-400 tracking-widest uppercase sticky top-0 z-10">
                  <div className="w-8">STS</div>
                  <div className="w-32">TimeStamp</div>
                  <div className="w-24">Risk Level</div>
                  <div className="w-40">Source</div>
                  <div className="flex-1">Alert Details</div>
                  <div className="w-24 text-right">Action</div>
               </div>
               
               <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {alerts.length === 0 ? (
                     <div className="h-full flex flex-col items-center justify-center text-gray-500 font-mono space-y-4">
                        <CheckCircle className="w-12 h-12 text-success opacity-50" />
                        <p className="text-lg tracking-widest text-success uppercase shadow-[0_0_15px_rgba(0,255,102,0.2)]">Zero Active Threats Detected</p>
                        <p className="text-xs">All intelligence feeds report nominal status.</p>
                     </div>
                  ) : (
                     <div className="divide-y divide-surface-border/50">
                        {alerts.map((alert, i) => (
                           <div key={alert.id} className={`flex items-start gap-4 px-6 py-4 hover:bg-surface-hover/50 transition-colors font-mono text-sm group ${i === 0 ? 'bg-danger/5 animate-pulse' : ''}`}>
                              <div className="w-8 pt-1">
                                 {alert.risk === 'CRITICAL' ? <AlertOctagon className="w-5 h-5 text-danger" /> : <ShieldAlert className="w-5 h-5 text-warning" />}
                              </div>
                              <div className="w-32 flex items-center gap-2 text-gray-500 pt-1">
                                 <Clock className="w-3 h-3" />
                                 {formatTime(alert.timestamp)}
                              </div>
                              <div className="w-24 pt-1">
                                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest border ${
                                    alert.risk === 'CRITICAL' ? 'bg-danger/20 text-danger border-danger/30' : 'bg-warning/20 text-warning border-warning/30'
                                 }`}>
                                    {alert.risk}
                                 </span>
                              </div>
                              <div className="w-40 text-info pt-1 truncate pr-4" title={alert.source}>
                                 {alert.source}
                              </div>
                              <div className="flex-1">
                                 <h3 className="text-gray-200 font-bold tracking-wide mb-1">{alert.title}</h3>
                                 <p className="text-gray-400 text-xs leading-relaxed">{alert.description}</p>
                              </div>
                              <div className="w-24 text-right pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="text-xs text-info hover:text-white border border-info/30 hover:bg-info/20 px-3 py-1 rounded transition-colors flex items-center gap-2 ml-auto">
                                    <Shield className="w-3 h-3" />
                                    Investigate
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </CyberCard>
         </div>
      </div>
   )
}
