import { test, expect } from "@playwright/test";

test.describe("Authentication and Access Control E2E", () => {
  test("unauthenticated user accessing protected route is redirected to sign-in", async ({
    page,
  }) => {
    await page.goto("/overview");
    await expect(page).toHaveURL(/\/sign-in/);
    await expect(page.locator("h1")).toContainText("Welcome back");
  });

  test("rejects open-redirect and protocol-relative callback URLs", async ({ page }) => {
    await page.goto("/sign-in?callbackURL=//evil.com");
    // Verify the page does not redirect out to external domains
    await expect(page).toHaveURL(/\/sign-in/);

    await page.goto("/sign-in?callbackURL=https://attacker.com/malicious");
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test("renders sign-up page with real-time password requirements", async ({ page }) => {
    await page.goto("/sign-up");
    await expect(page.locator("h1")).toContainText("Create an account");

    // Fill in a short password to test strength checklist
    await page.locator("#password").fill("abc");
    await expect(page.locator("text=At least 8 characters")).toBeVisible();
  });

  test("submits forgot-password form with generic anti-enumeration response", async ({
    page,
  }) => {
    await page.goto("/forgot-password");
    await expect(page.locator("h1")).toContainText("Reset your password");

    await page.locator("#email").fill("security-audit@repopilot.internal");
    await page.locator('button[type="submit"]').click();

    // Verify success banner appears regardless of whether user exists
    await expect(
      page.locator("text=If an account exists with that email address")
    ).toBeVisible();
  });

  test("verify-email page handles invalid or missing token gracefully", async ({ page }) => {
    await page.goto("/verify-email");
    await expect(page.locator("h1")).toContainText("Verify your email");
    await expect(
      page.locator("button:has-text('Resend Verification Email')")
    ).toBeVisible();
  });
});
