"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const CyberCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "danger" | "warning" }
>(({ className, variant = "default", children, ...props }, ref) => {
  const [transform, setTransform] = React.useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)")
  const cardRef = React.useRef<HTMLDivElement>(null)

  // Merge refs conceptually (forwardRef -> localRef)
  React.useImperativeHandle(ref, () => cardRef.current as HTMLDivElement)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left 
    const y = e.clientY - rect.top  

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -5 
    const rotateY = ((x - centerX) / centerX) * 5 

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`)
  }

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)")
  }

  const isReset = transform.includes("rotateX(0deg)")

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform, 
        transition: isReset ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "transform 0.1s ease-out", 
        transformStyle: "preserve-3d" 
      }}
      className={cn(
        "glass-panel rounded-lg p-6 relative group cursor-crosshair z-10 hover:z-50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
        variant === "danger" && "neon-border-danger hover:shadow-[0_0_30px_rgba(234,0,42,0.2)]",
        className
      )}
      {...props}
    >
      {/* Top Left Accent Light */}
      <div className={cn(
        "absolute top-0 left-0 w-8 h-[2px] transition-all duration-500 ease-out shadow-[0_0_10px_currentColor]",
        variant === "danger" ? "bg-danger text-danger" : variant === "warning" ? "bg-warning text-warning" : "bg-info text-info",
        "group-hover:w-full group-hover:opacity-80"
      )} style={{ transform: "translateZ(5px)" }} />
      
      {/* Left Top Accent */}
      <div className={cn(
        "absolute top-0 left-0 w-[2px] h-8 transition-all duration-500 ease-out shadow-[0_0_10px_currentColor]",
        variant === "danger" ? "bg-danger text-danger" : variant === "warning" ? "bg-warning text-warning" : "bg-info text-info",
        "group-hover:h-full group-hover:opacity-80"
      )} style={{ transform: "translateZ(5px)" }} />
      
      {/* Bottom Right Accent */}
      <div className={cn(
        "absolute bottom-0 right-0 w-8 h-[2px] transition-all duration-500 ease-out shadow-[0_0_10px_currentColor] opacity-50",
        variant === "danger" ? "bg-danger text-danger" : variant === "warning" ? "bg-warning text-warning" : "bg-info text-info",
        "group-hover:w-full group-hover:opacity-80"
      )} style={{ transform: "translateZ(5px)" }} />
      
      <div className="absolute bottom-0 right-0 w-[2px] h-8 transition-all duration-500 ease-out shadow-[0_0_10px_currentColor] opacity-50 bg-info text-info group-hover:h-full group-hover:opacity-80" 
           style={{ transform: "translateZ(5px)" }} />

      <div className="relative z-10 w-full h-full" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </div>
  )
})
CyberCard.displayName = "CyberCard"

export { CyberCard }
