"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  title: string;
  items: FAQItem[];
}

export interface FAQsWithDashedLinesProps {
  sections?: FAQSection[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const GridLineHorizontal = ({
  className,
  offset = "200px",
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset,
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
        } as React.CSSProperties
      }
      className={cn(
        "[--background:var(--color-neutral-200)] [--color:var(--color-neutral-400)] dark:[--background:var(--color-neutral-800)] dark:[--color:var(--color-neutral-600)]",
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30 pointer-events-none",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
};

export const GridLineVertical = ({
  className,
  offset = "150px",
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset,
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30 pointer-events-none",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
};

export const defaultFaqSections: FAQSection[] = [
  {
    title: "Pricing",
    items: [
      {
        question: "How much does it cost to deploy AI agents?",
        answer:
          "Our pricing starts at $49/month for the Starter plan which includes up to 5 AI agents and 10,000 task executions. Scale plans start at $199/month for unlimited agents and 100,000 executions. Enterprise pricing is available for high-volume needs.",
      },
      {
        question: "Is there a free trial available?",
        answer:
          "Yes, we offer a 14-day free trial with full access to all features. No credit card required to get started. You can deploy up to 3 AI agents during the trial period.",
      },
      {
        question: "What happens if I exceed my plan limits?",
        answer:
          "We'll notify you when you reach 80% of your limits. If you exceed them, your agents will continue running but new task executions will be queued until the next billing cycle or until you upgrade your plan.",
      },
      {
        question: "Can I change plans at any time?",
        answer:
          "You can upgrade your plan at any time and the new features will be available immediately. Downgrades take effect at the start of your next billing cycle. We prorate charges for mid-cycle upgrades.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "We offer a 30-day money-back guarantee for annual plans. Monthly plans can be cancelled at any time with no refund, but you'll retain access until the end of your billing period.",
      },
    ],
  },
  {
    title: "Agents",
    items: [
      {
        question: "What can AI agents automate?",
        answer:
          "Our AI agents can automate complex workflows including data processing, customer support responses, content generation, scheduling, monitoring systems, and multi-step decision making. They work autonomously while you sleep, handling tasks that would typically require human intervention.",
      },
      {
        question: "How do I deploy and orchestrate my agents?",
        answer:
          "Deploying agents is simple. Use our visual workflow builder or SDK to define agent behaviors, then deploy with a single click. Our orchestration layer handles scaling, failovers, and inter-agent communication automatically.",
      },
      {
        question: "Can agents make autonomous decisions?",
        answer:
          "Yes, agents are designed to make intelligent decisions based on the rules and parameters you configure. You can set decision boundaries, approval thresholds, and fallback behaviors. Critical decisions can be routed for human review before execution.",
      },
    ],
  },
  {
    title: "Legal",
    items: [
      {
        question: "How is my data protected?",
        answer:
          "We use enterprise-grade encryption (AES-256) for data at rest and TLS 1.3 for data in transit. Your data is stored in SOC 2 Type II certified data centers. We never use your data to train models and you retain full ownership of all your data.",
      },
      {
        question: "Are you GDPR compliant?",
        answer:
          "Yes, we are fully GDPR compliant. We provide data processing agreements (DPAs), support data portability requests, and offer data deletion capabilities. EU customer data can be stored exclusively in European data centers upon request.",
      },
      {
        question: "What are your terms of service?",
        answer:
          "Our terms of service cover usage rights, acceptable use policies, liability limitations, and service level agreements. We guarantee 99.9% uptime for all paid plans. Full terms are available on our legal page and we recommend reviewing them before signing up.",
      },
    ],
  },
];

export function FAQsWithDashedLines({
  sections = defaultFaqSections,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about deploying AI agents and automating your workflows.",
  className,
}: FAQsWithDashedLinesProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenItem(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleItem = (itemId: string) => {
    setOpenItem((current) => (current === itemId ? null : itemId));
  };

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-4xl overflow-hidden px-4 py-20 md:px-8 md:py-32",
        className
      )}
    >
      <div className="text-center">
        <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight md:text-5xl md:leading-tight bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 bg-clip-text text-transparent dark:from-neutral-800 dark:via-white dark:to-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm font-normal text-neutral-600 md:text-base dark:text-neutral-400">
            {subtitle}
          </p>
        )}
      </div>

      <div
        ref={containerRef}
        className="relative mt-16 flex w-full flex-col gap-12 px-4 md:px-8"
      >
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-6 text-lg font-medium text-neutral-800 dark:text-neutral-200">
              {section.title}
            </h3>

            <div className="flex flex-col gap-3">
              {section.items.map((item, idx) => {
                const itemId = `${section.title}-${idx}`;
                const isOpen = openItem === itemId;

                return (
                  <div
                    key={itemId}
                    className={cn(
                      "relative rounded-lg transition-all duration-200",
                      isOpen
                        ? "bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/10"
                        : "hover:bg-neutral-50 dark:hover:bg-neutral-900"
                    )}
                  >
                    {isOpen && (
                      <div className="absolute inset-0 pointer-events-none">
                        <GridLineHorizontal
                          className="-top-[2px]"
                          offset="100px"
                        />
                        <GridLineHorizontal
                          className="-bottom-[2px]"
                          offset="100px"
                        />
                        <GridLineVertical
                          className="-left-[2px]"
                          offset="100px"
                        />
                        <GridLineVertical
                          className="-right-[2px] left-auto"
                          offset="100px"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleItem(itemId)}
                      className="flex w-full items-center justify-between px-4 py-4 text-left cursor-pointer"
                    >
                      <span className="text-sm font-medium text-neutral-700 md:text-base dark:text-neutral-300">
                        {item.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 shrink-0"
                      >
                        <Plus className="size-5 text-neutral-500 dark:text-neutral-400" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15, ease: "easeInOut" }}
                          className="relative overflow-hidden"
                        >
                          <p className="max-w-[90%] px-4 pb-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQsWithDashedLines;
