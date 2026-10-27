import { TaskListService } from "../application/task-list.js";
import { LocalTaskStore } from "../persistence/local-task-store.js";
import { renderDeleteConfirmation, renderTaskDetail } from "./task-detail.js";
import { renderTaskForm } from "./task-form.js";
import { renderTaskList } from "./task-list.js";
import { escapeHtml } from "./html.js";

export function startApp({ root, storage }) {
  const state = {
    filter: "all",
    selectedTaskId: null,
    formMode: null,
    deleteConfirmation: false,
    formError: "",
    appError: "",
  };
  let tasks;

  try {
    tasks = new TaskListService(new LocalTaskStore(storage));
  } catch (error) {
    root.innerHTML = `<p class="app-error" role="alert">Tasks could not be loaded: ${escapeHtml(error.message)}</p>`;
    return;
  }

  function render() {
    const selectedTask = state.selectedTaskId ? tasks.get(state.selectedTaskId) : null;
    if (state.selectedTaskId && !selectedTask) {
      state.selectedTaskId = null;
      state.deleteConfirmation = false;
    }

    let screen;
    if (selectedTask) {
      screen = renderTaskDetail(selectedTask)
        + (state.deleteConfirmation ? renderDeleteConfirmation(selectedTask) : "");
    } else {
      screen = renderTaskList(tasks.list(state.filter), state.filter);
    }

    root.innerHTML = (state.appError
      ? `<p class="app-error" role="alert">${escapeHtml(state.appError)}</p>`
      : "") + screen;
    if (state.formMode) {
      const task = state.formMode === "edit" ? tasks.get(state.selectedTaskId) : null;
      root.insertAdjacentHTML("beforeend", renderTaskForm(task));
      if (state.formError) {
        const errorMessage = root.querySelector("#title-error");
        errorMessage.textContent = state.formError;
        errorMessage.hidden = false;
      }
      root.querySelector("#task-title")?.focus();
    }
  }

  function perform(operation) {
    try {
      operation();
      state.appError = "";
      render();
    } catch (error) {
      state.appError = `Unable to save this change: ${error.message}`;
      render();
    }
  }

  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const { action, taskId, filter } = button.dataset;
    switch (action) {
      case "add":
        state.formMode = "create";
        state.formError = "";
        render();
        break;
      case "open":
        state.selectedTaskId = taskId;
        render();
        break;
      case "filter":
        state.filter = filter;
        render();
        break;
      case "back":
        state.selectedTaskId = null;
        render();
        break;
      case "edit":
        state.formMode = "edit";
        state.formError = "";
        render();
        break;
      case "cancel-form":
        state.formMode = null;
        state.formError = "";
        render();
        break;
      case "toggle-status":
        perform(() => tasks.toggleStatus(state.selectedTaskId));
        break;
      case "delete":
        state.deleteConfirmation = true;
        render();
        break;
      case "cancel-delete":
        state.deleteConfirmation = false;
        render();
        break;
      case "confirm-delete":
        try {
          tasks.delete(state.selectedTaskId);
          state.selectedTaskId = null;
          state.deleteConfirmation = false;
          state.appError = "";
          render();
        } catch (error) {
          state.appError = `Unable to save this change: ${error.message}`;
          render();
        }
        break;
      default:
        break;
    }
  });

  root.addEventListener("submit", (event) => {
    if (!event.target.matches("[data-task-form]")) return;
    event.preventDefault();
    const formData = new FormData(event.target);
    const fields = {
      title: formData.get("title"),
      description: formData.get("description"),
    };

    try {
      if (state.formMode === "edit") {
        tasks.update(state.selectedTaskId, fields);
      } else {
        tasks.create(fields);
      }
      state.formMode = null;
      state.formError = "";
      state.appError = "";
      render();
    } catch (error) {
      if (/title is required/i.test(error.message)) {
        state.formError = "Please enter a title.";
        render();
      } else {
        state.appError = `Unable to save this change: ${error.message}`;
        render();
      }
    }
  });

  render();
  return { tasks };
}
