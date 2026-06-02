# ui-automation-playwright

UI automation test suite built with [Playwright](https://playwright.dev/), following a
**spec-driven development** workflow.

## Spec-driven development

Every feature or test area starts as a written specification in [`specs/`](./specs)
before any test code is written. Each automated test traces back to an acceptance
criterion in its spec, so coverage is explicit and reviewable.

- **Start here:** [`specs/README.md`](./specs/README.md) — the workflow and conventions
- **Template:** [`specs/TEMPLATE.md`](./specs/TEMPLATE.md) — copy to begin a new spec
- **Example:** [`specs/SPEC-001-playwright-docs-homepage.md`](./specs/SPEC-001-playwright-docs-homepage.md)

The short version:

1. Write a spec (copy `TEMPLATE.md` → `specs/SPEC-<n>-<slug>.md`).
2. Review & approve it.
3. Derive one Playwright test per test case, embedding the Test ID in the test name.
4. Link each test back in the spec's traceability table.
5. When behaviour changes, update the spec first, then the tests.

## Getting started

```bash
npm install
npx playwright install --with-deps
```

## Running tests

```bash
npm test                      # run all tests (headless)
npx playwright test --headed  # see the browser
npx playwright test --debug   # step through with the inspector
npx playwright show-report    # open the HTML report
```

## Project structure

```
specs/                # feature specifications (source of truth)
tests/                # Playwright tests, each tracing back to a spec
playwright.config.ts  # Playwright configuration
.github/workflows/    # CI (runs the suite on push / PR)
```
