import { test, expect, Page } from '@playwright/test';

// ---------------------------------------------------------------------------
// SPEC-002: Facebook Login Flow
// Implements TC-1 .. TC-6. TC-7 (valid login) is out of automation scope.
//
// Notes confirmed against the live page during implementation:
//  - The email/password inputs have RANDOMISED ids, so we locate them by their
//    stable `name` attributes (`email` / `pass`) instead of `#email` / `#pass`.
//  - The visible "Log in" control is a localised <div role="button"> (rendered
//    e.g. in Kannada depending on region), so we submit via the Enter key, which
//    is locale-independent.
// ---------------------------------------------------------------------------

const LOGIN_URL = 'https://www.facebook.com/';

// Test data (no real credentials — see SPEC-002 §6)
const NONEXISTENT_EMAIL = 'qa.no.such.user.2026@example.com';
const RANDOM_PASSWORD = 'Wr0ngPass!2026';
const FORMATTED_EMAIL = 'qa.tester.2026@example.com';
const MALFORMED_IDENTIFIER = 'not-an-email';

// Locale-proof locators (stable `name` attributes / input type)
const emailField = (page: Page) => page.locator('input[name="email"]');
const passwordField = (page: Page) => page.locator('input[name="pass"]');
const submitControl = (page: Page) => page.locator('input[type="submit"]');

/**
 * Open the login page and dismiss the cookie-consent banner if present.
 * The banner only appears in some regions, so this is best-effort.
 */
async function openLoginPage(page: Page) {
  await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' });
  for (const name of [/allow all cookies/i, /decline optional cookies/i, /only allow essential/i]) {
    const btn = page.getByRole('button', { name }).first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click().catch(() => {});
      break;
    }
  }
  await expect(emailField(page)).toBeVisible();
}

/** Submit the login form in a locale-independent way (Enter in the email field). */
async function submitLogin(page: Page) {
  await emailField(page).press('Enter');
}

/**
 * "Not logged in" proxy: a successful login removes the login form, so if the
 * email field is still present we never reached an authenticated state.
 */
async function expectStillUnauthenticated(page: Page) {
  await expect(emailField(page)).toBeVisible();
}

test.describe('SPEC-002: Facebook Login Flow', () => {
  test('TC-1: login page exposes expected elements', async ({ page }) => {
    await openLoginPage(page);
    await expect(emailField(page)).toBeVisible();
    await expect(passwordField(page)).toBeVisible();
    await expect(submitControl(page)).toBeAttached();
  });

  test('TC-2: invalid email and password is rejected', async ({ page }) => {
    await openLoginPage(page);
    await emailField(page).fill(NONEXISTENT_EMAIL);
    await passwordField(page).fill(RANDOM_PASSWORD);
    await submitLogin(page);
    await page.waitForLoadState('domcontentloaded');
    await expectStillUnauthenticated(page);
  });

  test('TC-3: wrong password is rejected', async ({ page }) => {
    await openLoginPage(page);
    await emailField(page).fill(FORMATTED_EMAIL);
    await passwordField(page).fill(RANDOM_PASSWORD);
    await submitLogin(page);
    await page.waitForLoadState('domcontentloaded');
    await expectStillUnauthenticated(page);
  });

  test('TC-4: empty fields prevent login', async ({ page }) => {
    await openLoginPage(page);
    await submitLogin(page);
    await expectStillUnauthenticated(page);
  });

  test('TC-5: empty password prevents login', async ({ page }) => {
    await openLoginPage(page);
    await emailField(page).fill(FORMATTED_EMAIL);
    await submitLogin(page);
    await expectStillUnauthenticated(page);
  });

  test('TC-6: malformed identifier is rejected', async ({ page }) => {
    await openLoginPage(page);
    await emailField(page).fill(MALFORMED_IDENTIFIER);
    await passwordField(page).fill(RANDOM_PASSWORD);
    await submitLogin(page);
    await page.waitForLoadState('domcontentloaded');
    await expectStillUnauthenticated(page);
  });
});
