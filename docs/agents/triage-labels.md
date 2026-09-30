# Triage Labels

The five canonical triage roles map directly to the strings in local issues' `Status:` lines.

| Canonical role | Tracker string | Meaning |
| --- | --- | --- |
| `needs-triage` | `needs-triage` | Maintainer needs to evaluate this issue |
| `needs-info` | `needs-info` | Waiting on reporter for more information |
| `ready-for-agent` | `ready-for-agent` | Fully specified, ready for an AFK agent |
| `ready-for-human` | `ready-for-human` | Requires human implementation |
| `wontfix` | `wontfix` | Will not be actioned |

When a skill mentions a triage role, use the corresponding tracker string from this table. Wayfinder tickets use the separate lifecycle defined in `issue-tracker.md`.

Edit the tracker string column to match the vocabulary you use.
