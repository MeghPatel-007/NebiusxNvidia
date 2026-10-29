import Link from "next/link";

export const metadata = { title: "Terms of Service — RepoPilot" };

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to RepoPilot
      </Link>
      <h1 className="text-[26px] font-[500] tracking-[-0.01em] text-foreground">
        Terms of Service
      </h1>
      <p className="text-[14px] text-muted-foreground">
        Last updated: October 30, 2026
      </p>

      <div className="space-y-5 text-[14px] leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-[17px] font-[500] text-foreground">
            1. Service nature
          </h2>
          <p>
            RepoPilot is a hackathon demonstration product. It is provided
            &quot;as is&quot; for evaluation during the Nebius × NVIDIA Global
            AI Hackathon 2026 and carries no availability or accuracy
            guarantee.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[17px] font-[500] text-foreground">
            2. Your responsibilities
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Only connect repositories you are authorized to access.</li>
            <li>Never submit secrets, API keys, or confidential data in bug reports.</li>
            <li>Review every generated patch before applying it to any codebase.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-[17px] font-[500] text-foreground">
            3. Agent output
          </h2>
          <p>
            Patches and diagnoses are AI-generated suggestions from NVIDIA
            Nemotron models served by Nebius Token Factory. &quot;Verified&quot;
            status means the relevant tests executed and passed during the run
            — it is execution evidence, not an endorsement of the change.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[17px] font-[500] text-foreground">
            4. Third-party services
          </h2>
          <p>
            Use of RepoPilot depends on GitHub, Nebius Token Factory, and the
            email provider for account flows. Those services&apos; terms apply
            to their processing.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[17px] font-[500] text-foreground">
            5. Termination
          </h2>
          <p>
            Connectivity to this demonstration instance may be reduced or
            removed at any time, including after the hackathon concludes.
          </p>
        </section>
      </div>
    </main>
  );
}
