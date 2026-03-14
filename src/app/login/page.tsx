"use client"
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ShieldAlert, LogIn, Lock, User, Activity } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      })

      if (res.ok) {
        router.push("/")
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.message || "Invalid credentials")
      }
    } catch (err) {
      setError("Network or server error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden font-mono selection:bg-info/30 selection:text-info">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Background Animated Grid */}
      <div className="absolute inset-0 flex space-x-4 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,240,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-md p-8 border border-surface-border bg-surface/50 backdrop-blur-xl rounded shadow-2xl overflow-hidden group">
        
        <div className="absolute top-0 left-0 w-full h-[2px] bg-info/40 shadow-[0_0_15px_rgba(0,240,255,0.8)] z-0 rounded-t-full hidden group-hover:block animate-[scan_3s_ease-in-out_infinite]" />

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-surface-hover rounded flex items-center justify-center border border-info/30 mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <ShieldAlert className="w-8 h-8 text-info" />
          </div>
          <h1 className="text-2xl font-bold text-gray-100 tracking-widest uppercase mb-1 drop-shadow-md">CYBERSHIELD SOC</h1>
          <p className="text-xs text-gray-500 tracking-widest uppercase">Authorized Personnel Only</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-danger/10 border border-danger/40 rounded flex items-center gap-3 animate-in fade-in zoom-in">
            <Activity className="w-5 h-5 text-danger animate-pulse" />
            <p className="text-xs text-danger uppercase tracking-wider">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2 relative">
             <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Username / Clearance ID</label>
             <div className="relative">
               <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
               <input
                 type="text"
                 required
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 className="w-full bg-[#0a0e17] border border-surface-border rounded pl-10 pr-4 py-3 text-sm text-gray-200 placeholder:text-gray-700 outline-none focus:border-info/50 focus:ring-1 focus:ring-info/30 transition-all"
                 placeholder="admin"
               />
             </div>
          </div>

          <div className="space-y-2 relative">
             <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Passphrase / Encryption Key</label>
             <div className="relative">
               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
               <input
                 type="password"
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full bg-[#0a0e17] border border-surface-border rounded pl-10 pr-4 py-3 text-sm text-gray-200 placeholder:text-gray-700 outline-none focus:border-info/50 focus:ring-1 focus:ring-info/30 transition-all"
                 placeholder="••••••••"
               />
             </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-info border border-info-light hover:bg-info-dark text-[#050505] font-bold py-3 px-4 rounded transition-all duration-300 flex items-center justify-center gap-2 tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#050505] border-t-transparent rounded-full animate-spin"></div>
                <span>AUTHENTICATING...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>INITIATE UPLINK</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-surface-border/50 text-center">
            <p className="text-[9px] text-gray-600 uppercase tracking-widest leading-relaxed">
              Connection encrypted via 2048-bit RSA.<br/>
              Unauthorized access strictly prohibited.
            </p>
        </div>
      </div>
    </div>
  )
}
