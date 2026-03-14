"use client"
import React, { useEffect, useRef, useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import cytoscape from 'cytoscape'
import { Microscope, Search, Target, Network, Maximize } from 'lucide-react'
import { CyberCard } from '@/components/ui/cyber-card'

const elements = [
  // Nodes
  { data: { id: 'apt29', label: 'APT-29 (Cosy Bear)', group: 'Attacker' } },
  { data: { id: 'apt28', label: 'APT-28 (Fancy Bear)', group: 'Attacker' } },
  { data: { id: 'cve23', label: 'CVE-2023-38606', group: 'Exploit' } },
  { data: { id: 'cve21', label: 'Log4Shell', group: 'Exploit' } },
  { data: { id: 'forum1', label: '0xBreach Forum', group: 'Forum' } },
  { data: { id: 'target1', label: 'Finance Corp', group: 'Target' } },
  { data: { id: 'target2', label: 'Gov Agency CISA', group: 'Target' } },
  { data: { id: 'mal1', label: 'Pegasus', group: 'Malware' } },
  
  // Edges
  { data: { source: 'apt29', target: 'cve23', label: 'uses' } },
  { data: { source: 'apt28', target: 'cve21', label: 'uses' } },
  { data: { source: 'cve23', target: 'target1', label: 'exploits' } },
  { data: { source: 'cve21', target: 'target2', label: 'exploits' } },
  { data: { source: 'forum1', target: 'cve23', label: 'discusses' } },
  { data: { source: 'apt29', target: 'mal1', label: 'deploys' } },
  { data: { source: 'mal1', target: 'target1', label: 'infects' } },
];

const layout = {
  name: 'cose',
  animate: true,
  animationDuration: 1000,
  randomize: true,
  nodeDimensionsIncludeLabels: true,
  idealEdgeLength: 150,
  nodeOverlap: 20,
}

const stylesheet: cytoscape.StylesheetStyle[] = [
  {
    selector: 'node',
    style: {
      'background-color': '#1f2430',
      'label': 'data(label)',
      'color': '#fff',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'text-margin-y': 8,
      'font-family': 'monospace',
      'font-size': 12,
      'border-width': 2,
    }
  },
  {
    selector: 'node[group = "Attacker"]',
    style: { 'border-color': '#ff9f1c', 'shape': 'hexagon', 'background-color': 'rgba(255, 159, 28, 0.2)' }
  },
  {
    selector: 'node[group = "Exploit"]',
    style: { 'border-color': '#ea002a', 'shape': 'triangle', 'background-color': 'rgba(234, 0, 42, 0.2)' }
  },
  {
    selector: 'node[group = "Malware"]',
    style: { 'border-color': '#ea002a', 'shape': 'pentagon', 'background-color': 'rgba(234, 0, 42, 0.2)' }
  },
  {
    selector: 'node[group = "Target"]',
    style: { 'border-color': '#00f0ff', 'shape': 'round-rectangle', 'background-color': 'rgba(0, 240, 255, 0.2)' }
  },
  {
    selector: 'node[group = "Forum"]',
    style: { 'border-color': '#9333ea', 'shape': 'ellipse', 'background-color': 'rgba(147, 51, 234, 0.2)' }
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#3b4252',
      'target-arrow-color': '#3b4252',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'label': 'data(label)',
      'font-size': 10,
      'color': '#81a1c1',
      'text-background-opacity': 1,
      'text-background-color': '#05080f',
      'font-family': 'monospace',
      'text-rotation': 'autorotate'
    }
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': 4,
      'border-color': '#fff'
    }
  }
];

export default function CytoscapeGraphPage() {
  const [targetNode, setTargetNode] = useState<any>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  return (
    <div className="space-y-6 pb-20 animate-in fade-in zoom-in duration-500 h-[calc(100vh-100px)] flex flex-col">
      <header className="flex items-center justify-between mb-4 pb-4 border-b border-surface-border shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-10 bg-[#9333ea] rounded-sm shadow-[0_0_15px_rgba(147,51,234,0.6)]" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-mono drop-shadow-md">Threat Intelligence Graph</h1>
            <p className="text-gray-400 text-sm mt-1">Advanced entity relationship visualization</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
             <input type="text" placeholder="Search entity..." className="bg-surface border border-surface-border rounded-md pl-9 pr-4 py-2 text-sm text-gray-200 outline-none focus:border-[#9333ea]" />
          </div>
          <button 
             className="bg-surface-hover border border-surface-border px-4 py-2 rounded hover:bg-[#1a1f2e] transition-colors flex items-center gap-2 text-gray-300"
             onClick={() => cyRef.current?.layout(layout).run()}
          >
             <Maximize className="w-4 h-4" />
             Re-Layout
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
         <div className="lg:col-span-3 h-full shadow-xl relative rounded-md overflow-hidden border border-surface-border/50 bg-[#05080f]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.05)_0%,transparent_70%)] pointer-events-none z-0" />
            
            <CytoscapeComponent 
              elements={elements} 
              style={{ width: '100%', height: '100%' }} 
              stylesheet={stylesheet}
              layout={layout}
              cy={(cy) => {
                 cyRef.current = cy;
                 cy.on('tap', 'node', (evt) => {
                    const node = evt.target;
                    setTargetNode(node.data());
                 });
                 cy.on('tap', (evt) => {
                    if (evt.target === cy) {
                       setTargetNode(null);
                    }
                 })
              }}
              className="z-10"
            />

            {/* Legend */}
            <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur border border-surface-border p-3 rounded font-mono text-xs space-y-2 z-20">
               <div className="text-gray-400 mb-2 border-b border-surface-border pb-1">ENTITIES</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 border border-[#ff9f1c]" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}></div><span className="text-gray-300">Attacker</span></div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 border border-[#ea002a]" style={{clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"}}></div><span className="text-gray-300">Exploit</span></div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-[#9333ea]"></div><span className="text-gray-300">Forum</span></div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 border border-[#00f0ff] rounded-sm"></div><span className="text-gray-300">Target</span></div>
            </div>
         </div>

         {/* Right Sidebar Details Pane */}
         <div className="h-full">
            <CyberCard className="h-full w-full border-[#9333ea]/30">
              <div className="flex items-center gap-2 mb-4 border-b border-surface-border pb-4">
                <Target className="w-5 h-5 text-[#9333ea]" />
                <h2 className="text-sm font-bold text-gray-200 tracking-wider font-mono">NODE INSPECTOR</h2>
              </div>
              
              {targetNode ? (
                 <div className="space-y-4 font-mono animate-in slide-in-from-right-4 duration-300">
                    <div>
                       <div className="text-[10px] text-gray-500 mb-1">ENTITY ID</div>
                       <div className="text-sm bg-surface p-2 rounded border border-surface-border text-info">{targetNode.id}</div>
                    </div>
                    <div>
                       <div className="text-[10px] text-gray-500 mb-1">CLASSIFICATION</div>
                       <div className="text-sm font-bold">
                         <span className={`px-2 py-1 rounded border text-xs tracking-widest uppercase ${
                            targetNode.group === 'Attacker' ? 'text-[#ff9f1c] border-[#ff9f1c]/30 bg-[#ff9f1c]/10' :
                            targetNode.group === 'Exploit' || targetNode.group === 'Malware' ? 'text-[#ea002a] border-[#ea002a]/30 bg-[#ea002a]/10' :
                            targetNode.group === 'Forum' ? 'text-[#9333ea] border-[#9333ea]/30 bg-[#9333ea]/10' :
                            'text-[#00f0ff] border-[#00f0ff]/30 bg-[#00f0ff]/10'
                         }`}>{targetNode.group}</span>
                       </div>
                    </div>
                    <div>
                       <div className="text-[10px] text-gray-500 mb-1">NAME / LABEL</div>
                       <div className="text-base text-gray-200 bg-surface p-2 rounded border border-surface-border">{targetNode.label}</div>
                    </div>
                 </div>
              ) : (
                 <div className="h-40 flex flex-col items-center justify-center text-center text-gray-500 font-mono text-sm space-y-3">
                    <Network className="w-8 h-8 opacity-50" />
                    <p>Select a node on the<br/>graph to inspect properties.</p>
                 </div>
              )}
            </CyberCard>
         </div>
      </div>
    </div>
  )
}
