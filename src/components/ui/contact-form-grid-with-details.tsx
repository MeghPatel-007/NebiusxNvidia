"use client";

import React from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContactDetail {
  label: string;
}

export interface ContactFormGridWithDetailsProps {
  title?: string;
  description?: string;
  contacts?: ContactDetail[];
  buttonText?: string;
  className?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export const defaultContactDetails: ContactDetail[] = [
  { label: "contact@yoursaas.ai" },
  { label: "+1 (800) 123 XX21" },
  { label: "support@yoursaas.ai" },
];

const fieldClassName =
  "h-10 w-full rounded-md border border-transparent bg-white pl-4 text-sm text-neutral-700 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500";

export function ContactFormGridWithDetails({
  title = "Contact us",
  description = "We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.",
  contacts = defaultContactDetails,
  buttonText = "Submit",
  className,
  onSubmit,
}: ContactFormGridWithDetailsProps) {
  return (
    <div className={cn("flex min-h-full w-full items-center justify-center", className)}>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-10 md:px-6 md:py-20 lg:grid-cols-2">
        <div className="relative flex flex-col items-center overflow-hidden lg:items-start">
          <h2 className="mt-9 bg-gradient-to-b from-neutral-800 to-neutral-900 bg-clip-text text-left text-xl font-bold text-transparent md:text-3xl lg:text-5xl dark:from-neutral-200 dark:to-neutral-300">
            {title}
          </h2>
          <p className="mt-8 max-w-lg text-center text-base text-neutral-600 md:text-left dark:text-neutral-400">
            {description}
          </p>

          <div className="mt-10 hidden flex-col items-center gap-4 md:flex-row lg:flex">
            {contacts.map((contact, index) => (
              <React.Fragment key={contact.label}>
                {index > 0 && (
                  <div className="h-1 w-1 rounded-full bg-neutral-500 dark:bg-neutral-400" />
                )}
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {contact.label}
                </p>
              </React.Fragment>
            ))}
          </div>

          <div className="relative mt-20 flex w-[600px] flex-shrink-0 -translate-x-10 items-center justify-center [perspective:800px] [transform-style:preserve-3d] sm:-translate-x-0 lg:-translate-x-32">
            <div className="pointer-events-none absolute top-0 right-1 z-[60] flex h-40 w-96 items-center justify-center">
              <div className="h-full w-full">
                <div className="absolute inset-x-0 top-0 z-20 mx-auto inline-block w-fit rounded-lg bg-neutral-200 px-2 py-1 text-xs font-normal text-neutral-700 dark:bg-neutral-800 dark:text-white">
                  We are here
                  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-blue-400/0 via-blue-400/90 to-blue-400/0" />
                </div>

                <div
                  className="absolute top-1/2 left-1/2 mt-4 ml-[0.09375rem] -translate-x-1/2 -translate-y-1/2"
                  style={{ perspective: "800px", transform: "rotateX(70deg) translateZ(0px)" }}
                >
                  {[0, 0.6, 1.2].map((delay) => (
                    <div
                      key={delay}
                      className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] dark:bg-sky-500/[0.2]"
                      style={{ animationDelay: `${delay}s`, animationDuration: "2s" }}
                    />
                  ))}
                </div>

                <div className="absolute right-1/2 bottom-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-blue-500 blur-[2px]" />
                <div className="absolute right-1/2 bottom-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-blue-500" />
                <div className="absolute right-1/2 bottom-1/2 z-40 h-[4px] w-[4px] translate-x-[1.5px] translate-y-[14px] rounded-full bg-blue-600 blur-[3px]" />
                <div className="absolute right-1/2 bottom-1/2 z-40 h-[2px] w-[2px] translate-x-[0.5px] translate-y-[14px] rounded-full bg-blue-300" />
              </div>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://assets.aceternity.com/pro/world.svg"
              width={500}
              height={500}
              alt="world map"
              className="[transform:rotateX(45deg)_translateZ(0px)] dark:invert dark:filter"
            />
          </div>
        </div>

        <form
          onSubmit={onSubmit ?? ((event) => event.preventDefault())}
          className="relative mx-auto flex w-full max-w-2xl flex-col items-start gap-4 overflow-hidden rounded-3xl bg-gradient-to-b from-gray-100 to-gray-200 p-4 sm:p-10 dark:from-neutral-900 dark:to-neutral-950"
        >
          <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b4d_1px,transparent_1px),linear-gradient(to_bottom,#18181b4d_1px,transparent_1px)] opacity-10 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] [background-size:20px_20px] dark:bg-[linear-gradient(to_right,#fafafa4d_1px,transparent_1px),linear-gradient(to_bottom,#fafafa4d_1px,transparent_1px)]" />
          </div>

          <div className="relative z-20 mb-4 w-full">
            <label htmlFor="contact-name" className="mb-2 inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300">
              Full name
            </label>
            <input id="contact-name" name="name" type="text" placeholder="Manu Arora" className={fieldClassName} />
          </div>

          <div className="relative z-20 mb-4 w-full">
            <label htmlFor="contact-email" className="mb-2 inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300">
              Email Address
            </label>
            <input id="contact-email" name="email" type="email" placeholder="support@aceternity.com" className={fieldClassName} />
          </div>

          <div className="relative z-20 mb-4 w-full">
            <label htmlFor="contact-company" className="mb-2 inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300">
              Company
            </label>
            <input id="contact-company" name="company" type="text" placeholder="Aceternity Labs LLC" className={fieldClassName} />
          </div>

          <div className="relative z-20 mb-4 w-full">
            <label htmlFor="contact-message" className="mb-2 inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Type your message here"
              className={cn(fieldClassName, "h-auto pt-4")}
            />
          </div>

          <button
            type="submit"
            className="relative z-10 flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0px_1px_0px_0px_#FFFFFF20_inset] transition duration-200 hover:bg-primary/90 md:text-sm"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactFormGridWithDetails;
