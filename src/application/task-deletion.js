export function removeTask(tasks, id) {
  const filteredTasks = tasks.filter((task) => task.id !== id);
  if (filteredTasks.length === tasks.length) {
    throw new Error("Task not found");
  }
  return filteredTasks;
}
