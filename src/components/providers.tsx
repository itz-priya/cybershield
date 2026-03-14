"use client"
import { useEffect } from "react"
import { useThreatStore } from "@/lib/store"

export function Providers({ children }: { children: React.ReactNode }) {
  const { initSocket, disconnectSocket } = useThreatStore()

  useEffect(() => {
    // Initialize the WebSocket connection globally on mount
    initSocket()

    return () => {
      // Disconnect when the global app unmounts
      disconnectSocket()
    }
  }, [initSocket, disconnectSocket])

  return <>{children}</>
}
