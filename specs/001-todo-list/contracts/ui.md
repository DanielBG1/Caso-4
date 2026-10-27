# User Interface Contract: Curso-PSWE-07 To-Do List

This contract describes observable interactions for the two specified screens.
It is not a public API contract; the feature defines no external system
interfaces.

## To-Do List

- The application/window title and list header identify the application as
  "Curso-PSWE-07".
- All, Pending, and Done filters select all tasks, pending tasks, and completed
  tasks, respectively. The selected filter is visibly highlighted.
- Each task row shows a status indicator and title. Done task titles use
  strikethrough and muted color.
- Selecting a row opens the corresponding task detail.
- Add task opens a form with a required title and optional description.
- Saving a missing or whitespace-only title shows a validation message and
  does not create a task.
- An empty list or a filter with no matching tasks shows a short, friendly
  empty state.

## To-Do Detail

- A back control returns to the list.
- The screen shows the task title, its description or muted "No description",
  and a Done or Pending status label.
- Edit opens the add-task form populated with the task's current title and
  description. Save applies valid changes; Cancel discards unsaved changes.
- Add and edit forms must expose usable title and description fields and
  44 by 44 CSS-pixel minimum Save and Cancel controls.
- The status action is labeled Mark as done for Pending tasks and Mark as not
  done for Done tasks. It changes only the selected task's status.
- Delete is visually distinct with a warning color and prompts for
  confirmation. Cancel preserves the task; confirmation removes it.

## Shared visual and accessibility expectations

- Use a light background, generous whitespace, one sans-serif font family, and
  a single accent color for primary actions and the selected filter.
- Titles are larger and bolder than descriptions; text has sufficient
  contrast: at least 4.5:1 for normal text and 3:1 for large text (at least
  18 pt regular or 14 pt bold) under WCAG 2.2 AA.
- Interactive targets, including list, detail, add, and edit controls, are at
  least 44 by 44 CSS pixels.
- List, detail, and add/edit form layouts adapt without horizontal overflow at
  320 by 568 CSS pixels and 1280 by 800 CSS pixels.
- Do not expose accounts, categories, due dates, priorities, search, or sync.
