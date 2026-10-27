export function createTask({ title, description = "" }) {
  if (typeof title !== "string" || title.trim().length === 0) {
    throw new Error("A task title is required");
  }
  if (typeof description !== "string") {
    throw new Error("A task description must be text");
  }

  return {
    id: globalThis.crypto.randomUUID(),
    title: title.trim(),
    description: description.trim(),
    status: "pending",
  };
}
