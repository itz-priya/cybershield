import { useEffect } from "react"
import { useThreatStore } from "@/lib/store"
import { CyberCard } from "@/components/ui/cyber-card"
import { Terminal, AlertTriangle, Wifi, WifiOff } from "lucide-react"
import Link from 'next/link'

interface FeedItem {
  id: string; // Updated to string since store uses string IDs
  forum: string;
  user: string;
  post: string;
  risk: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  time: string;
}

const initialFeed: FeedItem[] = [
  { id: "mock-ext-1", forum: "Shadow Market", user: "dark_admin", post: "Selling VPN access to xyzcorp.com", risk: "HIGH", time: "Just now" },
  { id: "mock-ext-2", forum: "0xBreach", user: "anon_htr", post: "Database dump of user credentials available.", risk: "CRITICAL", time: "2m ago" },
  { id: "mock-ext-3", forum: "Deep Web Forums", user: "sys_op", post: "Looking for zero-day exploit for IIS 10.", risk: "MEDIUM", time: "15m ago" },
]

const threatTemplates = [
  { forum: "RansomLeak", user: "lock_master", post: "New target acquired in financial sector.", risk: "CRITICAL" as const },
  { forum: "CarderParadise", user: "cc_seller", post: "Fresh batch of US dumps.", risk: "HIGH" as const },
  { forum: "SecTalk", user: "white_hat_gone_rogue", post: "Found RCE in popular npm package.", risk: "CRITICAL" as const },
  { forum: "DarkNetz", user: "h4ck3r_99", post: "AWS keys for sale.", risk: "HIGH" as const },
  { forum: "0xBreach", user: "anon_htr", post: "Discussing new phishing kit capabilities.", risk: "MEDIUM" as const },
]

export function DarkWebFeed() {
  const { connected, initSocket, disconnectSocket, alerts } = useThreatStore()

  useEffect(() => {
    initSocket()
    return () => {
      // Depending on the app logic, we might not want to disconnect on unmount 
      // if we want background alerts, but for this component demo we will keep it alive
      // globally, so we won't call disconnectSocket() here.
    }
  }, [initSocket])

  // Map the global alerts store to the feed format if they originate from the Dark Web.
  // We fall back to the initial mock feed if there are no live alerts yet to keep the UI looking good.
  const liveDarkWebAlerts = alerts
      .filter(a => a.source.includes('Dark') || a.source.includes('Intel'))
      .map(a => ({
          id: a.id,
          forum: a.source,
          user: 'Unknown Actor', // This would come from real metadata
          post: a.description,
          risk: a.risk,
          time: new Date(a.timestamp).toLocaleTimeString()
      }))

  const displayFeed = liveDarkWebAlerts.length > 0 ? liveDarkWebAlerts : initialFeed as any[]

  return (
    <CyberCard className="h-full flex flex-col relative overflow-hidden">
      {!connected && (
         <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
            <WifiOff className="w-8 h-8 text-danger mb-4 animate-pulse" />
            <span className="text-danger font-mono text-xs tracking-widest uppercase">Connecting to secure intercept feed...</span>
         </div>
      )}
      
      <div className="flex items-center gap-2 mb-6 border-b border-surface-border pb-4 z-10">
        <Terminal className="w-5 h-5 text-info" />
        <h2 className="text-sm font-bold text-gray-200 tracking-wider font-mono">DARK WEB INTERCEPTS</h2>
        
        <div className="ml-auto flex items-center gap-2">
           <span className="text-[10px] text-gray-500 font-mono tracking-widest">{connected ? 'WSS://CONNECTED' : 'OFFLINE'}</span>
           <span className="flex h-2 w-2 relative">
             {connected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>}
             <span className={`relative inline-flex rounded-full h-2 w-2 ${connected ? 'bg-danger' : 'bg-gray-600'}`}></span>
           </span>
        </div>
      </div>
      
      <div className="space-y-4 flex-1 overflow-y-auto pr-2 z-10 custom-scrollbar">
        {displayFeed.map((item, index) => (
          <Link 
            href={`/investigation?q=${encodeURIComponent(item.id)}`}
            key={item.id} 
            className={`block p-4 rounded-md bg-surface-hover border border-surface-border text-xs font-mono group transition-all duration-500 cursor-pointer hover:border-info/30 hover:bg-surface-hover/80
              ${index === 0 ? 'animate-in slide-in-from-left-4 fade-in duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] border-info/30' : ''}
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-info-dark font-bold">[{item.forum}]</span>
              <span className="text-gray-600">{item.time}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-500">User:</span>
              <span className="text-warning">{item.user}</span>
            </div>
            <p className="text-gray-300 bg-surface p-2 rounded border border-surface-border/50 mb-3 group-hover:border-info/30 transition-colors">
              "{item.post}"
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Risk Level:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest flex items-center gap-1 ${
                item.risk === 'CRITICAL' ? 'bg-danger/20 text-danger border border-danger/30' : 
                item.risk === 'HIGH' ? 'bg-warning/20 text-warning border border-warning/30' : 
                'bg-info/10 text-info border border-info/20'
              }`}>
                {item.risk === 'CRITICAL' && <AlertTriangle className="w-3 h-3" />}
                {item.risk}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </CyberCard>
  )
}
