# Domain Docs

This repo uses a single-context layout: `CONTEXT.md` at the repo root and ADRs in `docs/adr/`.

## Before exploring

- Read the root `CONTEXT.md` for domain terms.
- Read ADRs in `docs/adr/` that touch the area you are about to work in.

If these files do not exist, proceed silently. The `/domain-modeling` skill creates them lazily when terms or decisions get resolved.

## File structure

```text
/
├── CONTEXT.md
└── docs/
    └── adr/
        └── 0001-<decision-slug>.md
```

## Use the glossary's vocabulary

When naming a domain concept in an issue title, refactor proposal, hypothesis, or test name, use the term defined in `CONTEXT.md`.

If the concept is missing, reconsider whether it belongs to the project's language or note a real glossary gap for `/domain-modeling`.

## Flag ADR conflicts

If your output contradicts an existing ADR, identify the ADR and explain why its decision should be reopened.
