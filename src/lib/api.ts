"use client"
import axios from 'axios'
import useSWR from 'swr'

// Use localhost for development, can be configured via env
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000'

// Generic fetcher for SWR
export const fetcher = (url: string) => axios.get(`${API_BASE_URL}${url}`).then(res => res.data)

// Hook for Dashboard Stats
export function useDashboardStats() {
  const { data, error, isLoading } = useSWR('/stats', fetcher, { 
    refreshInterval: 5000, 
    fallbackData: {
      total_threats: 342,
      high_risk: 12,
      dark_web_mentions: 89,
      attack_probability: 72
    } 
  })
  
  return {
    stats: data,
    isLoading,
    isError: error
  }
}

// Hook for Threat Trends
export function useThreatTrends() {
  const { data, error, isLoading } = useSWR('/trends', fetcher, { 
    refreshInterval: 10000,
    // Add realistic fallback data for hackathon demo if backend is offline
    fallbackData: [
      { timestamp: '00:00', volume: 30, probability: 12 },
      { timestamp: '04:00', volume: 40, probability: 19 },
      { timestamp: '08:00', volume: 35, probability: 15 },
      { timestamp: '12:00', volume: 50, probability: 45 },
      { timestamp: '16:00', volume: 45, probability: 22 },
      { timestamp: '20:00', volume: 60, probability: 65 },
      { timestamp: '24:00', volume: 55, probability: 78 }
    ]
  })
  
  return {
    trends: data,
    isLoading,
    isError: error
  }
}

// Additional hook for Threat Predictions Breakdown
export function useThreatPredictions() {
    const { data, error, isLoading } = useSWR('/predictions', fetcher, {
        refreshInterval: 15000,
        fallbackData: {
            classifications: [
                { name: 'Credential Leak', value: 45 },
                { name: 'Ransomware', value: 25 },
                { name: 'Malware', value: 20 },
                { name: 'Phishing', value: 10 }
            ],
            totalActive: 124
        }
    })

    return {
        predictions: data,
        isLoading,
        isError: error
    }
}
