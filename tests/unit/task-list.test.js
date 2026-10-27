import assert from "node:assert/strict";
import test from "node:test";
import { createTask, filterTasks } from "../../src/application/task-list.js";

test("new tasks require a non-whitespace title and start Pending", () => {
  const task = createTask({ title: "  Buy milk  ", description: "  Today  " });

  assert.equal(task.title, "Buy milk");
  assert.equal(task.description, "Today");
  assert.equal(task.status, "pending");
  assert.ok(task.id);
  assert.throws(() => createTask({ title: " \t " }), /title is required/i);
});

test("missing descriptions are stored as empty text", () => {
  assert.equal(createTask({ title: "Call home" }).description, "");
});

test("filters return only tasks in the selected completion status", () => {
  const tasks = [
    { id: "1", status: "pending" },
    { id: "2", status: "done" },
    { id: "3", status: "pending" },
  ];

  assert.equal(filterTasks(tasks, "all").length, 3);
  assert.deepEqual(filterTasks(tasks, "pending").map((task) => task.id), ["1", "3"]);
  assert.deepEqual(filterTasks(tasks, "done").map((task) => task.id), ["2"]);
  assert.throws(() => filterTasks(tasks, "urgent"), /filter/i);
});
