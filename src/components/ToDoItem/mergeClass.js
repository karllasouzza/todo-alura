export default function mergeClass(isItemCompleted) {
  const styles = ["todo-item"];

  if (isItemCompleted) {
    styles.push("completed");
  }

  return styles.join(" ");
}
