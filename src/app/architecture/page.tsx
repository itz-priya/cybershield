"use client"
import React from 'react'
import { Server, Database, Lock, Shield, ArrowRight, BookOpen, Layers } from 'lucide-react'
import { CyberCard } from '@/components/ui/cyber-card'

const qna = [
  {
    icon: <Database className="w-5 h-5 text-info" />,
    color: "info",
    question: "Attacks keep evolving. How does your system handle new patterns?",
    answer: "Our system does not rely on fixed attack patterns. Instead, it stores Indicators of Compromise such as suspicious domains, file hashes, and keywords. When new data is scraped from the dark web, the system compares it with existing indicators and updates the database dynamically. This allows the system to adapt to evolving cyber threats instead of relying on static signatures."
  },
  {
    icon: <Layers className="w-5 h-5 text-warning" />,
    color: "warning",
    question: "Your system keeps collecting data. How do you maintain scalability?",
    answer: "The system does not store raw attack data. Instead, it extracts threat indicators and behavioral features. Duplicate indicators are merged, and similar attacks are grouped using clustering. Older or low-relevance data is archived or removed through lifecycle management. This keeps the database scalable while still preserving meaningful threat intelligence."
  },
  {
    icon: <Lock className="w-5 h-5 text-[#9333ea]" />,
    color: "[#9333ea]",
    question: "All threats come in an encrypted form. How will you decrypt that?",
    answer: "Even if the communication is encrypted, the system does not rely on decrypting the content. Instead, it analyzes metadata, behavioral patterns, and known threat indicators to identify suspicious activity."
  },
  {
    icon: <Shield className="w-5 h-5 text-success" />,
    color: "success",
    question: "Your system detected a malware threat. Does it only predict it, or prevent it?",
    answer: "Our system generates a mitigation report providing recommended security actions like isolating systems, blocking suspicious IPs, and updating rules to prevent or reduce impact. We focus on early warning and response guidance rather than permanent autonomous fixes, as fully automated threat removal is currently unreliable for enterprise systems."
  }
]

export default function ArchitecturePage() {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in zoom-in duration-500 min-h-[calc(100vh-100px)]">
      <header className="flex items-center justify-between mb-8 pb-4 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-2 h-10 bg-info rounded-sm shadow-[0_0_15px_rgba(0,240,255,0.6)]" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-mono drop-shadow-md">System Architecture</h1>
            <p className="text-gray-400 text-sm mt-1">Core defensive strategies & design principles</p>
          </div>
        </div>
        <div className="bg-info/10 border border-info/40 text-info px-4 py-2 rounded font-mono text-sm tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          <BookOpen className="w-4 h-4" />
          DOCS CENTER
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {qna.map((item, index) => (
          <CyberCard key={index} className="h-full flex flex-col group relative overflow-hidden transition-all duration-500 hover:border-surface-border hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            {/* Background gradient effect on hover */}
            <div className={`absolute inset-0 bg-${item.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
            
            <div className="relative z-10 p-2">
              <div className="flex items-start gap-4 mb-4 border-b border-surface-border/50 pb-4">
                <div className={`p-3 rounded-lg bg-[#05080f] border border-${item.color}/30 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                  {item.icon}
                </div>
                <h2 className="text-lg font-bold text-gray-200 leading-snug tracking-wide group-hover:text-white transition-colors">
                  {item.question}
                </h2>
              </div>
              
              <div className="text-gray-400 text-sm leading-relaxed pl-4 border-l-2 border-surface-border group-hover:border-gray-500 transition-colors">
                <p>{item.answer}</p>
              </div>
            </div>
            
            <div className="mt-auto pt-6 flex justify-end relative z-10">
              <span className={`text-xs font-mono tracking-widest text-${item.color} uppercase flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity`}>
                STRATEGY VERIFIED <ArrowRight className="w-3 h-3 ml-1" />
              </span>
            </div>
          </CyberCard>
        ))}
      </div>

      {/* Diagram/Visual spacer at bottom matching SOC aesthetic */}
      <CyberCard className="mt-8 border-surface-border flex items-center justify-center p-12 bg-[#05080f] relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.03)_0%,transparent_100%)] z-0" />
         <div className="relative z-10 text-center space-y-4">
             <div className="flex items-center justify-center gap-4 text-gray-500 font-mono text-xs tracking-widest">
                <span className="flex items-center gap-2 border bg-surface px-3 py-1 rounded shadow-md"><Server className="w-4 h-4 text-info"/> INPUT LAYER</span>
                <span className="w-8 h-px bg-surface-border"></span>
                <span className="flex items-center gap-2 border bg-surface px-3 py-1 rounded shadow-md border-warning/50"><Database className="w-4 h-4 text-warning"/> DATA LAYER</span>
                <span className="w-8 h-px bg-surface-border"></span>
                <span className="flex items-center gap-2 border bg-surface px-3 py-1 rounded shadow-md border-success/50"><Shield className="w-4 h-4 text-success"/> MITIGATION</span>
             </div>
             <p className="text-gray-600 text-[10px] font-mono tracking-widest">ADVANCED TIER 1 INTELLIGENCE PLATFORM</p>
         </div>
      </CyberCard>
    </div>
  )
}
