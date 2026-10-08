# Ciao Vietnam — Engineering Governance

**Effective:** 8 October 2026 (adapted from the CoHai Travel governance model)

## 1. Purpose

This document defines the live engineering governance for Ciao Vietnam.

The project uses multiple AI engineering environments, but governance does not
depend on a particular model or vendor. Implementation work may move between
Main Engineer lanes without changing the review or approval boundary.

Work runs in one of two operating modes (§2a). In both, the lane that authored a
change never approves it (§2b), and the Project Owner may override any rule in
this document when doing so benefits the project (§2).

## 2. Roles

### Project Owner — final authority

The Project Owner (Maris) is the final human authority for the project.

The Project Owner:

- defines product intent and priorities;
- decides whether proposed scope should proceed;
- holds the same approval standing at the `main` merge gate as either chat lane
  (§6a);
- may override any rule in this document when it benefits the project —
  including committing, opening pull requests, reviewing, approving, merging
  and relaying work between lanes personally. Note an override on the pull
  request so the record stays clear;
- owns the final release decision.

The Project Owner is not expected to be an engineer. Engineers explain
hand-offs in plain language with step-by-step instructions
(`docs/AI_ENGINEERING_WORKFLOW.md` §8).

### Chief Engineer — Chat lane

The Chief Engineer role may be performed by **Claude Chat or ChatGPT**. These two
lanes have the same role, authority and review responsibility. Neither is a
fallback for the other.

The Chief Engineer is the independent review and quality gate. It reviews
substantial engineer work before it is eligible to merge into `main`.

**Evidence-access boundary:** a chat session may have no live access to a
runnable environment. It works from the GitHub pull request (the repository is
public), from material the Project Owner pastes or uploads, or from connector
access when available. Reviews say plainly which situation applies. A review
that read the code and ran a build in a review sandbox is not the same as a
live render, and a deployment the reviewer cannot see is UNVERIFIED.

The Chief Engineer reviews, as applicable: scope; architecture; implementation
quality; tests and verification evidence; content provenance and image
licensing; accessibility and mobile behavior; runtime and deployment
implications; remaining risks; Git branch, commit and pull-request state.

Outcomes:

**APPROVE** — acceptable to merge into `main` under §6a (and §2b).

**REQUEST CORRECTION** — the work must be corrected and re-verified.

An APPROVE from either chat lane, alone, satisfies §6a. A REQUEST CORRECTION
from either lane is likewise binding on its own.

### Main Engineers — interchangeable implementation lanes

1. **Claude Code** — local CLI with repository, shell and Git access.
2. **Codex CLI / Codex App** — local Codex lane using GPT/Codex models.
3. **OMP CLI** — local multi-model lane (DeepSeek, GLM, Kimi, Qwen) used
   routinely for cost/availability reasons.
4. **Grok (sandbox)** — an engineer working in its own sandbox with no Git or
   GitHub write access. It delivers a ZIP plus plain-language steps (§13).
5. **A chat lane as author** — Claude Chat or ChatGPT acting as Main Engineer in
   two-lane mode (§2a), also delivering patches or ZIPs for the Project Owner to
   commit.

Claude Code and Codex CLI/App have the same standing, including merge-execution
authority (§6a). OMP, Grok and chat lanes do not execute merges.

**Codex Cloud is not an approved lane for this project.**

Lanes are used according to task fit, context, quality, cost and availability.
No lane merges its own unreviewed work to `main`.

## 2a. Operating modes — three lanes or two lanes

**Standard mode (three lanes).** A Main Engineer lane implements; a Chief
Engineer chat lane reviews and approves; the Project Owner directs and holds
equal approval standing.

**Reduced mode (two lanes).** Claude Chat or ChatGPT may act as the Main
Engineer (author) — for example by preparing a patch, a ZIP or documentation.
The *other* chat lane acts as Chief Engineer. The Project Owner may review and
approve as well.

**Capability declaration.** At the start of every session each lane states which
Git / GitHub / shell / network capabilities it actually has. A lane that cannot
commit, push or open a pull request hands over a ZIP or patch with plain-language
steps; the Project Owner pushes the branch and opens the pull request. Record
any capability change in the handoff.

## 2b. Author ≠ approver

The lane (or person) that authored the commits of a change may never approve
that change's pull request or merge.

- Authored by Claude Chat → approved by ChatGPT or the Project Owner.
- Authored by ChatGPT → approved by Claude Chat or the Project Owner.
- Authored by Grok, Claude Code, Codex CLI/App or OMP → approved by Claude Chat,
  ChatGPT or the Project Owner.
- Another session or model of the same lane counts as the same lane.
- Relaying is not authoring: when the Project Owner only applies or pushes
  someone else's work unchanged, the original lane remains the author.
- Every pull request states its **author lane** and **reviewer lane**; they must
  differ.
- Approval and execution are different acts (§6a).

## 3. Engineering pipeline

```text
Project Owner defines task
        ↓
Choose Main Engineer lane
 (Claude Code | Codex CLI/App | OMP | Grok sandbox | chat lane as author)
        ↓
Implement / investigate
        ↓
Tests + evidence + handoff (ZIP or branch, plain-language steps, PR description)
        ↓
Project Owner commits to a feature branch and opens a pull request
        ↓
Chief Engineer — Claude Chat or ChatGPT (peers)
   APPROVE / REQUEST CORRECTION
        ↓
APPROVE from Chief Engineer chat OR Project Owner
        ↓
merge executed by Project Owner, Claude Code, or Codex CLI/App
        ↓
protected `main` → Vercel production
```

Model or environment switching does not bypass any stage.

## 4. Choosing the Main Engineer

Use the least expensive capable lane that can safely perform the task, and
switch lanes when a session limit or an environment limit (for example a sandbox
that cannot reach a needed website) is hit.

Factors: task complexity; context needed; whether the lane has network access
for fonts, images and docs; whether it can run a headless browser; cost;
availability.

The incoming engineer reads the governance, `docs/HANDOVER.md`, live Git state
and relevant evidence before continuing.

## 5. Task modes

**Implementation** — may modify code, content and documentation within the
authorized scope, on a feature branch.

**Read-only audit / investigation** — records findings without changing
application code and states `NO APPLICATION CODE CHANGES.`

## 6. Branch and Git rules

- `main` is the protected integration branch and source of record.
- Implementation happens on a dedicated feature branch (for example `phase-2`).
- Do not stack pull requests on each other when avoidable; merge or close the
  earlier one first, or say clearly that a later one contains it.
- Engineers must not bypass the Chief Engineer review boundary.
- A successful test run does not authorize a merge.
- Silence or lack of objection is not approval; prior approval does not
  substitute for the current review.
- The author of a change may not approve it (§2b).
- Historical evidence in `docs/` is never deleted by a feature change. ZIP
  handoffs are overlays (§13) so nothing is removed by accident.

## 6a. Merge authority

Merge execution to protected `main` is held by the Project Owner, Claude Code
and Codex CLI/App equally. OMP, Grok and chat lanes are not merge-capable.

**Approval gate.** A merge requires an APPROVE on record from Claude Chat,
ChatGPT (as Chief Engineer) or the Project Owner. A self-review, a passing test
suite or another Main Engineer's sign-off does not satisfy the gate. The
approver must not be the author (§2b).

**No direct chat-to-coding handoff is assumed.** The Project Owner relays an
APPROVE when needed. A chat verdict counts as the on-record APPROVE because chat
lanes cannot click GitHub's Approve button.

**No approval, no merge.**

## 7. Pull-request review boundary

A handoff contains: task and scope; approach; files changed; tests and
verification (real output); evidence; remaining risks; unverified items; branch,
commit SHA and PR link; author lane and reviewer lane; and a pull-request
description under 200 words (what changed, what was tested, what could not be
verified).

**GitHub first.** The pull request on the public repository is the review
surface: diff, commit history, and any Vercel preview or CI result visible on it.
The local folder is not a routine dependency of a review. Ask the Project Owner
for a ZIP, a patch, screenshots or terminal output only when something cannot be
established from GitHub: generated or Git-excluded files, local browser
behavior, uncaptured build output, or machine-specific issues. Do not ask for the
whole project folder for every pull request.

A review states what it actually inspected and what it could not (for example
"read the code and built it in a review sandbox; did not see the live site").

## 8. Evidence standard

- **VERIFIED** — direct repository, command, test, CI or runtime evidence.
- **UNVERIFIED** — proposal, inference, or claim lacking direct evidence.
- **FAILED** — confirmed execution failure.

Do not describe work as fixed, passing, working, complete or production-ready
without the relevant evidence. A Vercel build or preview the reporting lane
cannot see is UNVERIFIED.

## 9. Durable handoffs

Substantial work leaves repository-visible evidence: documentation, Git commits,
pull requests, test output, and an updated `docs/HANDOVER.md`. Conversation
history is context, not the source of truth. For generated external artifacts,
record the exact workspace path and how the Project Owner retrieves them.

## 10. Cross-agent continuity

A new engineer does not assume it knows another engineer's conversation.

```text
read governance
→ read docs/HANDOVER.md
→ inspect live Git state (or state it cannot)
→ inspect relevant code and content
→ independently verify important prior claims
→ continue from evidence
```

Fresh sessions are preferred at phase boundaries.

## 11. Cost discipline

The project favors economical, capable models within the Project Owner's fixed
monthly budget. Switching lanes when a limit is hit is routine, not an
escalation. Claude Chat and ChatGPT are equivalent Chief Engineer choices;
choose on availability and budget, never standing.

## 12. Simple operating rule

```text
MAIN ENGINEERS (peers): Claude Code ↔ Codex CLI/App ↔ OMP ↔ Grok sandbox ↔ chat lane as author
                  │   (Claude Code and Codex CLI/App can merge; the others cannot)
                  ▼
CHIEF ENGINEER (peers): Claude Chat or ChatGPT  →  APPROVE / REQUEST CORRECTION
                  │
                  ▼
APPROVE from Chief Engineer chat OR Project Owner (Maris); author never approves
                  │
                  ▼
merge executed by Project Owner, Claude Code or Codex CLI/App → protected `main`
```

No model, agent, tool, passing test, deadline or previous decision skips the
APPROVE.

## 13. Sandbox lanes (Grok, and any chat lane without Git access)

- Open every session with a plain statement of sandbox limits: network access
  (npm, Google Fonts, image sites, documentation), what can be installed and run,
  whether a headless browser or Lighthouse can run, file size limits.
- Do not run, claim or imply Git actions (commit, push, branch, merge) or
  deployments. Status wording: `NOT DEPLOYED BY ENGINEER`, `NOTHING COMMITTED BY
  ENGINEER`.
- Deliver one OVERLAY ZIP: only the files that are new or changed, at their
  repository paths, plus a plain list of any files to delete. The Project Owner
  copies it over the repository and is never asked to delete whole folders. Also
  deliver plain-language Windows steps and the pull-request description (§7). No
  `node_modules`, `.next` or source books.
- The Owner steps must: use a feature branch; say where files go; say what
  `git status` should and should not show; give the commit message; include
  likely failure cases and their fixes; end by telling the Owner to send the
  pull-request link for review.
- Checks run in the sandbox (typecheck, lint, build, screenshots) are reported as
  sandbox evidence, not as live evidence.
- Never claim to have checked a document, website, issue or file that was not
  actually opened. If a needed file (for example a guidebook) cannot be found,
  stop and say so with the exact commands run and their output.
