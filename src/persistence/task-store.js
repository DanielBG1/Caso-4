export class TaskStore {
  load() {
    throw new Error("TaskStore subclasses must implement load");
  }

  save() {
    throw new Error("TaskStore subclasses must implement save");
  }
}
