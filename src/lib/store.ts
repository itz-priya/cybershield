import { create } from 'zustand'
import { io, Socket } from 'socket.io-client'

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'

export interface ThreatAlert {
  id: string
  title: string
  description: string
  source: string
  risk: RiskLevel
  timestamp: string
}

export interface SystemLog {
  id: string
  component: string
  message: string
  status: 'info' | 'warning' | 'error'
  timestamp: string
}

interface ThreatStore {
  alerts: ThreatAlert[]
  logs: SystemLog[]
  connected: boolean
  socket: Socket | null
  initSocket: () => void
  disconnectSocket: () => void
  addAlert: (alert: Omit<ThreatAlert, 'id' | 'timestamp'>) => void
  addLog: (log: Omit<SystemLog, 'id' | 'timestamp'>) => void
  setConnectionStatus: (status: boolean) => void
  clearAlerts: () => void
}

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000'

export const useThreatStore = create<ThreatStore>((set, get) => ({
  alerts: [
    {
      id: 'mock-alert-1',
      title: 'Suspicious Login Attempt',
      description: 'Multiple failed logins from IP 185.39.11.23 to admin account.',
      source: 'Firewall',
      risk: 'HIGH',
      timestamp: new Date().toISOString()
    }
  ],
  logs: [
    {
      id: 'mock-log-1',
      component: 'AuthService',
      message: 'System initialization sequence complete.',
      status: 'info',
      timestamp: new Date().toISOString()
    }
  ],
  connected: false,
  socket: null,
  
  initSocket: () => {
    const { socket } = get()
    if (socket) return // Already initialized
    
    const newSocket = io(SOCKET_URL, {
        reconnectionDelayMax: 10000,
        transports: ['websocket', 'polling'] // Add polling fallback just in case
    })

    newSocket.on('connect', () => {
        set({ connected: true })
        get().addLog({ component: 'WSS', message: 'Connected to intelligence stream', status: 'info' })
    })

    newSocket.on('disconnect', () => {
        set({ connected: false })
        get().addLog({ component: 'WSS', message: 'Disconnected from intelligence stream', status: 'error' })
    })

    newSocket.on('new_alert', (alertData: any) => {
        get().addAlert({
            title: alertData.title || 'Unknown Threat',
            description: alertData.description || 'No description provided',
            source: alertData.source || 'Intel Node',
            risk: alertData.risk || 'MEDIUM'
        })
    })

    newSocket.on('system_log', (logData: any) => {
        get().addLog({
            component: logData.component || 'System',
            message: logData.message || '',
            status: logData.status || 'info'
        })
    })

    set({ socket: newSocket })
  },

  disconnectSocket: () => {
      const { socket } = get()
      if (socket) {
          socket.disconnect()
          set({ socket: null, connected: false })
      }
  },

  addAlert: (alert) => set((state) => {
    const newAlert: ThreatAlert = {
      ...alert,
      id: `alert-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString()
    }
    return {
      alerts: [newAlert, ...state.alerts].slice(0, 50) // Keep last 50
    }
  }),
  
  addLog: (log) => set((state) => {
    const newLog: SystemLog = {
      ...log,
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString()
    }
    return {
      logs: [newLog, ...state.logs].slice(0, 100) // Keep last 100
    }
  }),
  
  setConnectionStatus: (status) => set({ connected: status }),
  
  clearAlerts: () => set({ alerts: [] })
}))
