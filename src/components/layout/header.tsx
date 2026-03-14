"use client"
import { Bell, Search, Shield, User, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const router = useRouter()
  const [pulse, setPulse] = useState(false)

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="h-20 border-b border-surface-border bg-background/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex-1 max-w-xl">
        <div className="relative group glitch-hover cursor-text">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-info transition-colors drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
          <input 
            type="text" 
            placeholder="Search IPs, domains, hashes..." 
            className="w-full bg-surface border border-surface-border rounded-md pl-10 pr-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-info/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all placeholder:text-gray-600"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-info/10 border border-info/20 shadow-[0_0_10px_rgba(0,240,255,0.05)] animate-cyber-pulse">
          <Shield className="w-4 h-4 text-info" />
          <span className="text-info text-xs font-mono font-bold tracking-wider">JWT: VALID</span>
        </div>
        
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors glitch-hover">
          <Bell className="w-5 h-5" />
          <span className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-danger ${pulse ? 'animate-ping' : ''}`}></span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-surface-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center border border-surface-border">
              <User className="w-4 h-4 text-gray-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-200">Admin</span>
              <span className="text-xs text-gray-500 font-mono">SOC Analyst</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="ml-2 p-2 text-danger hover:bg-danger/10 hover:shadow-[0_0_10px_rgba(234,0,42,0.2)] rounded border border-transparent hover:border-danger/30 transition-all flex items-center justify-center"
            title="Disconnect Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
