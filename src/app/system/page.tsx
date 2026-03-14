"use client"
import React from 'react'
import { Activity, Server, Cpu, HardDrive, Network, TerminalSquare } from 'lucide-react'
import { CyberCard } from '@/components/ui/cyber-card'
import { useThreatStore } from '@/lib/store'

export default function SystemMonitorPage() {
   const { logs } = useThreatStore()

   return (
      <div className="space-y-6 pb-20 animate-in fade-in zoom-in duration-500 h-[calc(100vh-100px)] flex flex-col">
         <header className="flex items-center justify-between mb-4 pb-4 border-b border-surface-border shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-2 h-10 bg-success rounded-sm shadow-[0_0_15px_rgba(0,255,102,0.6)]" />
               <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-mono drop-shadow-md">System Monitor</h1>
                  <p className="text-gray-400 text-sm mt-1">Platform health, telemetry, and background job logs</p>
               </div>
            </div>
            
            <div className="flex items-center gap-4 bg-surface border border-surface-border px-4 py-2 rounded shadow-inner">
               <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-success animate-pulse" />
                  <span className="font-mono text-xs text-success tracking-widest">ALL SYSTEMS NOMINAL</span>
               </div>
            </div>
         </header>

         {/* Hardware Metrics Stubs */}
         {/* Scalability & Data Lifecycle Metrics */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
            <div className="bg-surface/50 border border-surface-border rounded-md p-4 flex items-center justify-between">
               <div className="space-y-1">
                  <div className="text-xs text-gray-500 font-mono tracking-widest uppercase">Duplicates Merged</div>
                  <div className="text-2xl font-mono text-gray-200">12.4<span className="text-sm text-info">k</span></div>
               </div>
               <Server className="w-8 h-8 text-surface-border" />
            </div>
            <div className="bg-surface/50 border border-surface-border rounded-md p-4 flex items-center justify-between">
               <div className="space-y-1">
                  <div className="text-xs text-gray-500 font-mono tracking-widest uppercase">Threat Clusters</div>
                  <div className="text-2xl font-mono text-gray-200">842<span className="text-sm text-warning ml-1 text-[10px]">+12/hr</span></div>
               </div>
               <Activity className="w-8 h-8 text-surface-border" />
            </div>
            <div className="bg-surface/50 border border-surface-border rounded-md p-4 flex items-center justify-between">
               <div className="space-y-1">
                  <div className="text-xs text-gray-500 font-mono tracking-widest uppercase">Data Archived</div>
                  <div className="text-2xl font-mono text-gray-200">4.1<span className="text-sm text-success"> TB</span></div>
               </div>
               <HardDrive className="w-8 h-8 text-surface-border" />
            </div>
            <div className="bg-surface/50 border border-surface-border rounded-md p-4 flex items-center justify-between">
               <div className="space-y-1">
                  <div className="text-xs text-gray-500 font-mono tracking-widest uppercase">Active Indicators</div>
                  <div className="text-2xl font-mono text-gray-200">2,891<span className="text-sm text-gray-500"> IoCs</span></div>
               </div>
               <Network className="w-8 h-8 text-surface-border" />
            </div>
         </div>

         {/* Telemetry Logs */}
         <div className="flex-1 w-full relative">
            <CyberCard className="h-full p-4 flex flex-col font-mono text-xs overflow-hidden border-success/20 shadow-[0_0_20px_rgba(0,255,102,0.02)] relative">
               <div className="absolute inset-0 bg-[#05080f] pointer-events-none z-0" />
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />
               
               <div className="flex items-center gap-2 mb-4 border-b border-surface-border/50 pb-2 relative z-10 text-gray-400">
                  <TerminalSquare className="w-4 h-4 text-success" />
                  <span className="tracking-widest uppercase font-bold text-gray-300">SYSTEM EVENT LOG</span>
               </div>
               
               <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar relative z-10">
                  {logs.map((log) => (
                     <div key={log.id} className="flex items-start gap-4 p-2 hover:bg-surface/80 rounded transition-colors group">
                        <div className="text-gray-600 shrink-0 w-40 flex items-center gap-2">
                           {'>'} {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                        <div className="w-32 shrink-0">
                           <span className={`px-2 py-0.5 rounded border tracking-widest ${
                              log.status === 'error' ? 'text-danger border-danger/30 bg-danger/10' :
                              log.status === 'warning' ? 'text-warning border-warning/30 bg-warning/10' :
                              'text-info border-info/30 bg-info/10'
                           }`}>
                              [{log.component}]
                           </span>
                        </div>
                        <div className={`flex-1 ${
                           log.status === 'error' ? 'text-danger' : 
                           log.status === 'warning' ? 'text-warning' : 
                           'text-gray-300'
                        }`}>
                           {log.message}
                        </div>
                     </div>
                  ))}
                  
                  {logs.length === 0 && (
                     <div className="text-gray-500 italic flex items-center gap-2">
                        <span className="w-2 h-4 bg-success animate-pulse inline-block"></span>
                        Awaiting telemetry...
                     </div>
                  )}
               </div>
            </CyberCard>
         </div>
      </div>
   )
}
