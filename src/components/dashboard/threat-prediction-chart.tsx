"use client"
import { CyberCard } from "@/components/ui/cyber-card"
import { Activity } from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(15, 17, 21, 0.95)',
      titleColor: '#00f0ff',
      bodyColor: '#e0e0e0',
      borderColor: '#1f232c',
      borderWidth: 1,
      padding: 12,
      titleFont: { family: 'monospace', size: 14 },
      bodyFont: { family: 'monospace', size: 12 },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(31, 35, 44, 0.5)' },
      ticks: { color: '#6b7280', font: { family: 'monospace' } }
    },
    x: {
      grid: { display: false },
      ticks: { color: '#6b7280', font: { family: 'monospace' } }
    }
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false,
  },
}

import { useThreatTrends, useThreatPredictions } from "@/lib/api"

export function ThreatPredictionChart() {
  const { trends } = useThreatTrends()
  const { predictions } = useThreatPredictions()
  
  // Transform dynamic backend data for Line Chart
  const chartLabels = trends?.map((t: any) => t.timestamp) || ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
  const probData = trends?.map((t: any) => t.probability) || [12, 19, 15, 45, 22, 65, 78]
  const volData = trends?.map((t: any) => t.volume) || [30, 40, 35, 50, 45, 60, 55]

  const data = {
    labels: chartLabels,
    datasets: [
      {
        fill: true,
        label: 'Attack Probability (%)',
        data: probData,
        borderColor: '#ea002a',
        backgroundColor: 'rgba(234, 0, 42, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#050505',
        pointBorderColor: '#ea002a',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        fill: true,
        label: 'Threat Volume',
        data: volData,
        borderColor: '#ff9f1c',
        backgroundColor: 'rgba(255, 159, 28, 0.05)',
        tension: 0.4,
        pointBackgroundColor: '#050505',
        pointBorderColor: '#ff9f1c',
        pointBorderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      }
    ],
  }

  // Transform dynamic backend data for Doughnut Chart
  const doughnutLabels = predictions?.classifications?.map((c: any) => c.name) || ['Credential Leaks', 'Ransomware', 'Malware', 'Phishing']
  const doughnutValues = predictions?.classifications?.map((c: any) => c.value) || [45, 25, 20, 10]
  const totalActive = predictions?.totalActive || 124

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#6b7280',
          font: { family: 'monospace', size: 10 },
          padding: 10,
          boxWidth: 10,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 17, 21, 0.95)',
        titleColor: '#00f0ff',
        bodyColor: '#e0e0e0',
        borderColor: '#1f232c',
        borderWidth: 1,
        padding: 12,
        bodyFont: { family: 'monospace', size: 12 },
      },
    },
    cutout: '75%',
  }

  const doughnutData = {
    labels: doughnutLabels,
    datasets: [
      {
        data: doughnutValues,
        backgroundColor: [
          'rgba(234, 0, 42, 0.8)',   // Danger/Red
          'rgba(255, 159, 28, 0.8)', // Warning/Orange
          'rgba(0, 240, 255, 0.8)',  // Info/Blue
          'rgba(147, 51, 234, 0.8)', // Purple
        ],
        borderColor: '#050505',
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  }
  return (
    <CyberCard className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-surface-border pb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-warning" />
          <h2 className="text-sm font-bold text-gray-200 tracking-wider font-mono uppercase">Threat Prediction & Trends</h2>
        </div>
        <div className="flex gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-danger shadow-[0_0_5px_rgba(234,0,42,0.8)]"></span>
            <span className="text-gray-400">Probability</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warning shadow-[0_0_5px_rgba(255,159,28,0.8)]"></span>
            <span className="text-gray-400">Volume</span>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full relative min-h-[250px] grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative min-h-[200px]">
          <h3 className="absolute -top-2 left-0 text-[10px] text-gray-500 font-mono">TREND ANALYSIS (24H)</h3>
          <Line options={options} data={data} />
        </div>
        <div className="relative min-h-[200px] flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-surface-border pt-4 md:pt-0 md:pl-4">
          <h3 className="absolute -top-2 left-4 md:left-4 text-[10px] text-gray-500 font-mono">THREAT CLASSIFICATION</h3>
          <div className="w-full h-full relative" style={{ minHeight: '180px' }}>
            <Doughnut options={doughnutOptions} data={doughnutData} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-6">
              <span className="text-2xl font-bold text-gray-200 font-mono mt-4">{totalActive}</span>
              <span className="text-[9px] text-gray-500 font-mono tracking-widest mt-1">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </CyberCard>
  )
}
