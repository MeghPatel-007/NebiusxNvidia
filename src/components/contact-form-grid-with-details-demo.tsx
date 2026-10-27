import React from "react";
import ContactFormGridWithDetails from "@/components/ui/contact-form-grid-with-details";
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'

export default function ContactFormGridWithDetailsDemo() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-100 dark:bg-neutral-900">
      <BackgroundRippleEffect  className="z-0" />
      <div className="relative z-10 w-full">
        <ContactFormGridWithDetails
          title="Let's talk about your workflow"
          description="Have a question, found a bug, or want to share feedback about RepoPilot? Send a message and tell us how we can help."
          contacts={[]}
          buttonText="Send message"
        />
      </div>
    </div>
  );
}
