export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface EmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

export interface EmailAdapter {
  send(payload: EmailPayload): Promise<EmailResult>;
}
