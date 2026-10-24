import { Octokit } from "octokit";
import { createAppAuth } from "@octokit/auth-app";

export function getAppSlug(): string {
  const raw = process.env.GITHUB_APP_SLUG || "repository-helper";
  return raw
    .replace(/^https?:\/\/github\.com\/apps\//i, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .trim();
}

export function getFormattedPrivateKey(): string | null {
  const raw = process.env.GITHUB_PRIVATE_KEY;
  if (!raw) return null;

  const trimmed = raw.replace(/^=/, "").trim();

  // If it's a fingerprint like SHA256:..., it's not a PEM key
  if (trimmed.startsWith("SHA256:") || !trimmed.includes("PRIVATE KEY")) {
    return null;
  }

  // Restore escaped newlines if passed as single-line string
  return trimmed.replace(/\\n/g, "\n");
}

export function getGitHubAppStatus() {
  const appId = process.env.GITHUB_APP_ID;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const slug = getAppSlug();
  const privateKey = getFormattedPrivateKey();

  const isPrivateKeyValid = Boolean(privateKey);
  const isConfigured = Boolean(appId && clientId && isPrivateKeyValid);

  let keyStatusMessage = "Valid PEM private key configured";
  if (!process.env.GITHUB_PRIVATE_KEY) {
    keyStatusMessage = "Missing GITHUB_PRIVATE_KEY";
  } else if (!isPrivateKeyValid) {
    keyStatusMessage = "Fingerprint (SHA256) detected — please set actual downloaded .pem private key";
  }

  return {
    appId: appId || null,
    clientId: clientId || null,
    slug,
    isPrivateKeyValid,
    isConfigured,
    keyStatusMessage,
    installUrl: `https://github.com/apps/${slug}/installations/new`,
  };
}

export function getAppOctokit(): Octokit | null {
  const appId = process.env.GITHUB_APP_ID;
  const privateKey = getFormattedPrivateKey();
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!appId || !privateKey) {
    return null;
  }

  try {
    return new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId,
        privateKey,
        clientId,
        clientSecret,
      },
    });
  } catch (err) {
    console.warn("Failed to initialize App Octokit:", err);
    return null;
  }
}

export async function getInstallationOctokit(
  installationId: number | string
): Promise<Octokit | null> {
  const appId = process.env.GITHUB_APP_ID;
  const privateKey = getFormattedPrivateKey();
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!appId || !privateKey) {
    return null;
  }

  try {
    return new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId,
        privateKey,
        installationId: Number(installationId),
        clientId,
        clientSecret,
      },
    });
  } catch (err) {
    console.warn(`Failed to initialize Installation Octokit for #${installationId}:`, err);
    return null;
  }
}
