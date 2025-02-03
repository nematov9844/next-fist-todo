"use client";

import { useTodoStore } from '../store/useTodoStore';
import { useState } from 'react';
import TodoItem from './TodoItem';

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = () => {
    if (title.trim() !== "" && description.trim() !== "") {
      addTodo(title, description);
      setTitle("");
      setDescription("");
    }
  };

  const completedCount = todos.filter((todo) => todo.done).length;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className="w-[400px] mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">To-Do List</h1>

      <div className="mb-4">
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          {completedCount} / {todos.length} vazifa bajarildi
        </p>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded-md text-gray-500 outline-none"
          placeholder="Vazifa nomi..."
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded-md text-gray-500 outline-none"
          placeholder="Vazifa tafsiloti..."
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Qo‘shish
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
