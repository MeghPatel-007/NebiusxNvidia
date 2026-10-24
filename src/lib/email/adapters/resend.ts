import { Resend } from "resend";
import type { EmailAdapter, EmailPayload, EmailResult } from "../types";

export class ResendEmailAdapter implements EmailAdapter {
  private client: Resend;
  private from: string;

  constructor(apiKey: string, from?: string) {
    this.client = new Resend(apiKey);
    this.from = from || process.env.EMAIL_FROM || "Repoverse <onboarding@resend.dev>";
  }

  async send(payload: EmailPayload): Promise<EmailResult> {
    try {
      const response = await this.client.emails.send({
        from: this.from,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      });

      if (response.error) {
        return {
          success: false,
          error: response.error.message || "Failed to send email via Resend",
        };
      }

      return {
        success: true,
        id: response.data?.id,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}
