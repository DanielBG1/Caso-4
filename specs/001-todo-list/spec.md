# Feature Specification: Curso-PSWE-07 To-Do List

**Feature Branch**: Not created (no branch hook configured)

**Created**: 2026-10-26

**Status**: Draft

**Input**: User description: "Build a simple to-do list application named Curso-PSWE-07 for organizing and tracking daily tasks. Provide a task list with All, Pending, and Done filters; add, view, edit, complete, and delete tasks; preserve tasks after closing and reopening the application. Each task has a required title, optional description, and completion status. Use a clean, responsive, accessible visual design with clear empty states, confirmation before deletion, and title validation. Exclude accounts, categories, due dates, priorities, search, and sync."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Organize and review tasks (Priority: P1)

As a person managing daily tasks, I want to add tasks and review them in a filtered list so that I can see what needs attention.

**Why this priority**: Creating and finding tasks is the core value of the application and provides a useful standalone experience.

**Independent Test**: Add tasks with and without descriptions, view the list, and switch between All, Pending, and Done to verify the displayed tasks.

**Acceptance Scenarios**:

1. **Given** there are no saved tasks, **When** the user opens the list, **Then** the app shows a friendly empty state and an Add task action.
2. **Given** the user is on the task list, **When** they add a task with a non-empty title and optional description, **Then** the task appears in the list as Pending.
3. **Given** the user submits a task with an empty or whitespace-only title, **When** they save it, **Then** the task is not created and a title validation message is shown.
4. **Given** tasks with different completion statuses exist, **When** the user selects All, Pending, or Done, **Then** the list shows all tasks, only pending tasks, or only completed tasks, respectively, and highlights the active filter.
5. **Given** the selected filter has no matching tasks, **When** the list is displayed, **Then** the app shows a friendly empty state that reflects that no tasks match the filter.
6. **Given** the task list contains tasks, **When** the user views a row, **Then** it shows a status indicator and title, and completed task titles appear with strikethrough and muted color.
7. **Given** a task is displayed in the list, **When** the user selects its row, **Then** the detail screen for that task opens.
8. **Given** the user opens the task list, **When** the screen is displayed, **Then** "Curso-PSWE-07" appears in the header and as the application or window title.
9. **Given** the task list is displayed, **When** the user views its visual design, **Then** it uses a light background, generous whitespace, one sans-serif font family, one accent color for primary actions and the active filter, titles larger and bolder than descriptions, and sufficient text contrast.

---

### User Story 2 - Review and update a task (Priority: P2)

As a person tracking a task, I want to view its details, edit its content, and change its completion status so that the list reflects its current state.

**Why this priority**: Reviewing and updating existing tasks keeps the task list accurate after tasks have been created.

**Independent Test**: Open a saved task, verify its details and status, edit and cancel or save changes, and toggle its completion status.

**Acceptance Scenarios**:

1. **Given** a task exists, **When** the user opens it, **Then** the detail screen shows a back control, prominent title, description, and a visible Done or Pending status.
2. **Given** a task has no description, **When** its detail screen is displayed, **Then** the description area shows muted "No description" text.
3. **Given** the user is viewing a task, **When** they choose Edit, **Then** the add-task form is shown with the task's current title and description and Save and Cancel actions.
4. **Given** the user edits a task, **When** they save a non-empty title, **Then** the updated title and description are shown in the detail screen and list.
5. **Given** the user edits a task, **When** they clear its title and save, **Then** the task is not saved with an empty title and a validation message is shown.
6. **Given** the user changes a task but has not saved, **When** they choose Cancel, **Then** the previous saved task values remain unchanged.
7. **Given** a Pending task is open, **When** the user chooses Mark as done, **Then** its status changes to Done.
8. **Given** a Done task is open, **When** the user chooses Mark as not done, **Then** its status changes to Pending.
9. **Given** the application is viewed at 320 by 568 CSS pixels or 1280 by 800 CSS pixels, **When** the user interacts with the list, detail, or add/edit form, **Then** the layout adapts without horizontal overflow and every touch or click target is at least 44 by 44 CSS pixels.

---

### User Story 3 - Remove a task and keep saved work (Priority: P3)

As a person maintaining a task list, I want to remove unwanted tasks safely and find my remaining tasks after reopening the app so that my list stays useful over time.

**Why this priority**: Safe deletion and persistence support ongoing use while protecting against accidental loss.

**Independent Test**: Delete a task after confirming, cancel a deletion to verify the task remains, and close and reopen the app to verify that remaining tasks and statuses are retained.

**Acceptance Scenarios**:

1. **Given** a task is open, **When** the user chooses Delete, **Then** a confirmation prompt appears before the task is removed.
2. **Given** the deletion confirmation is displayed, **When** the user cancels, **Then** the task remains available and unchanged.
3. **Given** the deletion confirmation is displayed, **When** the user confirms, **Then** the task is removed and no longer appears in the list.
4. **Given** tasks have been saved, **When** the user closes and reopens the application, **Then** all tasks not deleted remain with their saved titles, descriptions, and completion statuses.
5. **Given** the user views a task's detail screen, **When** they locate the Delete action, **Then** it is visually distinct using a warning color.

### Edge Cases

- The list has no tasks, or the selected filter has no matching tasks.
- A title is empty or consists only of whitespace when a new or edited task is saved.
- A task description is omitted or empty.
- A user cancels editing after making unsaved changes.
- A user cancels a deletion confirmation.
- The list contains many tasks and must remain usable with responsive layout and clear task rows.
- The application is reopened after task changes have been saved.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST be named "Curso-PSWE-07" and show that name in the task list header and the application or window title.
- **FR-002**: The application MUST show a task list with filters named All, Pending, and Done; selecting a filter MUST show only the corresponding tasks and visibly highlight the active filter.
- **FR-003**: The application MUST allow a user to create a task with a required title and optional description; a newly created task MUST have Pending status.
- **FR-004**: The application MUST reject a missing or whitespace-only title on task creation and editing, and MUST show a validation message without saving the invalid task.
- **FR-005**: Each task MUST have a title, an optional description, and a completion status of Done or Pending.
- **FR-006**: Each task row MUST show a status indicator and title; a completed task title MUST use strikethrough and muted color.
- **FR-007**: Selecting a task row MUST open a detail screen for that task.
- **FR-008**: The detail screen MUST show a back control, the task title, its description or muted "No description" text when absent, and a visible Done or Pending status label.
- **FR-009**: The detail screen MUST provide Edit, a status-toggle action labeled Mark as done or Mark as not done as appropriate to the current status, and Delete.
- **FR-010**: Editing MUST reuse the title and description form, prefilled with the task's current values, and provide Save and Cancel actions. Cancel MUST discard unsaved changes.
- **FR-011**: Deleting a task MUST require explicit confirmation; canceling confirmation MUST leave the task unchanged, and confirming MUST remove it from the list.
- **FR-012**: The application MUST retain saved tasks and their titles, descriptions, and completion statuses when closed and reopened, until the tasks are deleted.
- **FR-013**: The application MUST show a short, friendly empty state when the task list is empty or when the active filter has no matching tasks.
- **FR-014**: The visual design MUST use a light background, generous whitespace, one sans-serif font family, and a single accent color for primary actions and the active filter. Titles MUST be larger and bolder than descriptions. Text contrast MUST meet WCAG 2.2 AA: at least 4.5:1 for normal text and 3:1 for large text (at least 18 pt regular or 14 pt bold).
- **FR-015**: Interactive controls MUST have touch or click targets of at least 44 by 44 CSS pixels. At viewport sizes of 320 by 568 CSS pixels and 1280 by 800 CSS pixels, the list, detail, and add/edit form layouts MUST adapt without horizontal overflow.
- **FR-016**: The Delete action MUST use a distinct warning color.
- **FR-017**: The application MUST NOT include accounts, categories, due dates, priorities, search, or synchronization.

### Key Entities

- **Task**: A user-managed item with a required title, optional description, and Done or Pending completion status. Saved tasks remain available after the application is closed and reopened unless deleted.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a usability check with five first-time users who have not received app-specific instructions, at least four can add a task and find it in the list within one minute without assistance.
- **SC-002**: For each of the All, Pending, and Done filters, every displayed task matches that filter and no non-matching task is displayed.
- **SC-003**: In a validation check, 100% of attempts to save a missing or whitespace-only title show a validation message and leave task data unchanged.
- **SC-004**: In a persistence check, 100% of saved, non-deleted tasks retain their title, description, and status after closing and reopening the application.
- **SC-005**: Every interactive control is at least 44 by 44 CSS pixels; at 320 by 568 CSS pixels and 1280 by 800 CSS pixels, all three screens fit without horizontal overflow and normal text meets a 4.5:1 contrast ratio while large text (at least 18 pt regular or 14 pt bold) meets 3:1.
- **SC-006**: In a deletion check, canceling confirmation preserves the task and confirming deletion removes it from the list.

## Assumptions

- The application serves one user's task list on the device where it is used; accounts and synchronization are explicitly out of scope.
- For SC-001, first-time users means people who have not used this application or received instructions about it; participants can use common touch or pointer-based applications.
- Saved task data remains available on that device until the user deletes the task; no separate expiration period is required.
- A task title containing only whitespace is treated as empty.
- The acceptance tests evaluate user-visible behavior and outcomes without requiring a particular implementation technology.
