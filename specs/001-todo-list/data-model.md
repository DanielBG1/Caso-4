# Data Model: Curso-PSWE-07 To-Do List

## Task

Represents one item the user wants to track.

| Field | Meaning | Rules |
|-------|---------|-------|
| Title | Short task name shown in the list and detail screen. | Required. Missing or whitespace-only titles are rejected on create and edit (FR-003, FR-004). No additional length rule is specified. |
| Description | Optional additional task detail. | May be absent or empty. The detail screen shows muted "No description" when absent (FR-008). |
| Completion status | Whether the task is complete. | One of Pending or Done. New tasks are Pending (FR-003, FR-005). |

## Relationships

- The application has one local task list for one user on one device.
- Each task belongs to that list; no categories, accounts, or shared ownership
  are defined.

## State transitions

```text
Create -> Pending
Pending --Mark as done--> Done
Done --Mark as not done--> Pending
Pending or Done --confirmed delete--> Removed
```

Canceling deletion leaves the task in its previous state. Canceling an edit
leaves the saved title and description unchanged. Deleted tasks are not
restored by reopening the application.

## Persistence and validation

- Saved tasks and their title, description, and status persist across a normal
  close and reopen (FR-012).
- Persistence is local and accessed through a small interface; the concrete
  storage format is deferred.
- A task must not be reported as saved before its values are durably accepted
  by the chosen local storage.
- Changes to status and task details apply to the task selected by the user.
- No sorting rule, title length limit, description length limit, or task-count
  limit is specified.
