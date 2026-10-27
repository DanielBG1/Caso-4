<!--
Sync Impact Report
Version change: unversioned scaffold -> 1.0.0 (initial adoption)
Modified principles: replaced all scaffold placeholders with six requested principles
Added sections: none
Removed sections: unused generic template sections
Follow-up TODOs: none
-->
# Curso-PSWE-07 Constitution

## Core Principles

### I. Simplicity First (YAGNI)
Implementers MUST deliver only what the spec requires, choose the simplest working solution, and MUST NOT add speculative features, abstractions, options, or dependencies. Plans MUST justify added complexity in writing. Rationale: avoiding unneeded complexity keeps delivery focused and maintainable.

### II. Simple, Clear Design
Code MUST use small, single-responsibility functions and modules with clear names; duplication MUST be removed only when it is real, and abstractions MUST NOT be built for a single use or for premature optimization. Rationale: straightforward design is easier to understand and change.

### III. Structured Architecture
The application MUST separate UI, application logic, and persistence, with dependencies flowing UI → logic → persistence; UI MUST NOT access storage directly, and persistence MUST be hidden behind a small interface that can be replaced or faked in tests. Rationale: clear boundaries support independent testing and change.

### IV. Test-Driven Development (NON-NEGOTIABLE)
Production code MUST follow Red-Green-Refactor: write a failing test first, make it pass with the minimum code, then refactor; no production code may be added without a test that required it. Business logic MUST have unit tests, each user story MUST have at least one acceptance test mirroring its acceptance scenarios, and tests MUST be fast and independent. Rationale: test-first development verifies behavior while keeping feedback reliable.

### V. Spec Is the Source of Truth
Every implementation task MUST trace to a spec requirement; anything absent from the spec is out of scope, and ambiguous requirements MUST be clarified before implementation. Rationale: traceability prevents unapproved scope and mismatched expectations.

### VI. Dependencies and Quality
The project MUST prefer the standard library and platform features; a third-party dependency may be added only when it clearly removes more complexity than it adds. Code MUST pass linting and all tests before it is considered done. Rationale: restrained dependencies and explicit quality gates reduce maintenance risk.

## Governance

This constitution overrides other practices. Amendments MUST include a written rationale and a semantic version bump: MAJOR for incompatible changes, MINOR for added or materially expanded principles, and PATCH for non-semantic clarifications. Plans MUST include a Constitution Check that verifies compliance before implementation begins, and reviews MUST verify compliance with these principles.

**Version**: 1.0.0 | **Ratified**: 2026-10-26 | **Last Amended**: 2026-10-26
