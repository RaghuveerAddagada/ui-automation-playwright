# SPEC-XXX: <Feature / Area Name>

| Field | Value |
|-------|-------|
| **Spec ID** | SPEC-XXX |
| **Status** | Draft <!-- Draft \| Approved \| Implemented \| Deprecated --> |
| **Owner** | <your name> |
| **Related test file(s)** | `tests/<file>.spec.ts` |
| **Last updated** | YYYY-MM-DD |

## 1. Overview

> What is this feature/area, and why does it matter? 1–3 sentences on the user value
> or the risk this testing protects against.

## 2. Scope

**In scope**
- ...

**Out of scope**
- ...

## 3. Requirements

> The functional rules the feature must satisfy. Keep each one atomic and testable.

- **REQ-1:** ...
- **REQ-2:** ...

## 4. Acceptance Criteria

> Each criterion is written as Given / When / Then so it maps directly to test steps.

### AC-1: <short name>
- **Given** <initial context / preconditions>
- **When** <action the user takes>
- **Then** <observable, verifiable outcome>

### AC-2: <short name>
- **Given** ...
- **When** ...
- **Then** ...

## 5. Test Cases (traceability)

> One row per automated test. Test names in code should embed the Test ID.

| Test ID | Covers | Scenario | Test name in code |
|---------|--------|----------|-------------------|
| TC-1 | AC-1 | <short description> | `tests/<file>.spec.ts > TC-1: ...` |
| TC-2 | AC-2 | <short description> | `tests/<file>.spec.ts > TC-2: ...` |

## 6. Test Data

> Any fixed inputs the tests rely on (credentials, URLs, sample records). Reference
> shared constants where possible.

- ...

## 7. Open Questions / Notes

- ...
