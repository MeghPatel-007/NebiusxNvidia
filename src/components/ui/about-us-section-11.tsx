import React from "react";
import { Bug, GitBranch, Share2, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NoiseBackgroundDemo from "../noise-background-demo";

const features = [
  {
    icon: GitBranch,
    title: "Repository Intelligence",
    description:
      "Connect your GitHub repository and explore relevant files and code context to investigate issues.",
  },
  {
    icon: Bug,
    title: "Root Cause Analysis",
    description:
      "Understand potential causes of bugs with AI-assisted explanations and relevant code references.",
  },
  {
    icon: Share2,
    title: "AI Code Suggestions",
    description:
      "Review proposed code changes designed to address the issue before accepting them.",
  },
  {
    icon: ShieldCheck,
    title: "Developer-Controlled Fixes",
    description:
      "Stay in control by reviewing suggestions and checking available validation results before shipping.",
  },
];

export function AboutUsSection11({ className }: { className?: string }) {
  return (
    <section className={className}>
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col items-start gap-10 py-2">
            <div className="flex flex-col items-start gap-6">
              <Badge
                variant="outline"
                className="h-auto rounded-full px-3 py-1 text-sm font-normal"
              >
                About RepoPilot
              </Badge>
              <h2 className="text-4xl font-medium tracking-tight text-balance sm:text-5xl">
                Your AI copilot for understanding and fixing code.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                RepoPilot helps developers debug GitHub repositories with
                AI-powered code analysis. Investigate issues, understand
                potential root causes, and review suggested fixes in one focused
                workflow. Spend less time searching through code and more time
                building with confidence.
              </p>
            </div>
            <Button className="h-10 rounded-full px-5 text-sm font-medium">
              Explore RepoPilot
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="rounded-xl border">
                <CardHeader className="gap-4 px-8 pt-8">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5" />
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <CardTitle className="text-xl font-medium">{title}</CardTitle>
                  <CardDescription className="mt-2 text-base leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 rounded-2xl bg-neutral-950 px-6 py-16 text-center">
          <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Debug smarter. Build with confidence.
          </h3>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-400">
            From investigating repository issues to reviewing AI-generated
            fixes, RepoPilot helps you move from confusion to clarity while
            keeping you in control of every change.
          </p>
           <NoiseBackgroundDemo  />
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection11;
