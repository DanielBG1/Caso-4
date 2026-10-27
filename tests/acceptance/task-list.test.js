import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createTask, filterTasks } from "../../src/application/task-list.js";
import { renderTaskList } from "../../src/ui/task-list.js";
import { renderTaskForm } from "../../src/ui/task-form.js";

test("US1: list branding, empty state, task entry, and status filters are usable", async () => {
  const html = await readFile(new URL("../../index.html", import.meta.url), "utf8");
  assert.match(html, /<title>Curso-PSWE-07<\/title>/);
  const emptyList = renderTaskList([], "all");
  assert.match(emptyList, /<h1[^>]*>Curso-PSWE-07<\/h1>/);
  assert.match(emptyList, /No tasks yet/i);
  assert.match(emptyList, /aria-pressed="true">All/);
  assert.match(renderTaskList([], "done"), /No tasks match this filter/i);

  const task = createTask({ title: "Plan the week" });
  const pendingList = renderTaskList([task], "pending");
  assert.match(pendingList, /Plan the week/);
  assert.match(pendingList, /data-action="open"/);
  assert.match(pendingList, /aria-pressed="true">Pending/);
  assert.match(renderTaskList([{ ...task, status: "done" }]), /task-title--done/);
  assert.match(renderTaskList([{ ...task, title: "<unsafe>" }]), /&lt;unsafe&gt;/);
  assert.match(renderTaskForm(), /name="title"/);
  assert.match(renderTaskForm(), /name="description"/);
  const styles = await readFile(new URL("../../src/ui/styles.css", import.meta.url), "utf8");
  assert.match(styles, /button\s*\{[^}]*min-width:\s*44px/s);
  assert.match(styles, /button\s*\{[^}]*min-height:\s*44px/s);
  assert.match(styles, /@media\s*\(max-width:\s*420px\)/);
  assert.equal(filterTasks([{ ...task, status: "done" }], "pending").length, 0);
});
