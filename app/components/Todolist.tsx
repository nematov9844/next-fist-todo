"use client";

import { useEffect, useState } from "react";

interface Todo {
  text: string;
  done: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  useEffect(() => {
    const savedTodos = typeof window !== "undefined" ? localStorage.getItem("todos") : null;
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, { text: input, done: false }]);
      setInput("");
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleDone = (index: number) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const startEditing = (index: number, text: string) => {
    setEditingIndex(index);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editingIndex !== null && editText.trim() !== "") {
      setTodos(
        todos.map((todo, i) =>
          i === editingIndex ? { ...todo, text: editText } : todo
        )
      );
      setEditingIndex(null);
      setEditText("");
    }
  };

  const completedCount = todos.filter((todo) => todo.done).length;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
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

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-grow rounded-md text-gray-500 outline-none"
          placeholder="Yangi vazifa..."
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Qo‘shish
        </button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-2 my-2 rounded-md shadow ${
              todo.done ? "bg-green-100 text-gray-500" : "bg-white text-gray-500"
            }`}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(index)}
              className="mr-2"
            />

            {editingIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border p-1 flex-grow rounded-md outline-none"
              />
            ) : (
              <span className={todo.done ? "line-through" : ""}>
                {todo.text}
              </span>
            )}

            <div className="flex gap-2">
              {editingIndex === index ? (
                <button
                  onClick={saveEdit}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                >
                  Saqlash
                </button>
              ) : (
                <button
                  onClick={() => startEditing(index, todo.text)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                >
                  Tahrirlash
                </button>
              )}

              <button
                onClick={() => removeTodo(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                O‘chirish
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
