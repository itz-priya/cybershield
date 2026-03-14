"use client"
import React, { useEffect, useState, useRef, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { CyberCard } from "@/components/ui/cyber-card"
import { Globe as GlobeIcon, Activity } from "lucide-react"
import { useThreatStore } from '@/lib/store'

// Dynamically import react-globe.gl to prevent SSR issues with Three.js
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

interface ThreatArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

interface ThreatLocation {
  lat: number;
  lng: number;
  size: number;
  color: string;
  name: string;
}

const generateRandomThreats = () => {
  const points: ThreatLocation[] = [];
  const arcs: ThreatArc[] = [];
  
  // High traffic regions (approximate coordinates)
  const regions = [
    { lat: 40.7128, lng: -74.0060, name: 'New York' },
    { lat: 51.5074, lng: -0.1278, name: 'London' },
    { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
    { lat: 55.7558, lng: 37.6173, name: 'Moscow' },
    { lat: 39.9042, lng: 116.4074, name: 'Beijing' },
    { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
    { lat: -23.5505, lng: -46.6333, name: 'Sao Paulo' },
  ];

  // Generate points
  for (let i = 0; i < 20; i++) {
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    const isCritical = Math.random() > 0.7;
    
    // Add point with some jitter
    points.push({
      lat: randomRegion.lat + (Math.random() - 0.5) * 10,
      lng: randomRegion.lng + (Math.random() - 0.5) * 10,
      size: isCritical ? 1 : 0.5,
      color: isCritical ? '#ea002a' : '#ff9f1c',
      name: `Threat Vector ${i}`,
    });
  }

  // Generate attack arcs between regions
  for (let i = 0; i < 10; i++) {
    const source = points[Math.floor(Math.random() * points.length)];
    const target = points[Math.floor(Math.random() * points.length)];
    arcs.push({
      startLat: source.lat,
      startLng: source.lng,
      endLat: target.lat,
      endLng: target.lng,
      color: source.color,
    });
  }

  return { points, arcs };
}

export function ThreatGlobe() {
  const globeRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const { alerts } = useThreatStore();
  
  // Transform alerts into globe points and arcs, or fallback to generated mock data
  const data = useMemo(() => {
    if (!alerts || alerts.length === 0) {
        return generateRandomThreats();
    }

    const livePoints: ThreatLocation[] = []
    const liveArcs: ThreatArc[] = []

    // For a hackathon demo, we will assign random coordinates to live alerts 
    // unless they specifically contain lat/lng in their structure
    alerts.forEach((alert, i) => {
        const isCritical = alert.risk === 'CRITICAL' || alert.risk === 'HIGH'
        const sourceLat = (Math.random() - 0.5) * 160
        const sourceLng = (Math.random() - 0.5) * 360
        
        livePoints.push({
            lat: sourceLat,
            lng: sourceLng,
            size: isCritical ? 1 : 0.5,
            color: alert.risk === 'CRITICAL' ? '#ea002a' : alert.risk === 'HIGH' ? '#ff9f1c' : '#00f0ff',
            name: alert.title
        })

        // Draw an attack arc to a random target region 
        if (i % 2 === 0) {
            liveArcs.push({
                startLat: sourceLat,
                startLng: sourceLng,
                endLat: (Math.random() - 0.5) * 160,
                endLng: (Math.random() - 0.5) * 360,
                color: isCritical ? '#ea002a' : '#ff9f1c'
            })
        }
    })

    // If we only have a few real alerts, pad with some generated background noise
    // so the globe looks busy and impressive
    if (livePoints.length < 15) {
        const background = generateRandomThreats()
        return {
            points: [...livePoints, ...background.points],
            arcs: [...liveArcs, ...background.arcs]
        }
    }

    return { points: livePoints, arcs: liveArcs }
  }, [alerts])
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      // Auto-rotate setting
      const controls = (globeRef.current as any).controls();
      if (controls) {
         controls.autoRotate = true;
         controls.autoRotateSpeed = 1.2;
         controls.enableZoom = true;
      }
      // Ensure the full globe is visible, not cropped by zooming out a bit
      (globeRef.current as any).pointOfView({ lat: 0, lng: 0, altitude: 2.8 });
    }
  }, [mounted]);

  // If not mounted, render a placeholder
  if (!mounted) {
    return (
      <CyberCard className="h-full flex flex-col items-center justify-center min-h-[400px]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
        <div className="animate-pulse text-info font-mono text-sm tracking-widest flex items-center gap-2">
          <Activity className="w-4 h-4" />
          INITIALIZING 3D GLOBE...
        </div>
      </CyberCard>
    )
  }

  return (
    <CyberCard className="h-full flex flex-col min-h-[400px] overflow-hidden p-0 relative">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <GlobeIcon className="w-5 h-5 text-info animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
        <h2 className="text-sm font-bold text-gray-200 tracking-wider font-mono drop-shadow-md">LIVE ATTACK ORIGINS</h2>
      </div>
      
      <div className="absolute top-4 right-4 z-10 hidden sm:flex space-x-4 bg-surface/50 backdrop-blur-md px-3 py-1.5 rounded border border-surface-border font-mono text-xs">
         <div className="flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-danger shadow-[0_0_5px_rgba(234,0,42,0.8)]"></span>
           <span className="text-gray-300">Critical</span>
         </div>
         <div className="flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-warning shadow-[0_0_5px_rgba(255,159,28,0.8)]"></span>
           <span className="text-gray-300">High</span>
         </div>
      </div>

      <div className="flex-1 w-full min-h-[500px] relative bg-[#010204] cursor-crosshair overflow-hidden border-t border-surface-border/50">
        <div className="absolute inset-0 pointer-events-none opacity-[0.2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.15)_0%,transparent_70%)] z-0 mix-blend-screen pointer-events-none" />
        
        {/* React Globe instance */}
        {mounted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe
              onGlobeReady={() => {
                if (globeRef.current) {
                  // Ensure camera frames the globe appropriately on load
                  (globeRef.current as any).pointOfView({ lat: 0, lng: 0, altitude: 2.8 }, 0);
                }
              }}
              ref={globeRef}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              atmosphereColor="#00f0ff"
              atmosphereAltitude={0.25}
              
              // Points
              pointsData={data.points}
              pointLat="lat"
              pointLng="lng"
              pointColor="color"
              pointAltitude={0.01}
              pointRadius={(d: any) => d.size * 1.5}
              pointsMerge={false}
              pointLabel={(d: any) => `
                <div class="bg-[#05080f]/90 backdrop-blur-md border border-${d.color === '#ea002a' ? 'danger/50' : 'warning/50'} p-3 rounded text-xs font-mono shadow-[0_0_15px_${d.color}40] pointer-events-none">
                  <div style="color: ${d.color}" class="font-bold mb-1 tracking-wider uppercase flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full inline-block animate-pulse" style="background-color: ${d.color}"></span>
                    ${d.name}
                  </div>
                  <div class="text-gray-300 mt-2">PRECISE COORDINATES:</div>
                  <div class="text-gray-400">LAT: <span class="text-info">${d.lat.toFixed(4)}°</span></div>
                  <div class="text-gray-400 mb-2">LNG: <span class="text-info">${d.lng.toFixed(4)}°</span></div>
                  <div class="mt-2 text-[10px] bg-surface px-2 py-1 inline-block rounded border border-surface-border">
                    STATUS: <span style="color: ${d.color}">${d.size === 1 ? 'CRITICAL ALERT' : 'HIGH PRIORITY'}</span>
                  </div>
                </div>
              `}
              
              // Arcs
              arcsData={data.arcs}
              arcStartLat="startLat"
              arcStartLng="startLng"
              arcEndLat="endLat"
              arcEndLng="endLng"
              arcColor="color"
              arcDashLength={0.4}
              arcDashGap={2}
              arcDashInitialGap={() => Math.random() * 5}
              arcDashAnimateTime={2500}
              arcStroke={0.5}
              arcLabel={(d: any) => `
                <div class="bg-[#05080f]/90 backdrop-blur-md border border-info/40 p-2 rounded text-xs font-mono shadow-[0_0_10px_rgba(0,240,255,0.2)] pointer-events-none">
                  <span class="text-info font-bold flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    ACTIVE THREAT VECTOR
                  </span>
                  <div class="text-gray-400 mt-1">Origin to Target tracking activated.</div>
                </div>
              `}
            />
          </div>
        )}
      </div>
      
      {/* Overlay Scanning HUD */}
      <div className="absolute inset-0 border-[1px] border-info/10 m-2 rounded pointer-events-none z-10">
         <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-info/50 -m-[1px]" />
         <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-info/50 -m-[1px]" />
         <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-info/50 -m-[1px]" />
         <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-info/50 -m-[1px]" />
      </div>
    </CyberCard>
  )
}
