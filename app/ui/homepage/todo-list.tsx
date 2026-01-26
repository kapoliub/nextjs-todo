"use client";
import { useState } from "react";

import AddLocalTodoInput from "./add-local-todo-input";

import { TodoItem } from "@/app/ui/todo";
import {
  deleteTodoFromLocalStorage,
  editTodoInLocalStorage,
  getStoredTodosFromLocalStorage,
  saveTodoToLocalStorage,
  StoredTodo,
} from "@/lib/utils/local-storage";

export default function TodoList() {
  const [todos, setTodos] = useState<StoredTodo[]>(
    getStoredTodosFromLocalStorage(),
  );

  const handleSaveTodos = (title: string) => {
    const newTodo: StoredTodo = {
      title,
      description: null,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    saveTodoToLocalStorage(newTodo);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    deleteTodoFromLocalStorage(id);
  };

  const handleEditTodo = (updatedTodo: StoredTodo) => {
    const newTodo = {
      ...updatedTodo,
      updated_at: new Date().toISOString(),
    };

    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? newTodo : todo)),
    );
    editTodoInLocalStorage(newTodo);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Sticky input */}
      <div className="sticky top-0 z-10 px-6 py-3 bg-primary-100">
        <AddLocalTodoInput onSave={handleSaveTodos} />
      </div>

      {/* Scrollable todos */}
      <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar px-6 pb-1">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        ))}
      </div>
    </div>
  );
}
