'use client'
import React from 'react'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'
import BackgroundRippleEffectDemo from '@/components/background-ripple-effect-demo'
import LiquidGlassDemo from '@/components/liquid-glass-demo'


export default function LandingHeroSection() {
  return (
    <>
      {/* <div className="relative flex h-[15rem] w-full items-center justify-center overflow-hidden">
        <BackgroundRippleEffect inverted className="z-0" />
      </div> */}
      <LiquidGlassDemo/>
      {/* <BackgroundRippleEffectDemo /> */}
    </>
  )
}
