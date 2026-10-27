"use client";
import React from "react";

import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

const CARD_HEIGHTS = [
  "h-72",
  "h-[28rem]",
  "h-96",
  "h-80",
  "h-[22rem]",
  "h-[32rem]",
];

const CARD_TITLES = [
  "GitHub Repository Connection",
  "Repository-Aware Investigation",
  "Root-Cause Insights",
  "Suggested Code Fixes",
  "Developer-Controlled Review",
  "Validation Visibility",
  "Investigation History",
];

interface CanvasRevealEffectDemoProps {
  count?: number;
  rows?: number;
  cols?: number;
  row?: number;
  col?: number;
  className?: string;
}

export default function CanvasRevealEffectDemo({
  count,
  rows,
  cols,
  row,
  col,
  className,
}: CanvasRevealEffectDemoProps) {
  const r = rows ?? row;
  const c = cols ?? col;
  const effectiveCols = c ? Math.max(1, c) : 4;
  const total = count ?? (r ? r * effectiveCols : 7);

  // Group cards into columns so items distribute row-by-row into a masonry column structure
  const columnsData: Array<Array<{ index: number; heightClass: string }>> = Array.from(
    { length: effectiveCols },
    () => []
  );

  for (let i = 0; i < total; i++) {
    columnsData[i % effectiveCols].push({
      index: i,
      heightClass: CARD_HEIGHTS[i % CARD_HEIGHTS.length],
    });
  }

  // Constrain container max-width to number of columns so cards keep fixed proportion (~300px - 340px)
  const maxContainerWidth = Math.min(
    1280,
    Math.max(340, effectiveCols * 320 + (effectiveCols - 1) * 16)
  );

  return (
    <div className={cn("py-20 w-full mx-auto px-4 sm:px-6 lg:px-8", className)}>
      <div
        className={cn(
          "flex justify-center gap-4 mx-auto w-full",
          effectiveCols > 2 ? "flex-col sm:flex-row" : "flex-row"
        )}
        style={{ maxWidth: `${maxContainerWidth}px` }}
      >
        {columnsData.map((colCards, colIdx) => (
          <div
            key={colIdx}
            className="flex-1 flex flex-col gap-4 min-w-0 max-w-full"
          >
            {colCards.map((card) => (
              <Card
                key={card.index}
                title={CARD_TITLES[card.index % CARD_TITLES.length]}
                icon={<AceternityIcon />}
                className={cn("w-full", card.heightClass)}
              >
                <CanvasRevealEffect
                  animationSpeed={5.1}
                  containerClassName="bg-[#0B2A12]"
                />
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export const Card = ({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] w-full p-4 relative break-inside-avoid",
        className || "h-[30rem]"
      )}
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </div>
  );
};

export const AceternityIcon = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
        style={{ mixBlendMode: "darken" }}
      />
    </svg>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
