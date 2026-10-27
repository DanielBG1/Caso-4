# Quickstart Validation: Curso-PSWE-07 To-Do List

## Status and prerequisites

The app uses Node.js 24.22.1 for its built-in test runner and static development
server. It has no third-party dependencies.

From the repository root:

```powershell
npm test
npm run lint
npm start
```

Open `http://localhost:4173` in a browser. Stop the local server with Ctrl+C.
The app stores tasks in that browser's local storage.

For manual validation, use an implementation that satisfies
[the UI contract](./contracts/ui.md). For entity and state expectations, see
[the data model](./data-model.md). Automated implementation tests must follow
the project's test-first constitution.

## End-to-end acceptance walkthrough

1. Launch the application at 320 by 568 CSS pixels and 1280 by 800 CSS pixels.
   Verify the header and application/window title say "Curso-PSWE-07", all
   three screens avoid horizontal overflow, normal text contrast is at least
   4.5:1, and large text (at least 18 pt regular or 14 pt bold) contrast is at
   least 3:1. Verify every interactive target is at least 44 by 44 CSS pixels.
   Include list, detail, and add/edit form controls.
2. With no tasks saved, verify the list shows a friendly empty state and an
   Add task action.
3. Add a task with a title and no description. Verify it appears as Pending.
   Open it and verify "No description" is shown.
4. Attempt to add a blank or whitespace-only title. Verify the validation
   message appears and no task is added.
5. Add a second task with a description. Verify All shows both tasks, Pending
   shows both, and Done shows neither with an appropriate empty state.
6. Open the second task, edit its title and description, then Cancel. Verify
   its saved values remain unchanged. Edit again, Save valid changes, and
   verify the saved values appear in detail and list.
7. Attempt to save the edited task with a whitespace-only title. Verify the
   validation message appears and the last valid saved values remain intact.
8. Mark one task Done. Verify its detail label and action label update, then
   verify Done includes it and Pending excludes it. Mark it Pending again and
   verify the inverse.
9. Choose Delete and cancel the confirmation. Verify the task remains. Choose
   Delete again and confirm; verify the task is removed from the list.
10. Close and reopen the application. Verify all remaining tasks retain their
    latest saved titles, descriptions, and statuses, and the deleted task is
    still absent.
11. Review the completed application against FR-017 in `spec.md`; verify it
    provides no accounts, categories, due dates, priorities, search, or sync.

## Automated validation to provide with implementation

- Write a failing test before each production behavior is implemented, then
  follow Red-Green-Refactor.
- Provide business-logic unit tests for title validation, filtering, and status
  transitions.
- Provide at least one independent acceptance test for each user story in
  `spec.md`, covering list/create/filter, detail/edit/status, and
  confirmation/deletion/persistence.
- All acceptance tests run using `npm test`; `npm run lint` syntax-checks the
  app and test JavaScript files. Both commands must pass before implementation
  is considered done.
