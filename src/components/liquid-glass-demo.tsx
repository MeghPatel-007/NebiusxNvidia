'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { LiquidGlass } from '@/components/ui/liquid-glass'
// import Video from 'next-video';
// import myAwesomeVideo from '@/videos/hero-video.mp4';

type LiquidGlassDemoProps = {
  shape?: 'circle' | 'pill'
  scale?: number
  aberration?: number
  bevelDepth?: number
  frost?: number
  tint?: number
}

export default function LiquidGlassDemo({
  shape = 'circle',
  scale = 48,
  aberration = 14,
  bevelDepth = 37,
  frost = 0.4,
  tint = 0.12,
}: LiquidGlassDemoProps) {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const size = shape === 'pill' ? { w: 320, h: 120 } : { w: 200, h: 200 }

  return (
    <div
      ref={constraintsRef}
      className="relative min-h-screen w-full overflow-hidden bg-neutral-900"
    >
      <video
        src="assets/hero-video.mp4"
        className="absolute inset-0 size-full object-cover"
        draggable={true}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-8 text-center select-none">
        <p className="text-6xl leading-[0.95] font-bold tracking-tighter text-white md:text-8xl">
          {['Repo', 'Pilot'].map((word, index) => (
            <motion.span
              key={word}
              className="inline-block"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 28, filter: 'blur(10px)' }
              }
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.8,
                delay: 0.15 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {index === 0 && '\u00A0'}
            </motion.span>
          ))}
        </p>
      </div>

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={reduceMotion ? undefined : { scale: 1.04 }}
        className="absolute top-1/2 left-1/2 cursor-grab touch-none active:cursor-grabbing"
        style={{
          width: size.w,
          height: size.h,
          marginLeft: -size.w / 2,
          marginTop: -size.h / 2,
        }}
      >
        <LiquidGlass
          radius={size.h / 2}
          scale={scale}
          aberration={aberration}
          bevelDepth={bevelDepth}
          frost={frost}
          tint={tint}
          className="size-full shadow-[0_12px_40px_rgb(0_0_0/0.25),inset_0_1px_0_rgb(255_255_255/0.5)]"
        />
      </motion.div>
    </div>
  )
}
