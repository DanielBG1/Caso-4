import assert from "node:assert/strict";
import test from "node:test";
import { createTask } from "../../src/application/task-list.js";
import { LocalTaskStore } from "../../src/persistence/local-task-store.js";

class MemoryStorage {
  values = new Map();

  getItem(key) {
    return this.values.get(key) ?? null;
  }

  setItem(key, value) {
    this.values.set(key, value);
  }
}

test("local store restores task titles, descriptions, and statuses", () => {
  const storage = new MemoryStorage();
  const firstSession = new LocalTaskStore(storage);
  const tasks = [
    { ...createTask({ title: "Read", description: "Chapter 2" }), status: "done" },
    createTask({ title: "Walk" }),
  ];

  firstSession.save(tasks);

  const reopenedSession = new LocalTaskStore(storage);
  assert.deepEqual(reopenedSession.load(), tasks);
});

test("local store reports invalid saved data instead of hiding corruption", () => {
  const storage = new MemoryStorage();
  storage.setItem("curso-pswe-07.tasks", "{invalid");

  assert.throws(() => new LocalTaskStore(storage).load(), /stored tasks/i);
});
