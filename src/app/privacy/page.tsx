import Link from "next/link";

export const metadata = { title: "Privacy Policy — RepoPilot" };

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to RepoPilot
      </Link>
      <h1 className="text-[26px] font-[500] tracking-[-0.01em] text-foreground">
        Privacy Policy
      </h1>
      <p className="text-[14px] text-muted-foreground">
        Last updated: October 30, 2026
      </p>

      <div className="space-y-5 text-[14px] leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-[17px] font-[500] text-foreground">
            1. What RepoPilot does
          </h2>
          <p>
            RepoPilot is an autonomous AI repository-debugging agent built for
            the Nebius × NVIDIA Global AI Hackathon. You connect a repository,
            describe a defect, and the agent inspects source, generates a
            patch, and verifies it by executing tests on NVIDIA Nemotron
            models hosted on Nebius Token Factory.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[17px] font-[500] text-foreground">
            2. Data we collect
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Account details: name, email, and provider identity from social sign-in.</li>
            <li>Repository metadata: repository name, source URL, default branch, indexing and run status.</li>
            <li>Bug reports and agent output: run transcripts, diagnoses, patches, and test results.</li>
            <li>Model usage telemetry: request counts, tokens, and latency.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-[17px] font-[500] text-foreground">
            3. How we use data
          </h2>
          <p>
            Data is used to operate the debugging workflow, verify fixes, and
            display run history to you. Model requests are processed by Nebius
            Token Factory under their own terms; we do not send Nebius
            credentials or secrets to the client side.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[17px] font-[500] text-foreground">
            4. Sharing
          </h2>
          <p>
            We do not sell data. Content is shared only with integrated
            services required for operation (GitHub, Nebius, and the email
            delivery provider for account emails).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[17px] font-[500] text-foreground">
            5. Contact
          </h2>
          <p>
            Questions about this policy can be raised through the project
            contact on the submission page.
          </p>
        </section>
      </div>
    </main>
  );
}
