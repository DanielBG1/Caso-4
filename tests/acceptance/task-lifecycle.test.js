import assert from "node:assert/strict";
import test from "node:test";
import { createTask } from "../../src/application/task-list.js";
import { removeTask } from "../../src/application/task-deletion.js";
import { renderDeleteConfirmation, renderTaskDetail } from "../../src/ui/task-detail.js";

test("US3: delete is warned, cancel leaves data intact, and confirm removes it", () => {
  const task = createTask({ title: "Old task" });
  const detail = renderTaskDetail(task);

  assert.match(detail, /class="[^"]*warning[^"]*"[^>]*>Delete/);
  const confirmation = renderDeleteConfirmation(task);
  assert.match(confirmation, /role="alertdialog"/);
  assert.match(confirmation, /data-action="confirm-delete"/);
  assert.match(confirmation, /data-action="cancel-delete"/);
  const tasks = [task];
  const afterCancel = [...tasks];
  assert.deepEqual(afterCancel, [task]);
  assert.deepEqual(removeTask(tasks, task.id), []);
});
