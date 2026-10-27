import assert from "node:assert/strict";
import test from "node:test";
import { TaskStore } from "../../src/persistence/task-store.js";

test("TaskStore requires an implementation for load and save", () => {
  const store = new TaskStore();

  assert.throws(() => store.load(), /implement load/);
  assert.throws(() => store.save([]), /implement save/);
});
