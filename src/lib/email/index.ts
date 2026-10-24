import type { EmailAdapter } from "./types";
import { ResendEmailAdapter } from "./adapters/resend";
import { memoryEmailAdapter } from "./adapters/memory";
import {
  renderVerificationEmail,
  renderPasswordResetEmail,
  renderPasswordChangedEmail,
} from "./templates";

let cachedAdapter: EmailAdapter | null = null;

export function getEmailAdapter(): EmailAdapter {
  if (cachedAdapter) return cachedAdapter;

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey && apiKey.trim().length > 0) {
    cachedAdapter = new ResendEmailAdapter(apiKey.trim());
    return cachedAdapter;
  }

  // Development and test fallback
  cachedAdapter = memoryEmailAdapter;
  return cachedAdapter;
}

// For unit testing only: allow injecting a mock adapter or resetting
export function setEmailAdapterForTesting(adapter: EmailAdapter | null): void {
  cachedAdapter = adapter;
}

export async function sendVerificationEmail({
  email,
  name,
  url,
}: {
  email: string;
  name?: string | null;
  url: string;
}) {
  const adapter = getEmailAdapter();
  const template = renderVerificationEmail({ name, url });
  return adapter.send({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

export async function sendPasswordResetEmail({
  email,
  name,
  url,
}: {
  email: string;
  name?: string | null;
  url: string;
}) {
  const adapter = getEmailAdapter();
  const template = renderPasswordResetEmail({ name, url });
  return adapter.send({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

export async function sendPasswordChangedNotification({
  email,
  name,
}: {
  email: string;
  name?: string | null;
}) {
  const adapter = getEmailAdapter();
  const template = renderPasswordChangedEmail({ name });
  return adapter.send({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

export { memoryEmailAdapter };
export * from "./types";
