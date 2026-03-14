"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldAlert, Activity, Eye, FileSearch, ShieldCheck, Microscope, Network, Globe, ServerCrash } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Global Map", href: "/map", icon: Globe },
  { name: "Dark Web", href: "/darkweb", icon: Eye },
  { name: "Threat Graph", href: "/graph", icon: Network },
  { name: "Investigation", href: "/investigation", icon: Microscope },
  { name: "Alerts Center", href: "/alerts", icon: ShieldAlert },
  { name: "System Monitor", href: "/system", icon: ServerCrash },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r border-surface-border bg-surface/50 h-screen flex flex-col pt-6 z-10 relative">
      <div className="px-6 pb-8 flex items-center gap-3 relative group cursor-crosshair">
        <div className="absolute inset-0 bg-info/20 blur-[20px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <ShieldCheck className="w-8 h-8 text-info relative z-10 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] animate-radar-spin" />
        <span className="text-xl font-bold tracking-wider text-white relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] glitch-hover">CyberShield</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 group hover:translate-x-1 relative overflow-hidden glitch-hover",
                isActive 
                  ? "bg-info/10 text-info border border-info/30 shadow-[0_0_15px_rgba(0,240,255,0.15)] animate-cyber-pulse" 
                  : "text-gray-400 hover:text-white hover:bg-surface-hover border border-transparent hover:border-info/30"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-info shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
              )}
              <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive ? "text-info drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]" : "text-gray-500 group-hover:text-info")} />
              <span className="font-medium tracking-wide">{item.name}</span>
            </Link>
          )
        })}
      </nav>
      
      <div className="p-6 border-t border-surface-border">
        <div className="text-xs text-gray-500 font-mono tracking-wider flex items-center justify-between">
          <span>SYSTEM STATUS:</span>
          <span className="text-success animate-pulse relative pr-3">
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-success shadow-[0_0_5px_rgba(0,255,102,0.8)]"></span>
            ONLINE
          </span>
        </div>
      </div>
    </div>
  )
}
