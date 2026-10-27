import { updateTask, toggleTaskStatus } from "./task-details.js";
import { removeTask } from "./task-deletion.js";
import { createTask } from "./task.js";

export { createTask } from "./task.js";

const FILTERS = new Set(["all", "pending", "done"]);

export function filterTasks(tasks, filter = "all") {
  if (!FILTERS.has(filter)) {
    throw new Error(`Unknown task filter: ${filter}`);
  }
  if (filter === "all") {
    return [...tasks];
  }
  return tasks.filter((task) => task.status === filter);
}

export class TaskListService {
  constructor(store) {
    this.store = store;
    this.tasks = store.load();
  }

  list(filter = "all") {
    return filterTasks(this.tasks, filter);
  }

  get(id) {
    return this.tasks.find((task) => task.id === id) ?? null;
  }

  create(fields) {
    const task = createTask(fields);
    this.tasks = [...this.tasks, task];
    this.save();
    return task;
  }

  update(id, fields) {
    const task = this.requireTask(id);
    const updatedTask = updateTask(task, fields);
    this.tasks = this.tasks.map((current) => current.id === id ? updatedTask : current);
    this.save();
    return updatedTask;
  }

  toggleStatus(id) {
    const task = toggleTaskStatus(this.requireTask(id));
    this.tasks = this.tasks.map((current) => current.id === id ? task : current);
    this.save();
    return task;
  }

  delete(id) {
    this.tasks = removeTask(this.tasks, id);
    this.save();
  }

  requireTask(id) {
    const task = this.get(id);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }

  save() {
    this.store.save(this.tasks);
  }
}
