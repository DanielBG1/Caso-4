import assert from "node:assert/strict";
import test from "node:test";
import { removeTask } from "../../src/application/task-deletion.js";

test("removeTask removes only the selected task", () => {
  const tasks = [{ id: "1" }, { id: "2" }];

  assert.deepEqual(removeTask(tasks, "1"), [{ id: "2" }]);
  assert.deepEqual(tasks, [{ id: "1" }, { id: "2" }]);
});

test("removeTask rejects an unknown task instead of silently succeeding", () => {
  assert.throws(() => removeTask([{ id: "1" }], "missing"), /task not found/i);
});
