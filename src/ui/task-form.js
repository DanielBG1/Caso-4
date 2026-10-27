import { escapeHtml } from "./html.js";

export function renderTaskForm(task = null) {
  const editing = Boolean(task);
  return `
    <div class="modal-backdrop">
      <section class="form-panel" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <h2 id="form-title">${editing ? "Edit task" : "Add a task"}</h2>
        <form data-task-form>
          <label for="task-title">Title</label>
          <input id="task-title" name="title" type="text" autocomplete="off"
            value="${escapeHtml(task?.title ?? "")}" aria-required="true" aria-describedby="title-error">
          <p id="title-error" class="form-error" role="alert" hidden></p>
          <label for="task-description">Description <span class="optional">(optional)</span></label>
          <textarea id="task-description" name="description" rows="4">${escapeHtml(task?.description ?? "")}</textarea>
          <div class="form-actions">
            <button class="button button--primary" type="submit">${editing ? "Save" : "Add task"}</button>
            <button class="button button--secondary" type="button" data-action="cancel-form">Cancel</button>
          </div>
        </form>
      </section>
    </div>`;
}
