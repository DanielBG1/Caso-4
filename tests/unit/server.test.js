import assert from "node:assert/strict";
import test from "node:test";
import { createAppServer } from "../../server.js";

test("static server serves the application entry point", async (context) => {
  const server = createAppServer();
  context.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

  const response = await fetch(`http://127.0.0.1:${server.address().port}/`);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Curso-PSWE-07/);
});
