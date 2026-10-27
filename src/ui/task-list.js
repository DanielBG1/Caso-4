import { escapeHtml } from "./html.js";

const FILTERS = [
  ["all", "All"],
  ["pending", "Pending"],
  ["done", "Done"],
];

export function renderTaskList(tasks, activeFilter = "all") {
  const content = tasks.length
    ? `<ul class="task-list">${tasks.map(renderTaskRow).join("")}</ul>`
    : `<div class="empty-state"><p>${activeFilter === "all" ? "No tasks yet." : "No tasks match this filter."}</p><p>Add a task to keep your day on track.</p></div>`;

  return `
    <section class="task-list-screen" aria-labelledby="app-name">
      <header class="app-header">
        <div>
          <p class="eyebrow">Your day, organized</p>
          <h1 id="app-name">Curso-PSWE-07</h1>
        </div>
        <button class="button button--primary" type="button" data-action="add">Add task</button>
      </header>
      <nav class="filters" aria-label="Filter tasks">
        ${FILTERS.map(([value, label]) => `
          <button class="filter-button${activeFilter === value ? " is-active" : ""}"
            type="button" data-action="filter" data-filter="${value}"
            aria-pressed="${activeFilter === value}">${label}</button>`).join("")}
      </nav>
      ${content}
    </section>`;
}

function renderTaskRow(task) {
  const done = task.status === "done";
  return `
    <li>
      <button class="task-row" type="button" data-action="open" data-task-id="${escapeHtml(task.id)}">
        <span class="status-indicator${done ? " is-done" : ""}" role="img" aria-label="${done ? "Done" : "Pending"}"></span>
        <span class="task-title${done ? " task-title--done" : ""}">${escapeHtml(task.title)}</span>
        <span class="task-chevron" aria-hidden="true">›</span>
      </button>
    </li>`;
}
