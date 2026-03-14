"use client"
import React, { useEffect } from 'react'
import { Microscope, Search, AlertOctagon, Terminal, Activity, Wifi, WifiOff, GlobeLock } from 'lucide-react'
import { CyberCard } from '@/components/ui/cyber-card'
import { useThreatStore } from '@/lib/store'

interface FeedItem {
  id: number;
  forum: string;
  user: string;
  post: string;
  risk: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  time: string;
}

const threatTemplates = [
   { forum: "RansomLeak", user: "lock_master", post: "New target acquired in financial sector. Infrastructure mapping complete.", risk: "CRITICAL" as const },
   { forum: "CarderParadise", user: "cc_seller", post: "Fresh batch of EU dumps. Bypasses 3D secure.", risk: "HIGH" as const },
   { forum: "SecTalk", user: "white_hat_gone_rogue", post: "Found RCE in popular npm package v3.2.1. Writing PoC.", risk: "CRITICAL" as const },
   { forum: "DarkNetz", user: "h4ck3r_99", post: "AWS IAM keys for sale with AdministratorAccess.", risk: "HIGH" as const },
   { forum: "0xBreach", user: "anon_htr", post: "Discussing new evading endpoint detection techniques.", risk: "MEDIUM" as const },
   { forum: "Deep Web Forums", user: "sys_op", post: "Looking for zero-day exploit for Fortinet VPN.", risk: "MEDIUM" as const },
   { forum: "Shadow Market", user: "dark_admin", post: "Selling VPN credentials to Healthcare provider.", risk: "CRITICAL" as const },
 ]

export default function DarkWebMonitorPage() {
   const { connected, setConnectionStatus, addAlert, addLog } = useThreatStore()
   const [feed, setFeed] = React.useState<FeedItem[]>([])
   const [searchQuery, setSearchQuery] = React.useState('')

   // Simulated WebSocket Connection
   useEffect(() => {
      setConnectionStatus(false)
      const connectTimer = setTimeout(() => {
         setConnectionStatus(true)
         addLog({ component: 'WSS:DarkWeb', message: 'Established secure tunnel to TOR intelligence nodes.', status: 'info' })
      }, 1500)

      const interval = setInterval(() => {
         const randomTemplate = threatTemplates[Math.floor(Math.random() * threatTemplates.length)]
         const newItem: FeedItem = {
           id: Date.now(),
           forum: randomTemplate.forum,
           user: randomTemplate.user,
           post: randomTemplate.post,
           risk: randomTemplate.risk,
           time: "Just now"
         }
         
         setFeed(prev => {
            const updatedPrev = prev.map(item => {
               if (item.time === "Just now") return { ...item, time: "1m ago" }
               if (item.time === "1m ago") return { ...item, time: "2m ago" }
               if (item.time === "2m ago") return { ...item, time: "5m ago" }
               return item
            })
            return [newItem, ...updatedPrev].slice(0, 50)
         })

         // Push critical items to global alerts store
         if (newItem.risk === 'CRITICAL' || newItem.risk === 'HIGH') {
            addAlert({
               title: `Dark Web Intercept: ${newItem.forum}`,
               description: `User ${newItem.user} posted: "${newItem.post}"`,
               source: 'DarkWeb WSS Feed',
               risk: newItem.risk
            })
         }
      }, 5000) // WSS heartbeat every 5s

      return () => {
         clearTimeout(connectTimer)
         clearInterval(interval)
      }
   }, [setConnectionStatus, addAlert, addLog])

   const filteredFeed = feed.filter(f => 
       f.post.toLowerCase().includes(searchQuery.toLowerCase()) || 
       f.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
       f.forum.toLowerCase().includes(searchQuery.toLowerCase())
   );

   return (
      <div className="space-y-6 pb-20 animate-in fade-in zoom-in duration-500 h-[calc(100vh-100px)] flex flex-col">
         <header className="flex items-center justify-between mb-4 pb-4 border-b border-surface-border shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-2 h-10 bg-danger rounded-sm shadow-[0_0_15px_rgba(234,0,42,0.6)]" />
               <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-mono drop-shadow-md">Dark Web Monitor</h1>
                  <p className="text-gray-400 text-sm mt-1">Live streaming intelligence from deep/dark web sources</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               {!connected ? (
                  <div className="flex items-center gap-2 text-danger font-mono text-xs tracking-widest bg-danger/10 border border-danger/30 px-3 py-1.5 rounded">
                     <WifiOff className="w-4 h-4 animate-pulse" />
                     ESTABLISHING TUNNEL...
                  </div>
               ) : (
                  <div className="flex items-center gap-2 text-success font-mono text-xs tracking-widest bg-success/10 border border-success/30 px-3 py-1.5 rounded shadow-[0_0_15px_rgba(0,255,102,0.1)]">
                     <Wifi className="w-4 h-4 animate-pulse" />
                     WSS://TOR:SECURE
                  </div>
               )}
            </div>
         </header>

         <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
            {/* Filter Pane */}
            <div className="h-full flex flex-col gap-4">
               <CyberCard className="border-danger/20">
                  <div className="flex items-center gap-2 mb-4 border-b border-surface-border pb-2">
                     <Search className="w-5 h-5 text-gray-400" />
                     <h2 className="text-sm font-bold text-gray-200 tracking-wider font-mono">QUERY INTERCEPTS</h2>
                  </div>
                  <input 
                     type="text" 
                     placeholder="Search keywords, users..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full bg-[#0a0e17] border border-surface-border rounded px-3 py-2 text-sm text-gray-200 font-mono outline-none focus:border-danger/50 focus:ring-1 focus:ring-danger/30 mb-4"
                  />
                  <div className="text-xs text-gray-500 font-mono">
                     Match Count: <span className="text-info font-bold">{filteredFeed.length}</span>
                  </div>
               </CyberCard>
               
               <CyberCard className="flex-1 border-danger/20">
                  <div className="flex items-center gap-2 mb-4 border-b border-surface-border pb-2">
                     <Activity className="w-5 h-5 text-gray-400" />
                     <h2 className="text-sm font-bold text-gray-200 tracking-wider font-mono">SOURCE METRICS</h2>
                  </div>
                  <div className="space-y-4 font-mono text-xs">
                     <div className="flex justify-between items-center bg-surface p-2 rounded border border-surface-border">
                        <span className="text-gray-400">Total Intercepts (Session)</span>
                        <span className="text-info font-bold">{feed.length}</span>
                     </div>
                     <div className="flex justify-between items-center bg-surface p-2 rounded border border-surface-border">
                        <span className="text-gray-400">Critical Threats</span>
                        <span className="text-danger font-bold">{feed.filter(f => f.risk === 'CRITICAL').length}</span>
                     </div>
                     <div className="flex justify-between items-center bg-surface p-2 rounded border border-surface-border">
                        <span className="text-gray-400">High Risks</span>
                        <span className="text-warning font-bold">{feed.filter(f => f.risk === 'HIGH').length}</span>
                     </div>
                  </div>
               </CyberCard>
            </div>

            {/* Live Feed Stream */}
            <div className="lg:col-span-3 h-full overflow-hidden">
               <CyberCard className="h-full flex flex-col p-4 border-danger/30 shadow-[0_0_20px_rgba(234,0,42,0.05)]">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-surface-border/50">
                     <div className="flex items-center gap-2">
                       <Terminal className="w-5 h-5 text-gray-400" />
                       <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">LIVE DATA STREAM</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <GlobeLock className="w-4 h-4 text-info" />
                       <span className="text-[10px] text-info font-mono tracking-widest uppercase">Metadata & Behavioral Analysis Active</span>
                     </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                     {filteredFeed.map((item, index) => (
                        <div 
                           key={item.id}
                           className={`p-4 rounded bg-[#0a0e17] border font-mono group transition-all duration-500 relative overflow-hidden
                              ${index === 0 ? 'border-danger/50 shadow-[0_0_15px_rgba(234,0,42,0.2)] animate-in slide-in-from-top-2 fade-in' : 'border-surface-border'}
                           `}
                        >
                           {/* Scan line for new entries */}
                           {index === 0 && <div className="absolute inset-0 bg-danger/5 animate-[scan_2s_ease-in-out_infinite] z-0 pointer-events-none" />}
                           
                           <div className="relative z-10 flex gap-4">
                              <div className="shrink-0 pt-1">
                                 {item.risk === 'CRITICAL' && <AlertOctagon className="w-5 h-5 text-danger animate-pulse" />}
                                 {item.risk === 'HIGH' && <Activity className="w-5 h-5 text-warning" />}
                                 {item.risk === 'MEDIUM' && <Terminal className="w-5 h-5 text-info" />}
                                 {item.risk === 'LOW' && <Search className="w-5 h-5 text-gray-400" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                                    <div className="flex items-center gap-2 text-xs">
                                       <span className="bg-[#1a1f2e] text-[#9333ea] px-2 py-0.5 rounded font-bold border border-[#9333ea]/30">[{item.forum}]</span>
                                       <span className="text-gray-500">Actor:</span>
                                       <span className="text-gray-200">{item.user}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                       <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded border
                                          ${item.risk === 'CRITICAL' ? 'text-danger border-danger/30 bg-danger/10' :
                                            item.risk === 'HIGH' ? 'text-warning border-warning/30 bg-warning/10' :
                                            'text-info border-info/30 bg-info/10' }
                                       `}>{item.risk} RISK</span>
                                       <span className="text-xs text-gray-600">{item.time}</span>
                                    </div>
                                 </div>
                                 <p className="text-sm text-gray-300 bg-surface/80 p-3 rounded leading-relaxed border border-transparent group-hover:border-surface-border transition-colors">
                                    {item.post}
                                 </p>
                              </div>
                           </div>
                        </div>
                     ))}
                     
                     {filteredFeed.length === 0 && searchQuery && (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 font-mono text-sm">
                           <Search className="w-8 h-8 mb-4 opacity-50" />
                           <p>NO INTERCEPTS MATCHING QUERY</p>
                        </div>
                     )}
                     
                     {filteredFeed.length === 0 && !searchQuery && (
                        <div className="h-full flex flex-col items-center justify-center text-danger font-mono text-sm animate-pulse">
                           <GlobeLock className="w-8 h-8 mb-4 opacity-50" />
                           <p>DECRYPTING INCOMING PACKETS...</p>
                        </div>
                     )}
                  </div>
               </CyberCard>
            </div>
         </div>
      </div>
   )
}
