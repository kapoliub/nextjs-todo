/* eslint-disable no-console */
"use client";

import { LS_TODOS_KEY } from "../constants";

import { Todo } from "@/types";

export interface StoredTodo
  extends Omit<Todo, "list_id" | "owner_id" | "last_edit_by"> {
  id: string;
}

export const getStoredTodosFromLocalStorage = (): StoredTodo[] => {
  if (typeof window === "undefined") return [];

  const storedTodos = localStorage.getItem(LS_TODOS_KEY);

  if (!storedTodos) {
    return [];
  }

  return JSON.parse(storedTodos);
};

export const saveTodoToLocalStorage = (todo: StoredTodo) => {
  if (typeof window === "undefined") return;

  const existedTodos = getStoredTodosFromLocalStorage();

  localStorage.setItem(LS_TODOS_KEY, JSON.stringify([todo, ...existedTodos]));
};

export const editTodoInLocalStorage = (updatedTodo: StoredTodo) => {
  if (typeof window === "undefined") return;

  const existedTodos = getStoredTodosFromLocalStorage();
  const updatedTodos = existedTodos.map((todo) =>
    todo.id === updatedTodo.id ? updatedTodo : todo,
  );

  localStorage.setItem(LS_TODOS_KEY, JSON.stringify(updatedTodos));
};

export const deleteTodoFromLocalStorage = (id: string) => {
  if (typeof window === "undefined") return;

  const existedTodos = getStoredTodosFromLocalStorage();
  const updatedTodos = existedTodos.filter((todo) => todo.id !== id);

  localStorage.setItem(LS_TODOS_KEY, JSON.stringify(updatedTodos));
};

export const clearTodosFromLocalStorage = () => {
  console.log("Clearing todos from localStorage");
  if (typeof window === "undefined") return;
  console.log("Clearing todos from localStorage - inside window check");
  localStorage.removeItem(LS_TODOS_KEY);
};
