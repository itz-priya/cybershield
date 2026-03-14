"use client"
import React, { useEffect, useState } from "react"
import { CyberCard } from "@/components/ui/cyber-card"
import { MapPin } from "lucide-react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

// A simple topojson URL
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json"

interface ThreatMarker {
  markerOffset: number
  name: string
  coordinates: [number, number]
  type: 'critical' | 'high' | 'medium'
}

const markers: ThreatMarker[] = [
  { markerOffset: -12, name: "New York", coordinates: [-74.006, 40.7128], type: "critical" },
  { markerOffset: -12, name: "London", coordinates: [-0.1276, 51.5072], type: "high" },
  { markerOffset: 18, name: "Tokyo", coordinates: [139.6917, 35.6895], type: "medium" },
  { markerOffset: 18, name: "Moscow", coordinates: [37.6173, 55.7558], type: "critical" },
  { markerOffset: -12, name: "Beijing", coordinates: [116.4074, 39.9042], type: "high" },
  { markerOffset: 18, name: "Sao Paulo", coordinates: [-46.6333, -23.5505], type: "high" },
  { markerOffset: -12, name: "Sydney", coordinates: [151.2093, -33.8688], type: "medium" },
  { markerOffset: -12, name: "Frankfurt", coordinates: [8.6821, 50.1109], type: "high" },
  { markerOffset: 18, name: "Singapore", coordinates: [103.8198, 1.3521], type: "critical" },
]

export function ThreatMap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <CyberCard className="h-full flex flex-col items-center justify-center min-h-[400px]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
        <div className="animate-pulse text-info font-mono text-sm tracking-widest flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          CALIBRATING SATELLITE LINK...
        </div>
      </CyberCard>
    )
  }

  return (
    <CyberCard className="h-full flex flex-col min-h-[400px]">
      <div className="flex items-center justify-between mb-4 border-b border-surface-border pb-4 z-10">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-danger animate-pulse drop-shadow-[0_0_8px_rgba(234,0,42,0.8)]" />
          <h2 className="text-sm font-bold text-gray-200 tracking-wider font-mono uppercase">Global Threat Heatmap</h2>
        </div>
        <div className="hidden sm:flex gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-danger shadow-[0_0_5px_rgba(234,0,42,0.8)]"></span>
            <span className="text-gray-400">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warning shadow-[0_0_5px_rgba(255,159,28,0.8)]"></span>
            <span className="text-gray-400">High</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-info shadow-[0_0_5px_rgba(0,240,255,0.8)]"></span>
            <span className="text-gray-400">Active</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full relative bg-[#030508] rounded-md overflow-hidden border border-surface-border/30 flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none opacity-[0.2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0" />
        {/* Scanning line animation */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-info/20 shadow-[0_0_15px_rgba(0,240,255,0.4)] z-0 animate-[scan_4s_ease-in-out_infinite] opacity-50" />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.03)_0%,transparent_70%)] z-0" />

        <div className="w-full h-full relative z-10 pb-4">
          <ComposableMap
            projectionConfig={{ scale: 140 }}
            width={800}
            height={400}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#0a0e17"
                    stroke="#1f2430"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#131b2c", outline: "none" },
                      pressed: { fill: "#1f2430", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset, type }) => (
              <Marker key={name} coordinates={coordinates}>
                {type === 'critical' ? (
                  <g>
                    <circle r={6} fill="#ea002a" className="animate-ping" opacity={0.4} />
                    <circle r={3} fill="#ea002a" />
                  </g>
                ) : type === 'high' ? (
                  <g>
                    <circle r={8} fill="#ff9f1c" className="animate-ping" opacity={0.2} style={{ animationDuration: '3s' }} />
                    <circle r={3} fill="#ff9f1c" opacity={0.8} />
                  </g>
                ) : (
                  <g>
                    <circle r={2} fill="#00f0ff" opacity={0.6} style={{ filter: "drop-shadow(0 0 5px rgba(0,240,255,0.8))" }} />
                  </g>
                )}
                
                <text
                  textAnchor="middle"
                  y={markerOffset}
                  style={{ fontFamily: "monospace", fill: "#5b6270", fontSize: "10px", fontWeight: "bold", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>
    </CyberCard>
  )
}
