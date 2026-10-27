import assert from "node:assert/strict";
import test from "node:test";
import { updateTask, toggleTaskStatus } from "../../src/application/task-details.js";

const task = {
  id: "task-1",
  title: "Original",
  description: "First description",
  status: "pending",
};

test("editing updates title and description while preserving identity and status", () => {
  assert.deepEqual(
    updateTask(task, { title: " Revised ", description: " Updated " }),
    { id: "task-1", title: "Revised", description: "Updated", status: "pending" },
  );
});

test("editing rejects an empty title without changing the saved task", () => {
  assert.throws(() => updateTask(task, { title: "  ", description: "" }), /title is required/i);
  assert.equal(task.title, "Original");
  assert.equal(task.description, "First description");
});

test("status toggles between pending and done", () => {
  assert.equal(toggleTaskStatus(task).status, "done");
  assert.equal(toggleTaskStatus({ ...task, status: "done" }).status, "pending");
});
