# Tasks: Curso-PSWE-07 To-Do List

**Input**: Design documents from `specs/001-todo-list/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/ui.md`, `quickstart.md`

**Tests**: Required by the project constitution. For each story, write failing
unit and acceptance tests before implementing the behavior they cover, then
follow Red-Green-Refactor. Keep tests fast and independent.

**Path convention**: Paths below are repository-relative. T001 selected
browser-native JavaScript and Node.js built-in tests.

## Phase 1: Setup

**Purpose**: Resolve the implementation prerequisite without assuming a
platform that the specification and workshop have not chosen.

- [X] T001 Record the selected responsive browser platform, JavaScript, Node.js 24.22.1, browser localStorage, and Node.js built-in `node:test` runner in `specs/001-todo-list/plan.md`
- [X] T002 Create the app and test directories, root `package.json` and `.gitignore`, and record `npm test`, `npm run lint`, and `npm start` in `specs/001-todo-list/quickstart.md`

---

## Phase 2: Foundational

**Purpose**: Establish the persistence boundary required by all stories.

- [ ] T003 Write a failing unit test for the replaceable task persistence interface in `tests/unit/task-store.test.js`
- [ ] T004 Implement the small persistence interface required by the constitution in `src/persistence/task-store.js` and make the contract test pass

**Checkpoint**: The implementation platform is recorded and task storage is
accessed through the required persistence interface. No UI may access storage
directly.

---

## Phase 3: User Story 1 - Organize and review tasks (Priority: P1)

**Goal**: Create tasks and review them in a list filtered by completion status.

**Independent Test**: Add tasks with and without descriptions, verify new tasks
are Pending, and verify All, Pending, and Done display only matching tasks.

### Tests for User Story 1

- [ ] T005 [P] [US1] Write failing unit tests for required titles, Pending as the initial status, and All/Pending/Done filtering in `tests/unit/task-list.test.js`
- [ ] T006 [P] [US1] Write failing unit tests proving saved task titles, descriptions, and statuses are restored after a close-and-reopen cycle in `tests/unit/local-task-store.test.js`
- [ ] T007 [P] [US1] Write failing acceptance tests for the app title, empty state, task creation and validation, filter selection, completed-row styling, opening a row, responsive list layout, and 44 by 44 CSS-pixel list and add-form controls in `tests/acceptance/task-list.test.js`

### Implementation for User Story 1

- [ ] T008 [US1] Implement the Task entity with required title, optional description, and Pending/Done status in `src/application/task.js`; reject missing or whitespace-only titles and impose no additional title-length limit
- [ ] T009 [US1] Implement the localStorage adapter behind `src/persistence/task-store.js` in `src/persistence/local-task-store.js` so task data survives closing and reopening
- [ ] T010 [US1] Implement task creation, listing, and All/Pending/Done filtering in `src/application/task-list.js` using the persistence interface
- [ ] T011 [US1] Implement the responsive list screen, application/window title, filters, task rows, empty states, completed-row styling, and Add task navigation in `src/ui/task-list.js` and `index.html`
- [ ] T012 [US1] Implement the reusable title and optional-description form, including whitespace-only title validation, in `src/ui/task-form.js`
- [ ] T013 [US1] Run the User Story 1 unit and acceptance tests in `tests/unit/task-list.test.js`, `tests/unit/local-task-store.test.js`, and `tests/acceptance/task-list.test.js`; make them pass without weakening assertions

**Checkpoint**: A user can create and find tasks, and saved tasks remain
available after reopening.

---

## Phase 4: User Story 2 - Review and update a task (Priority: P2)

**Goal**: View task details, edit content, and toggle completion status.

**Independent Test**: Open a task, inspect its details, save an edit, cancel an
unsaved edit, and toggle between Pending and Done.

### Tests for User Story 2

- [ ] T014 [P] [US2] Write failing unit tests for editing valid task details, rejecting missing or whitespace-only titles, cancel-safe saved values, and Pending/Done state transitions in `tests/unit/task-details.test.js`
- [ ] T015 [P] [US2] Write failing acceptance tests for task detail content, the missing-description label, prefilled Edit form, Save/Cancel, status-dependent action labels, responsive detail layout, and 44 by 44 CSS-pixel detail and edit-form controls in `tests/acceptance/task-details.test.js`

### Implementation for User Story 2

- [ ] T016 [US2] Implement task detail, valid edits, and completion-status transitions through `src/application/task-details.js` and persist changes using `src/persistence/task-store.js`
- [ ] T017 [US2] Implement the detail screen with back navigation, title, description or muted "No description", status label, Edit, and status-toggle actions in `src/ui/task-detail.js`
- [ ] T018 [US2] Extend `src/ui/task-form.js` to prefill the selected task and provide Save and Cancel; preserve saved values on Cancel and show validation for an empty title
- [ ] T019 [US2] Run the User Story 2 unit and acceptance tests in `tests/unit/task-details.test.js` and `tests/acceptance/task-details.test.js`; make them pass without weakening assertions

**Checkpoint**: Users can inspect and update task details and completion state;
the list reflects the saved state.

---

## Phase 5: User Story 3 - Remove a task and keep saved work (Priority: P3)

**Goal**: Delete tasks only after confirmation and retain all non-deleted
changes across application restarts.

**Independent Test**: Cancel a deletion and verify the task remains, confirm a
deletion and verify it is absent, then reopen the application and verify the
remaining task values and statuses.

### Tests for User Story 3

- [ ] T020 [P] [US3] Write failing unit tests for deleting the selected task and preserving saved task state when deletion is canceled in `tests/unit/task-deletion.test.js`
- [ ] T021 [P] [US3] Write failing acceptance tests for warning-styled Delete, confirmation, cancel, confirmed removal, and close/reopen persistence of edited and completed tasks in `tests/acceptance/task-lifecycle.test.js`

### Implementation for User Story 3

- [ ] T022 [US3] Implement deletion of the selected task through `src/application/task-deletion.js` and the persistence interface
- [ ] T023 [US3] Add a distinct warning-styled Delete action and explicit confirmation to `src/ui/task-detail.js`; cancel must preserve the task and confirmation must remove it from the list
- [ ] T024 [US3] Run the User Story 3 unit and acceptance tests in `tests/unit/task-deletion.test.js` and `tests/acceptance/task-lifecycle.test.js`; make them pass without weakening assertions

**Checkpoint**: Deletion is confirmed and durable; retained tasks preserve their
latest saved titles, descriptions, and statuses after reopening.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify shared quality requirements and the end-to-end walkthrough.

- [ ] T025 [P] Run and review the responsive and accessibility acceptance tests in `tests/acceptance/task-list.test.js` and `tests/acceptance/task-details.test.js` to verify every list, detail, add, and edit control is at least 44 by 44 CSS pixels, contrast meets WCAG 2.2 AA, and all three screen/form layouts work without horizontal overflow at 320 by 568 CSS pixels and 1280 by 800 CSS pixels
- [ ] T026 Run `npm test`, `npm run lint`, and `npm start` from the repository root; record validation results in `specs/001-todo-list/quickstart.md`
- [ ] T027 Review the implemented screens and task fields against FR-017 in `specs/001-todo-list/spec.md`; verify accounts, categories, due dates, priorities, search, and synchronization are absent and record the review in `specs/001-todo-list/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001 records the selected stack; T002 creates the
  project structure and documents runnable commands before implementation.
- **Foundational (Phase 2)**: Depends on Setup. The persistence contract must
  pass before user stories use storage.
- **User Story 1 (Phase 3)**: Depends on the foundation; establishes task
  creation, listing, filtering, and local save/restore.
- **User Story 2 (Phase 4)**: Depends on User Story 1's Task, list, and storage
  behavior.
- **User Story 3 (Phase 5)**: Depends on User Story 2's selected-task detail
  flow and the local persistence behavior from User Story 1.
- **Polish (Phase 6)**: Depends on all three user stories. T025, T026, and T027
  run after implementation; T002 records the selected stack's commands.

### User Story Dependencies

- **US1 (P1)**: Starts after Setup and Foundational phases.
- **US2 (P2)**: Starts after US1; it edits and toggles tasks created and opened
  through the list.
- **US3 (P3)**: Starts after US2; its delete confirmation is part of the task
  detail flow.

### Parallel Opportunities

- T005, T006, and T007 are separate User Story 1 test files and can be authored
  in parallel after the project test setup exists.
- T014 and T015 are separate User Story 2 test files and can be authored in
  parallel after US1 completes.
- T020 and T021 are separate User Story 3 test files and can be authored in
  parallel after US2 completes.
- User stories are intentionally sequential because the plan has the detail
  and deletion flows build on the list and selected-task behavior.
- T025 and T027 can proceed independently after the user stories are complete.
  T026 runs the commands documented by T002.

## Parallel Example: User Story 1

```text
Task: T005 - Write task validation and filtering unit tests in tests/unit/task-list
Task: T006 - Write local task restoration unit tests in tests/unit/local-task-store
Task: T007 - Write list journey acceptance tests in tests/acceptance/task-list
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases, including the selected platform and
   runtime and a failing persistence contract test.
2. Complete User Story 1 tests before its model, persistence, application, and
   UI implementation.
3. Stop and validate creation, persistence, empty states, and filters against
   the independent test criteria.
4. The course does not require students to implement the application, but this
   feature's task plan describes the work required if the requested app is built.

### Incremental Delivery

1. Complete US1 and validate its independent acceptance criteria.
2. Add US2 and validate details, edit/cancel, and status transitions.
3. Add US3 and validate confirmation, deletion, and persistence.
4. Run the cross-cutting responsive/accessibility checks and all required
   quality gates.

## Notes

- Every task uses the required checkbox, sequential ID, optional parallel
  marker, required user-story label in story phases, and an explicit path.
- Source paths use browser-native JavaScript modules; tests use Node.js built-in
  `node:test` and introduce no third-party dependencies.
- Tests are required by the constitution and must fail before corresponding
  production behavior is implemented.
- No accounts, categories, due dates, priorities, search, or synchronization
  are included.
