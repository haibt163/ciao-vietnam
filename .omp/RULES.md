# OMP Rules — Ciao Vietnam

Short tripwires. The reasons and project-specific requirements are in
`AGENTS.md`, `AGENTS.project.md`, and `.omp/AGENTS.md`; all apply.

## Before work
1. Read `AGENTS.md`, `AGENTS.project.md` and `docs/HANDOVER.md`.
2. Inspect current Git status, branch and latest repository state.
3. Repository evidence outranks an earlier report or chat.

## Never
- merge to `main`, force-push, rewrite history, or bypass a review/approval gate;
- approve a change you authored, or treat a green test as approval to merge;
- claim a check passed without running it and recording its actual result;
- weaken/bypass a failed safeguard or invent provenance, credits, license terms,
  source URLs or research facts;
- commit the source ebooks (PDF/EPUB), private license records, secrets, or
  credentials;
- copy guidebook sentences into user-visible descriptions;
- use guidebook images/artwork outside the scope of the Owner-confirmed license;
- leave existing photo/art references unaccounted for in an authorized full-media
  refresh, or silently upscale low-resolution sources;
- let two agents edit the same worktree at once;
- mix unrelated refactors or dependency changes into the task;
- change unrelated files just because they look stale.

## Git and evidence
Before committing, inspect `git status` and `git diff`.
After committing, inspect `git status` and `git log --oneline --decorate -3`.
Use `VERIFIED`, `FAILED`, `UNVERIFIED` and `Owner decision` consistently.
Read-only tasks end with `NO APPLICATION CODE CHANGES.`
