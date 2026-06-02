# SPEC-001: Playwright Docs Homepage

| Field | Value |
|-------|-------|
| **Spec ID** | SPEC-001 |
| **Status** | Implemented |
| **Owner** | jeyaprabha |
| **Related test file(s)** | `tests/example.spec.ts` |
| **Last updated** | 2026-06-02 |

## 1. Overview

This is the worked example that demonstrates the spec-driven workflow. It specifies the
basic, user-visible behaviour of the public Playwright documentation homepage
(`https://playwright.dev/`) and maps directly to the project's starter test,
`tests/example.spec.ts`.

## 2. Scope

**In scope**
- The homepage loads with the correct page title.
- The primary "Get started" navigation link leads to the Installation docs.

**Out of scope**
- Search, theme switching, versioned-docs dropdown, and any non-homepage pages.
- Mobile-specific layout behaviour.

## 3. Requirements

- **REQ-1:** The homepage title must identify the site as Playwright.
- **REQ-2:** The homepage must expose a "Get started" link that navigates the user to
  the Installation documentation.

## 4. Acceptance Criteria

### AC-1: Homepage has the correct title
- **Given** a user opens `https://playwright.dev/`
- **When** the page finishes loading
- **Then** the browser tab title contains the word "Playwright"

### AC-2: "Get started" link opens Installation docs
- **Given** a user is on `https://playwright.dev/`
- **When** they click the "Get started" link
- **Then** a heading named "Installation" is visible on the resulting page

## 5. Test Cases (traceability)

| Test ID | Covers | Scenario | Test name in code |
|---------|--------|----------|-------------------|
| TC-1 | AC-1 | Page title contains "Playwright" | `tests/example.spec.ts > has title` |
| TC-2 | AC-2 | "Get started" navigates to Installation heading | `tests/example.spec.ts > get started link` |

> Note: the starter tests use plain descriptive names (`has title`, `get started link`).
> For new specs, prefer embedding the Test ID in the name, e.g.
> `test('TC-1: homepage has the correct title', ...)`.

## 6. Test Data

- **Base URL:** `https://playwright.dev/`
- No credentials or fixtures required.

## 7. Open Questions / Notes

- Serves purely as the reference example for the `specs/` convention; safe to keep or
  replace once real feature specs exist.
