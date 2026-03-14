"use client"
import React, { useCallback, useState } from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  BackgroundVariant
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { CyberCard } from "@/components/ui/cyber-card"
import { Network, Search } from "lucide-react"

const initialNodes: Node[] = [
  {
    id: 'attacker-1',
    type: 'default',
    data: { label: 'APT-29 (Cosy Bear)' },
    position: { x: 250, y: 50 },
    style: { background: '#1a1f2e', color: '#ff9f1c', border: '1px solid #ff9f1c', borderRadius: '4px', fontFamily: 'monospace', padding: '10px' },
  },
  {
    id: 'vuln-1',
    data: { label: 'CVE-2023-38606' },
    position: { x: 100, y: 150 },
    style: { background: '#1a1f2e', color: '#ea002a', border: '1px solid #ea002a', borderRadius: '4px', fontFamily: 'monospace', padding: '10px' },
  },
  {
    id: 'malware-1',
    data: { label: 'Pegasus Spyware' },
    position: { x: 400, y: 150 },
    style: { background: '#1a1f2e', color: '#ea002a', border: '1px solid #ea002a', borderRadius: '4px', fontFamily: 'monospace', padding: '10px' },
  },
  {
    id: 'target-1',
    data: { label: 'Global Finance Corp' },
    position: { x: 250, y: 250 },
    style: { background: '#1a1f2e', color: '#00f0ff', border: '1px solid #00f0ff', borderRadius: '4px', fontFamily: 'monospace', padding: '10px' },
  },
  {
    id: 'forum-1',
    data: { label: '0xBreach Forum' },
    position: { x: 50, y: 250 },
    style: { background: '#1a1f2e', color: '#9333ea', border: '1px solid #9333ea', borderRadius: '4px', fontFamily: 'monospace', padding: '10px' },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'attacker-1', target: 'vuln-1', animated: true, style: { stroke: '#ff9f1c' } },
  { id: 'e1-3', source: 'attacker-1', target: 'malware-1', animated: true, style: { stroke: '#ff9f1c' } },
  { id: 'e2-4', source: 'vuln-1', target: 'target-1', style: { stroke: '#ea002a' } },
  { id: 'e3-4', source: 'malware-1', target: 'target-1', style: { stroke: '#ea002a' } },
  { id: 'e5-2', source: 'forum-1', target: 'vuln-1', animated: true, style: { stroke: '#9333ea', strokeDasharray: '5,5' } },
]

export function ThreatGraph() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )

  return (
    <CyberCard className="h-full flex flex-col relative min-h-[500px]">
      <div className="flex items-center justify-between mb-4 border-b border-surface-border pb-4 z-10">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-info" />
          <h2 className="text-sm font-bold text-gray-200 tracking-wider font-mono">THREAT INTELLIGENCE GRAPH</h2>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-2 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search nodes..." 
            className="bg-[#0a0e17] border border-surface-border rounded pl-8 pr-3 py-1 text-xs text-gray-200 font-mono outline-none focus:border-info/50"
          />
        </div>
      </div>
      
      <div className="flex-1 w-full bg-[#05080f] rounded border border-surface-border/50 relative overflow-hidden" style={{ minHeight: '400px' }}>
        {/* Subtle glowing background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />
        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          className="z-10 bg-transparent"
        >
          <Background 
            color="#1f2433" 
            gap={16} 
            size={1} 
            variant={BackgroundVariant.Dots} 
          />
          <Controls 
            className="bg-surface border border-surface-border fill-gray-400" 
            showInteractive={false} 
          />
        </ReactFlow>

        {/* Legend Overlay */}
        <div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur border border-surface-border p-3 rounded font-mono text-[10px] space-y-2 z-20 shadow-xl">
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-[#1a1f2e] border border-[#ff9f1c] rounded-sm"></div>
             <span className="text-gray-400">Threat Actor</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-[#1a1f2e] border border-[#ea002a] rounded-sm"></div>
             <span className="text-gray-400">Vulnerability / Malware</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-[#1a1f2e] border border-[#00f0ff] rounded-sm"></div>
             <span className="text-gray-400">Target</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-[#1a1f2e] border border-[#9333ea] rounded-sm"></div>
             <span className="text-gray-400">Intelligence Source</span>
           </div>
        </div>
      </div>
    </CyberCard>
  )
}
