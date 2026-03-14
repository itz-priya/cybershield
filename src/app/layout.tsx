import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'CyberShield - Threat Intelligence',
  description: 'SOC-style Threat Intelligence Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="flex h-screen overflow-hidden text-foreground bg-background">
        <Providers>
          <Sidebar />
          <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
            <Header />
            <main className="flex-1 overflow-y-auto px-8 py-6 relative">
              <div className="absolute inset-0 cyber-grid animate-[grid-drift_20s_linear_infinite] opacity-30 pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              <div className="relative z-10 max-w-7xl mx-auto h-full">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
