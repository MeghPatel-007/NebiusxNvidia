import type { EmailAdapter, EmailPayload, EmailResult } from "../types";

export interface StoredEmail extends EmailPayload {
  id: string;
  sentAt: Date;
}

class MemoryEmailAdapter implements EmailAdapter {
  private emails: StoredEmail[] = [];

  async send(payload: EmailPayload): Promise<EmailResult> {
    const id = `mem_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const record: StoredEmail = {
      ...payload,
      id,
      sentAt: new Date(),
    };
    this.emails.push(record);

    if (process.env.NODE_ENV !== "test") {
      // Safe logging without leaking sensitive query tokens to stdout
      console.log(`[Email:Dev] Queued "${payload.subject}" to ${payload.to}`);
    }

    return {
      success: true,
      id,
    };
  }

  getSentEmails(): readonly StoredEmail[] {
    return [...this.emails];
  }

  getLastEmail(): StoredEmail | undefined {
    return this.emails[this.emails.length - 1];
  }

  clear(): void {
    this.emails = [];
  }
}

export const memoryEmailAdapter = new MemoryEmailAdapter();
