import { create } from "zustand";

interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (title: string, description: string) => void;
  removeTodo: (id: number) => void;
  toggleDone: (id: number) => void;
  editTodo: (id: number, title: string, description: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (title, description) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: Date.now(), title, description, done: false },
      ],
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  toggleDone: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ),
    })),
  editTodo: (id, title, description) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      ),
    })),
})); 