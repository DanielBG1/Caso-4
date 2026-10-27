import { escapeHtml } from "./html.js";

export function renderTaskDetail(task) {
  const done = task.status === "done";
  return `
    <section class="task-detail-screen" aria-labelledby="task-detail-title">
      <button class="back-button" type="button" data-action="back">‹ <span>Back to tasks</span></button>
      <article class="detail-card">
        <span class="status-label${done ? " status-label--done" : ""}">${done ? "Done" : "Pending"}</span>
        <h1 id="task-detail-title">${escapeHtml(task.title)}</h1>
        <p class="detail-description">${task.description ? escapeHtml(task.description) : '<span class="muted">No description</span>'}</p>
        <div class="detail-actions">
          <button class="button button--secondary" type="button" data-action="edit">Edit</button>
          <button class="button button--primary" type="button" data-action="toggle-status">${done ? "Mark as not done" : "Mark as done"}</button>
          <button class="button button--warning" type="button" data-action="delete">Delete</button>
        </div>
      </article>
    </section>`;
}

export function renderDeleteConfirmation(task) {
  return `
    <div class="modal-backdrop">
      <section class="form-panel confirmation-panel" role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
        <h2 id="delete-title">Delete this task?</h2>
        <p>“${escapeHtml(task.title)}” will be permanently removed.</p>
        <div class="form-actions">
          <button class="button button--warning" type="button" data-action="confirm-delete">Delete task</button>
          <button class="button button--secondary" type="button" data-action="cancel-delete">Cancel</button>
        </div>
      </section>
    </div>`;
}
