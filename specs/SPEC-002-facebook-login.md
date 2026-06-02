# SPEC-002: Facebook Login Flow

| Field | Value |
|-------|-------|
| **Spec ID** | SPEC-002 |
| **Status** | Implemented |
| **Owner** | jeyaprabha |
| **Related test file(s)** | `tests/facebook-login.spec.ts` |
| **Last updated** | 2026-06-02 |

## 1. Overview

Specifies the login behaviour of the public Facebook entry page
(`https://www.facebook.com/`), which hosts the login form directly. This spec defines
the expected outcomes for valid input, invalid credentials, and field-validation
scenarios, and is the source of truth for the automated tests in
`tests/facebook-login.spec.ts`.

The emphasis is on **negative and validation scenarios**, which are observable without a
real account. See the Notes section for why a genuine successful login is treated as
out of automation scope.

## 2. Scope

**In scope**
- Loading the login page and its core elements (email/phone field, password field, Log in button).
- Validation and error handling for invalid credentials, wrong password, malformed email, and empty fields.
- Confirming the user is **not** logged in after a failed attempt (remains on a login/error page).

**Out of scope**
- A real successful login to the news feed (blocked by bot detection, 2FA, and security
  checkpoints — see Notes). Covered as a placeholder/manual case only.
- Account creation ("Create new account"), password recovery ("Forgotten password?"),
  language switching, and cookie-consent banners.
- Mobile (m.facebook.com) layout.

## 3. Requirements

- **REQ-1:** The login page must render an email/phone field, a password field, and a "Log in" button.
- **REQ-2:** Submitting credentials that do not match any account must keep the user on a
  login/error page and surface an error (not grant access).
- **REQ-3:** Submitting a recognised identifier with an incorrect password must be rejected with an error.
- **REQ-4:** Submitting with empty required fields must prevent login and prompt the user to complete them.
- **REQ-5:** A malformed email/identifier must not be accepted as valid credentials.

## 4. Acceptance Criteria

### AC-1: Login page exposes the expected elements
- **Given** a user opens `https://www.facebook.com/`
- **When** the page finishes loading
- **Then** the email/phone field, password field, and "Log in" button are all visible

### AC-2: Invalid email and password is rejected
- **Given** a user is on the login page
- **When** they enter a non-existent email and a random password and submit
- **Then** an error/recovery page is shown and they are **not** taken to the news feed

### AC-3: Known-format identifier with wrong password is rejected
- **Given** a user is on the login page
- **When** they enter a plausibly-formatted email and an incorrect password and submit
- **Then** an error is shown and they remain unauthenticated

### AC-4: Empty fields prevent login
- **Given** a user is on the login page
- **When** they click "Log in" with the email and password fields empty
- **Then** login does not proceed and the user is prompted to complete their details
  (HTML5 required-field prompt or Facebook's own error)

### AC-5: Empty password prevents login
- **Given** a user has entered an identifier but left the password blank
- **When** they click "Log in"
- **Then** login does not proceed and they remain on the login page

### AC-6: Malformed identifier is not accepted
- **Given** a user is on the login page
- **When** they enter a malformed identifier (e.g. `not-an-email`) with any password and submit
- **Then** the credentials are rejected and the user is not authenticated

## 5. Test Cases (traceability)

> One automated test per row. Embed the Test ID in the test name, e.g.
> `test('TC-2: invalid email and password is rejected', ...)`.

| Test ID | Covers | Scenario | Test name in code |
|---------|--------|----------|-------------------|
| TC-1 | AC-1 | Login form elements are visible | `tests/facebook-login.spec.ts > TC-1: login page exposes expected elements` |
| TC-2 | AC-2 | Invalid email + password → rejected | `tests/facebook-login.spec.ts > TC-2: invalid email and password is rejected` |
| TC-3 | AC-3 | Formatted email + wrong password → rejected | `tests/facebook-login.spec.ts > TC-3: wrong password is rejected` |
| TC-4 | AC-4 | Both fields empty → no login | `tests/facebook-login.spec.ts > TC-4: empty fields prevent login` |
| TC-5 | AC-5 | Identifier + empty password → no login | `tests/facebook-login.spec.ts > TC-5: empty password prevents login` |
| TC-6 | AC-6 | Malformed identifier → rejected | `tests/facebook-login.spec.ts > TC-6: malformed identifier is rejected` |
| TC-7 | — | Valid login → news feed | **Out of automation scope** (manual only — see Notes) |

## 6. Test Data

| Name | Value | Used by |
|------|-------|---------|
| `LOGIN_URL` | `https://www.facebook.com/` | all |
| `NONEXISTENT_EMAIL` | `qa.no.such.user.2026@example.com` | TC-2 |
| `RANDOM_PASSWORD` | `Wr0ngPass!2026` | TC-2, TC-3 |
| `FORMATTED_EMAIL` | `qa.tester.2026@example.com` | TC-3, TC-5 |
| `MALFORMED_IDENTIFIER` | `not-an-email` | TC-6 |

> Do **not** store real Facebook credentials in this repo. The valid-login case (TC-7)
> would require a dedicated test account and is not automated here.

### Element references (confirmed during implementation, 2026-06-02)
| Element | Confirmed locator | Notes |
|---------|-------------------|-------|
| Email/phone field | `input[name="email"]` | IDs are randomised per load (e.g. `_R_1h6kqsqppb6amH1_`), so the stable `name` attribute is used instead of `#email`. |
| Password field | `input[name="pass"]` | Same — `name` attribute, not `#pass`. |
| Log in control | `input[type="submit"]` (presence) | The visible button is a localised `<div role="button">` (rendered e.g. in Kannada by region), so its text is not reliable. |
| Form submission | Press `Enter` in the email field | Locale-independent; avoids depending on the localised button text. |

## 7. Open Questions / Notes

- **Exact error copy is not asserted by string** because Facebook changes wording and
  markup frequently and may A/B test it. Tests should assert the *observable outcome*
  (error/recovery page shown, still unauthenticated, URL not the feed) rather than a
  brittle exact message. If a stable message is found during implementation, record it
  here and tighten the assertion.
- **Valid login (TC-7) is out of automation scope:** automated logins trigger bot
  detection, CAPTCHAs, 2FA, and security checkpoints, and may conflict with Facebook's
  terms. Treat a successful login as a manual smoke check only.
- **Cookie/consent banner:** depending on region, a consent dialog may appear before the
  form. Implementation may need to dismiss it first; confirm during development.
- **Implemented & passing (2026-06-02):** TC-1..TC-6 pass on chromium. Two spec
  assumptions were corrected against the live page: (1) field locators switched from
  `#email`/`#pass` to `input[name="email"]`/`input[name="pass"]` because IDs are
  randomised; (2) submission switched to pressing `Enter` because the login button is a
  localised `<div role="button">`. Assertions verify the observable outcome (login form
  still present ⇒ unauthenticated) rather than exact error copy, as planned.
- TC-7 (valid login) remains out of automation scope (manual smoke check only).
