# Spec-Driven Development

This project follows a **lightweight spec-first workflow**: every feature or test area
starts as a written specification before any test code is created. The spec is the
single source of truth for *what* we test and *why*; the `.spec.ts` files are the
*how*.

## Why

- **Shared understanding** — requirements and acceptance criteria are agreed before code.
- **Traceability** — every automated test maps back to an acceptance criterion, so we
  can see coverage at a glance and spot gaps.
- **Review-friendly** — reviewers read the spec first, then check the tests fulfil it.
- **Living documentation** — the `specs/` folder doubles as up-to-date docs of app behaviour.

## Folder layout

```
specs/
├── README.md      # this file — the workflow and conventions
├── TEMPLATE.md    # copy this to start a new spec
└── SPEC-XXX-*.md  # one spec per feature/area (e.g. SPEC-001-playwright-docs-homepage.md)
```

## The workflow

1. **Write the spec.** Copy `TEMPLATE.md` to `specs/SPEC-<next-number>-<slug>.md`.
   Fill in the overview, scope, requirements, and acceptance criteria. Set status to `Draft`.
2. **Review & approve.** Open a PR with just the spec (or discuss it), then set status to
   `Approved`. Tests are derived only from approved specs.
3. **Derive tests.** Implement one Playwright test per test case in the spec's
   traceability table. Name each test so it references its Test ID, e.g.
   `test('TC-1: has title', ...)`.
4. **Link back.** Fill the "Test name in code" column so each `TC-` row points to its
   real test. Set status to `Implemented`.
5. **Keep in sync.** When behaviour changes, update the spec *first*, then the tests.

## Conventions

| Prefix | Meaning | Example |
|--------|---------|---------|
| `SPEC-` | A specification document | `SPEC-001` |
| `REQ-`  | A requirement within a spec | `REQ-1` |
| `AC-`   | An acceptance criterion (Given/When/Then) | `AC-2` |
| `TC-`   | A test case (one automated test) | `TC-3` |

- **Spec status** is one of: `Draft` → `Approved` → `Implemented` (and `Deprecated` when retired).
- **One spec per feature/area.** Keep them small and focused.
- **Acceptance criteria use Given/When/Then** so they translate directly into test steps.
- **Test names embed the Test ID** so a failing test points straight back to its spec row.

See `SPEC-001-playwright-docs-homepage.md` for a complete worked example that maps to
`tests/example.spec.ts`.
