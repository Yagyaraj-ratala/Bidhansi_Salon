'use client'

import { useState, useRef, MouseEvent, TouchEvent } from 'react'
import Image from 'next/image'

interface BeforeAfterProps {
  beforeImage: string
  afterImage: string
  title: string
  description?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  description
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    let percentage = (x / rect.width) * 100
    if (percentage < 0) percentage = 0
    if (percentage > 100) percentage = 100
    setSliderPosition(percentage)
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return
    handleMove(e.touches[0].clientX)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Slide Box */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative aspect-square sm:aspect-video w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-gold/10 luxury-shadow bg-blush"
      >
        {/* AFTER Image (Full width background) */}
        <Image
          src={afterImage}
          alt="After transformation"
          fill
          className="object-cover pointer-events-none"
        />
        <div className="absolute bottom-4 right-4 bg-salonDark/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-gold/20 shadow-md">
          AFTER
        </div>

        {/* BEFORE Image (Clipped width) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 aspect-square sm:aspect-video w-[calc(100vw-2rem)] sm:w-[50rem] md:w-[70rem] lg:w-[80rem]" style={{ width: containerRef.current?.getBoundingClientRect().width }}>
            <Image
              src={beforeImage}
              alt="Before transformation"
              fill
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="absolute bottom-4 left-4 bg-rosegold/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 shadow-md">
            BEFORE
          </div>
        </div>

        {/* SLIDER LINE & HANDLE */}
        <div
          className="absolute inset-y-0 w-1 bg-gradient-to-b from-gold via-rosegold to-gold cursor-ew-resize pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-gold flex items-center justify-between px-1.5 shadow-xl">
            <span className="text-[10px] text-rosegold font-bold">◀</span>
            <span className="text-[10px] text-rosegold font-bold">▶</span>
          </div>
        </div>
      </div>

      {/* Info labels */}
      <div className="px-2">
        <h4 className="font-serif font-bold text-salonDark text-lg">{title}</h4>
        {description && <p className="text-sm text-gray-600 mt-1 leading-relaxed">{description}</p>}
      </div>
    </div>
  )
}
