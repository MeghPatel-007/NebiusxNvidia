"use client";

import React from "react";
import FAQsWithDashedLines, {
  type FAQSection,
} from "@/components/ui/faqs-with-dashed-lines";

const sections: FAQSection[] = [
  {
    title: "General",
    items: [
      {
        question: "What is RepoPilot?",
        answer:
          "RepoPilot is an AI-assisted GitHub debugging tool that helps developers investigate repository issues, understand likely causes, and review proposed code fixes.",
      },
      {
        question: "How do I connect GitHub?",
        answer:
          "Use the existing Connect GitHub flow to authorize the RepoPilot GitHub App and grant the repository access requested by the app.",
      },
      {
        question: "Does RepoPilot automatically change my code?",
        answer:
          "RepoPilot's suggestions should be reviewed before they are applied or shipped.",
      },
      {
        question: "Can RepoPilot guarantee a fix?",
        answer:
          "No. AI-generated analysis and suggestions can be incomplete or incorrect. Review the explanation and proposed changes, then run appropriate checks.",
      },
      {
        question: "Does RepoPilot run tests?",
        answer:
          "RepoPilot does not claim that a change is verified. Review the proposed change and run the checks that apply to your project before shipping.",
      },
    ],
  },
  {
    title: "Languages and access",
    items: [
      {
        question: "Which languages are supported?",
        answer:
          "Results depend on the repository structure and the context available during an investigation, rather than on a fixed list of supported languages.",
      },
      {
        question: "How is repository data handled?",
        answer:
          "Repository content is accessed through the GitHub App installation you authorize, limited to the repositories you select. Review the permissions requested before connecting.",
      },
      {
        question: "Can I revoke access?",
        answer:
          "Yes. You can revoke the GitHub App's repository access at any time from your GitHub App installation settings.",
      },
    ],
  },
];

export default function FAQsWithDashedLinesDemo() {
  return (
    <FAQsWithDashedLines
      sections={sections}
      title="Frequently Asked Questions"
      subtitle="What RepoPilot does, how it connects to GitHub, and what it does not claim about your code."
    />
  );
}
