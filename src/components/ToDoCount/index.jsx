import { useEffect, useState } from "react";
import "./todo-count.style.css";
import { getTodos } from "../../services/TodoService";
import { IconRefresh } from "../icons";

export function ToDoCount() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = async () => {
    setIsLoading(true);
    const todoFromApi = await getTodos();
    setCount(todoFromApi.length);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <section className="todo-count-container">
      <span className="todo-count">{count}</span>
      <button
        aria-label="refresh"
        role="button"
        className="todo-refresh-button"
        onClick={fetchTodos}
        disabled={isLoading}
      >
        <IconRefresh />
      </button>
    </section>
  );
}
