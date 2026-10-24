interface TemplateParams {
  name?: string | null;
  url?: string;
  appName?: string;
}

const BRAND_NAME = "Repoverse";
const BRAND_GREEN = "#1FBF5B";

function baseEmailTemplate({
  headline,
  intro,
  buttonText,
  buttonUrl,
  secondaryNote,
}: {
  headline: string;
  intro: string;
  buttonText?: string;
  buttonUrl?: string;
  secondaryNote?: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headline}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F4F4F6; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 540px; background-color: #FFFFFF; border: 1px solid #EBEBEF; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px 20px; border-bottom: 1px solid #F0F0F3;">
              <table role="presentation" width="100%">
                <tr>
                  <td align="left">
                    <span style="display: inline-block; font-size: 20px; font-weight: 600; color: ${BRAND_GREEN}; letter-spacing: -0.02em;">
                      ${BRAND_NAME}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px 32px 24px;">
              <h1 style="margin: 0 0 16px; font-size: 22px; font-weight: 600; color: #111111; line-height: 1.3;">
                ${headline}
              </h1>
              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #4B4B52;">
                ${intro}
              </p>

              ${
                buttonUrl && buttonText
                  ? `
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="left">
                    <a href="${buttonUrl}" target="_blank" rel="noopener noreferrer"
                       style="display: inline-block; background-color: ${BRAND_GREEN}; color: #FFFFFF; font-size: 15px; font-weight: 500; text-decoration: none; padding: 12px 28px; border-radius: 8px; text-align: center;">
                      ${buttonText}
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; font-size: 13px; line-height: 1.5; color: #8A8A94;">
                If the button above does not work, copy and paste this link into your browser:
                <br>
                <a href="${buttonUrl}" style="color: ${BRAND_GREEN}; word-break: break-all;">${buttonUrl}</a>
              </p>
              `
                  : ""
              }

              ${
                secondaryNote
                  ? `
              <p style="margin: 20px 0 0; font-size: 13px; line-height: 1.5; color: #8A8A94; border-top: 1px solid #F0F0F3; padding-top: 16px;">
                ${secondaryNote}
              </p>
              `
                  : ""
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px 24px; background-color: #FAFAFB; border-top: 1px solid #EBEBEF; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #9A9AA3; line-height: 1.4;">
                © ${new Date().getFullYear()} ${BRAND_NAME} · Autonomous Engineering Agent Platform
                <br>
                This is an automated security transmission. Please do not reply directly.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderVerificationEmail({ name, url }: TemplateParams) {
  const greeting = name ? `Hello ${name},` : "Hello,";
  const intro = `${greeting} thank you for creating your ${BRAND_NAME} account. Please verify your email address to activate your access.`;
  const secondaryNote = "This verification link is single-use and will expire shortly. If you did not create a Repoverse account, you can safely ignore this email.";

  const html = baseEmailTemplate({
    headline: "Verify your email address",
    intro,
    buttonText: "Verify Email",
    buttonUrl: url,
    secondaryNote,
  });

  const text = `${greeting}\n\nThank you for creating your ${BRAND_NAME} account. Please verify your email address by visiting the following link:\n\n${url}\n\n${secondaryNote}\n\n— The ${BRAND_NAME} Team`;

  return { html, text, subject: `Verify your email for ${BRAND_NAME}` };
}

export function renderPasswordResetEmail({ name, url }: TemplateParams) {
  const greeting = name ? `Hello ${name},` : "Hello,";
  const intro = `${greeting} we received a request to reset the password for your ${BRAND_NAME} account. Click below to choose a new password.`;
  const secondaryNote = "For security reasons, this single-use link is valid for a limited time and can only be used once. If you did not request a password reset, no further action is required and your account remains secure.";

  const html = baseEmailTemplate({
    headline: "Reset your password",
    intro,
    buttonText: "Reset Password",
    buttonUrl: url,
    secondaryNote,
  });

  const text = `${greeting}\n\nWe received a request to reset your ${BRAND_NAME} password. Click the link below to set a new password:\n\n${url}\n\n${secondaryNote}\n\n— The ${BRAND_NAME} Team`;

  return { html, text, subject: `Reset your ${BRAND_NAME} password` };
}

export function renderPasswordChangedEmail({ name }: TemplateParams) {
  const greeting = name ? `Hello ${name},` : "Hello,";
  const intro = `${greeting} the password for your ${BRAND_NAME} account was successfully changed.`;
  const secondaryNote = "If you made this change, you can safely disregard this notice. If you did NOT change your password, please contact support or reset your password immediately to protect your account.";

  const html = baseEmailTemplate({
    headline: "Your password was updated",
    intro,
    secondaryNote,
  });

  const text = `${greeting}\n\nThe password for your ${BRAND_NAME} account was successfully changed.\n\n${secondaryNote}\n\n— The ${BRAND_NAME} Security Team`;

  return { html, text, subject: `Security Alert: ${BRAND_NAME} password changed` };
}
