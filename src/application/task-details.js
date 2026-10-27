export function updateTask(task, fields) {
  const { title, description = "" } = fields;
  if (typeof title !== "string" || title.trim().length === 0) {
    throw new Error("A task title is required");
  }
  if (typeof description !== "string") {
    throw new Error("A task description must be text");
  }

  return {
    ...task,
    title: title.trim(),
    description: description.trim(),
  };
}

export function toggleTaskStatus(task) {
  if (task.status !== "pending" && task.status !== "done") {
    throw new Error("Task has an invalid completion status");
  }
  return { ...task, status: task.status === "pending" ? "done" : "pending" };
}
