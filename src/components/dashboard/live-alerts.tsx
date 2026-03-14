"use client"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, X } from "lucide-react"
import { useState, useEffect } from "react"

const mockAlerts = [
  { id: 1, message: "Credential leak detected on exploit.in", target: "company.com", type: "critical" },
  { id: 2, message: "Unusual outbound traffic spike", target: "10.0.0.45", type: "warning" },
]

export function LiveAlerts() {
  const [alerts, setAlerts] = useState<typeof mockAlerts>([])

  useEffect(() => {
    const t1 = setTimeout(() => {
      setAlerts([mockAlerts[0]])
    }, 2000)
    
    const t2 = setTimeout(() => {
      setAlerts(prev => [mockAlerts[1], ...prev])
    }, 6000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-80 pointer-events-none">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto relative overflow-hidden backdrop-blur-md p-4 rounded-md border shadow-2xl ${
              alert.type === 'critical' 
                ? 'bg-[#150505] border-danger/50 shadow-[0_0_20px_rgba(234,0,42,0.3)]' 
                : 'bg-[#1a1205] border-warning/50 shadow-[0_0_20px_rgba(255,159,28,0.2)]'
            }`}
          >
            {/* Background warning pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,1)_25%,rgba(255,255,255,1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,1)_75%,rgba(255,255,255,1)_100%)] bg-[length:20px_20px]" />
            
            <div className="relative flex items-start gap-3">
              <AlertCircle className={`w-5 h-5 shrink-0 ${alert.type === 'critical' ? 'text-danger' : 'text-warning'}`} />
              <div className="flex-1">
                <p className={`text-xs font-bold font-mono tracking-wider mb-1 ${alert.type === 'critical' ? 'text-danger' : 'text-warning'}`}>
                  NEW {alert.type.toUpperCase()} ALERT
                </p>
                <p className="text-sm text-gray-200 mb-1">{alert.message}</p>
                <p className="text-xs text-info font-mono">Target: {alert.target}</p>
              </div>
              <button 
                onClick={() => removeAlert(alert.id)}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Animated progress bar */}
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 10, ease: "linear" }}
              onAnimationComplete={() => removeAlert(alert.id)}
              className={`absolute bottom-0 left-0 h-[2px] ${alert.type === 'critical' ? 'bg-danger' : 'bg-warning'}`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
