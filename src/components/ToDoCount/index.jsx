import { useEffect, useState } from "react";
import "./todo-count.style.css";
import { getTodos } from "../../services/TodoService";

export function ToDoCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchTodos = async () => {
      const todoFromApi = await getTodos();
      setCount(todoFromApi.length);
    };

    fetchTodos();
  }, []);

  return <span className="todo-count">{count}</span>;
}
