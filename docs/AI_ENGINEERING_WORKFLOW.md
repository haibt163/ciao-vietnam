# Ciao Vietnam — AI Engineering Workflow

**Last updated: 8 October 2026** (adapted from the CoHai Travel workflow)

## 1. Source of truth

- GitHub `main` is the canonical source of truth unless explicitly overridden.
- Local project folders and sandbox workspaces are working copies.
- Session history from any lane is context, not authoritative memory.
- Durable truth comes from repository files, Git history, pull requests, tests,
  CI/Vercel evidence, and Project Owner decisions.
- See `docs/ENGINEERING_GOVERNANCE.md` for roles and approval, and
  `docs/HANDOVER.md` for the current state.

## 2. Live engineering pipeline

```text
Project Owner defines task
        ↓
Choose Main Engineer lane
 Claude Code | Codex CLI/App | OMP | Grok (sandbox) | chat lane as author
        ↓
implementation / audit  →  tests + evidence + handoff (ZIP or branch)
        ↓
Project Owner commits to a feature branch, opens a pull request
        ↓
Chief Engineer — Claude Chat or ChatGPT (peers)
   APPROVE / REQUEST CORRECTION   (review on GitHub first)
        ↓
APPROVE from Chief Engineer chat OR Project Owner
        ↓
merge executed by Project Owner, Claude Code, or Codex CLI/App
        ↓
protected `main` → Vercel
```

**Two-lane mode.** For audits, small revisions and ad hoc tasks, a chat lane may
author while the other chat lane reviews. The author never approves their own
change (governance §2b).

## 3. Main Engineer lanes

- **Claude Code / Codex CLI/App** — local shell, Git and browser available when
  run locally. Peers; either may execute an approved merge.
- **OMP CLI** — local multi-model lane; implementation only, no merge.
- **Grok (sandbox)** — works in its own sandbox with no Git access. Delivers a
  ZIP and plain-language steps; cannot commit, push, merge or deploy.
- **Chat lane as author** — Claude Chat or ChatGPT preparing patches or ZIPs.

A task may move between lanes when that improves results or a limit is hit. The
incoming engineer reads the governance, `docs/HANDOVER.md`, live Git state and
evidence first. Changing lanes never changes the approval boundary.

Codex Cloud is not an approved lane.

## 4. Chief Engineer review

Performed by Claude Chat or ChatGPT (peers). Each lane's outcome stands on its
own.

The review covers, as applicable: scope; architecture; implementation quality;
tests and verification; content provenance and image licensing; accessibility,
mobile behavior and performance; deployment implications; risks; Git state.

Outcome: **APPROVE** (acceptable to merge, reviewer not the author) or
**REQUEST CORRECTION**.

A review states what it actually inspected: the pull request diff, a build in
the reviewer's own sandbox, screenshots provided by the Owner, or nothing beyond
what was pasted. It does not claim to have seen a live render or Vercel result it
could not see.

## 5. Project Owner authority and merge execution

The Project Owner is the final authority over scope and priorities and may
override any rule when it benefits the project (noted on the pull request).

A merge to `main` requires an APPROVE from Claude Chat, ChatGPT or the Project
Owner. Once approved, the Project Owner, Claude Code or Codex CLI/App executes
the merge. Chat lanes, Grok and OMP do not. The Project Owner relays approvals
between lanes.

## 6. Read-only audits

May inspect the repository concurrently, change no application code, and state
`NO APPLICATION CODE CHANGES.`

## 7. Implementation isolation

Each effort uses its own feature branch. Never let two agents edit the same
worktree at once. Do not stack pull requests on each other when avoidable.

## 8. Audit trail and handoff

Substantial work leaves durable repository-visible evidence.

### Implementation handoff

```markdown
# Implementation Handoff
## Task
## Scope
## Approach
## Changes (files / surfaces)
## Tests / Verification (real output, labelled sandbox or live)
## Evidence (screenshots, logs)
## Remaining Risks
## Unverified
## Git
Branch:
Commit:
PR:
Author lane:
Reviewer lane:
```

### Pull-request description (under 200 words)

What changed · what was tested (real output) · what could not be verified.

### Handoff to the Project Owner (plain language)

The Project Owner is not expected to be an engineer. Every handoff:

- says in one or two plain sentences what changed and why;
- gives numbered steps for Windows with exact commands, each in its own code
  block (mark PowerShell-only commands);
- says what the Owner should see after each step and what to do if it differs;
- covers likely failure cases and fixes in the same message;
- avoids engineering jargon, or explains a term the first time;
- names the author lane and the reviewer lane;
- never asks the Owner to run a check the engineer could run.

### ZIP rules (sandbox lanes)

One OVERLAY ZIP: only new or changed files, at their repository paths, plus a
plain list of any files to delete. Exclude `node_modules`, `.next`, `.git` and
the source guidebooks. Never ask the Owner to delete whole folders. Owner steps
say to create a branch, copy the ZIP contents over the repository, run
`git status` (stating exactly what should appear), commit, push the branch and
send the pull-request link.

## 9. Verification standard

- **VERIFIED** — direct repository, command, test, CI or runtime evidence.
- **UNVERIFIED** — proposal, inference or claim lacking direct evidence.
- **FAILED** — confirmed execution failure.

Do not call changes fixed, working, passing, complete or production-ready
without the evidence. Dashboard reports separate: sandbox-confirmed facts,
Git-confirmed facts, conversation-confirmed facts, items needing verification,
deployment status, known issues, next actions, and confidence.

## 10. Fresh-session rule

At the start of every session:

1. state which Git / GitHub / shell / network capabilities this session has;
2. read `docs/ENGINEERING_GOVERNANCE.md`;
3. read `docs/HANDOVER.md`;
4. identify whether the task is implementation or read-only;
5. choose or confirm the lane;
6. state the evidence and handoff deliverable;
7. independently verify important prior claims before relying on them.

Do not treat prior chat history as authoritative.

## 11. Cost discipline

Use the least expensive capable lane within the Project Owner's fixed monthly
budget. Switching lanes at a limit is routine. Model choice never changes
governance.
