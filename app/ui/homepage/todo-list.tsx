"use client";
import { useState } from "react";

import { TodoItem } from "@/app/ui/todo";
import {
  deleteTodoFromLocalStorage,
  editTodoInLocalStorage,
  getStoredTodosFromLocalStorage,
  saveTodoToLocalStorage,
  StoredTodo,
} from "@/lib/utils/local-storage";
import { CreateTodoParams } from "@/lib/actions/todos";
import { AddItemInput } from "@/app/ui/list";

export default function TodoList() {
  const [todos, setTodos] = useState<StoredTodo[]>(
    getStoredTodosFromLocalStorage(),
  );

  const handleSaveTodos = (todo: Omit<CreateTodoParams, "listId">) => {
    const newTodo: StoredTodo = {
      ...todo,
      description: todo.description || null,
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
    <div className="w-dvw px-10">
      <h1 className="text-center mb-2 font-bold">Todo List</h1>
      <AddItemInput type="localTodo" onSave={handleSaveTodos} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
        />
      ))}
    </div>
  );
}
