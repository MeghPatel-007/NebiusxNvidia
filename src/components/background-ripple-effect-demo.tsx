'use client'
import React from 'react'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'

export default function BackgroundRippleEffectDemo() {
  return (
    <div className="relative flex min-h-fit w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      <div className="mt-60 w-full"></div>
    </div>
  )
}
