import { TaskStore } from "./task-store.js";

const STORAGE_KEY = "curso-pswe-07.tasks";

export class LocalTaskStore extends TaskStore {
  constructor(storage) {
    super();
    this.storage = storage;
  }

  load() {
    const savedTasks = this.storage.getItem(STORAGE_KEY);
    if (savedTasks === null) {
      return [];
    }

    let tasks;
    try {
      tasks = JSON.parse(savedTasks);
    } catch (error) {
      throw new Error("Unable to read stored tasks", { cause: error });
    }

    if (!Array.isArray(tasks)) {
      throw new Error("Unable to read stored tasks: expected a task list");
    }

    return tasks;
  }

  save(tasks) {
    this.storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
}
