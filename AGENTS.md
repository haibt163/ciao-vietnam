# Ciao Vietnam — Agent Contract

## Purpose

This file defines the repository-wide contract for AI and human engineering
agents working on Ciao Vietnam.

It is harness-neutral.

Project-specific engineering rules belong in `AGENTS.project.md`.
Roles, lanes, review and merge rules belong in `docs/ENGINEERING_GOVERNANCE.md`.
The current state of the project belongs in `docs/HANDOVER.md`.
Detailed procedures and historical evidence remain under `docs/`.

Any harness agent may serve as Main Engineer. The Project Owner holds merge
approval. Chief Engineer review is advisory. Roles, operating modes and the merge
gate are defined only in `docs/ENGINEERING_GOVERNANCE.md`.

---

## 1. Read Before Substantive Work

Before substantive work:

1. inspect the current Git state (or state that this session cannot);
2. read `AGENTS.project.md`;
3. read `docs/ENGINEERING_GOVERNANCE.md` and `docs/HANDOVER.md`;
4. inspect the relevant implementation;
5. when touching content or images, read `docs/sources.md` and
   `docs/photo-selection.md`;
6. state which Git / GitHub / shell / network capabilities this session
   actually has.

Do not treat prior conversation, model reports, or handoffs as authoritative
when the repository can provide direct evidence.

---

## 2. Task Modes

### Read-only audit / investigation

Inspect and report findings without modifying application code unless explicitly
authorized.

State:

`NO APPLICATION CODE CHANGES.`

### Implementation

Modify only the files and surfaces necessary for the authorized task.

Use an isolated feature branch or worktree when parallel development could
conflict.

---

## 3. Think Before Coding

Do not silently pick an interpretation when a task is ambiguous and run with
it.

- State assumptions explicitly before implementing on top of them.
- When more than one reasonable interpretation exists, present the
  interpretations and the tradeoff rather than choosing quietly.
- If a simpler approach than the one implied by the task exists, say so
  before building the more complex one.
- If something is unclear, name what is unclear and ask, rather than guessing.

---

## 4. Scope Discipline

Prefer the smallest correct change.

Do not add unrelated refactors, dependency upgrades, aesthetic rewrites, or
architecture changes to a scoped task unless required or explicitly authorized.

**Simplicity first.** Write the minimum code that solves the authorized task:

- no features beyond what was asked;
- no abstraction for single-use code;
- no configurability that was not requested;
- no error handling for scenarios that cannot occur;
- call out overengineering, including your own.

**Surgical changes.** Touch only what the task requires. Match the existing
style. Report unrelated problems in the handoff instead of fixing them. Remove
imports, variables or functions that your own change made unused.

The test: every changed line should trace back to the authorized task.

---

## 5. Goal-Driven Execution

Prefer verifiable success criteria over imperative instructions. For a
multi-step task, state a brief plan with a verification check against each
step:

```
1. [step] → verify: [check]
2. [step] → verify: [check]
```

A concrete, checkable goal lets the result be judged on evidence rather than
the agent's own confidence (see §8).

---

## 6. Content, Licensing, and Provenance

Ciao Vietnam is a public site with no database, no accounts and no user data.
Its sensitive boundaries are content provenance, image licensing, and
accuracy of practical information.

Never:

- commit the source guidebooks (PDF/EPUB), full-page scans, or book-text extracts; the source books and private license records stay outside Git;
- copy sentences from the guidebooks; all visible copy is original and keyword-style;
- use a guidebook photograph or illustration outside the scope of the Project Owner-confirmed license;
- publish an image without recorded credit, license, license URL (when one exists), and source provenance;
- use any other external photo whose license is not on the allowed list in `AGENTS.project.md`;
- present prices, hours, visa or entry rules as current unless checked against
  an official source and dated;
- commit credentials, secrets or tracking scripts;
- represent an unchecked fact as sourced.

---

## 7. Documentation

Keep durable project knowledge in repository-visible documentation.

When current behavior changes:

- update current documentation where useful;
- preserve historical audits and reports (never delete them);
- do not rewrite historical evidence merely to match later conclusions;
- avoid duplicating detailed procedures.

---

## 8. Evidence Standard

Use these statuses consistently:

- **VERIFIED** — supported by direct repository, command, test, CI, or
  runtime evidence.
- **UNVERIFIED** — inference, proposal, or claim without sufficient evidence.
- **FAILED** — confirmed execution failure.

Never claim that work is implemented, tested, passing, verified, complete, or
production-ready without the relevant evidence.

Report verification limitations explicitly. State whether evidence came from
direct local execution, from a sandbox with limited network access, or from
inspecting material handed over into a chat session. These are not equivalent
and must not be described as if they were. A deployment not visible to the
reporting session is UNVERIFIED.

---

## 9. Git and Review Boundary

`main` is the canonical integration branch.

Every change goes through a pull request from a sub-branch. Do not commit
directly to `main`.

Any harness agent may serve as Main Engineer and may merge to `main`, but only
after the Project Owner's approval is on record. Chief Engineer review is
advisory input, not a merge gate. The authoritative definition is
`docs/ENGINEERING_GOVERNANCE.md`.

Passing tests do not authorize a merge.

---

## 10. Completion

Every substantive task leaves a factual evidence trail. A completion report
states: task; mode; implementation or findings; tests / verification;
evidence; files changed; remaining risks / limitations; Git state; handoff.

Do not report more certainty than the evidence supports.

---

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
