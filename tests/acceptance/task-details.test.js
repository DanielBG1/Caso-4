import assert from "node:assert/strict";
import test from "node:test";
import { createTask } from "../../src/application/task-list.js";
import { toggleTaskStatus, updateTask } from "../../src/application/task-details.js";
import { renderTaskDetail } from "../../src/ui/task-detail.js";
import { renderTaskForm } from "../../src/ui/task-form.js";

test("US2: detail shows task state and edit supports save and cancel semantics", () => {
  const task = createTask({ title: "Read notes" });
  const detail = renderTaskDetail(task);
  assert.match(detail, /No description/);
  assert.match(detail, /Pending/);
  assert.match(detail, /Mark as done/);
  assert.match(renderTaskForm(task), /value="Read notes"/);
  assert.match(renderTaskForm(task), /data-action="cancel-form"/);
  assert.match(renderTaskDetail({ ...task, status: "done" }), /Mark as not done/);

  const edited = updateTask(task, { title: "Review notes", description: "Page 4" });
  assert.equal(edited.title, "Review notes");
  assert.equal(task.title, "Read notes");
  assert.equal(toggleTaskStatus(task).status, "done");
});
