import { useTodoStore } from '../store/useTodoStore';
import { useState } from 'react';

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    description: string;
    done: boolean;
  };
}

export default function TodoItem({ todo }: TodoItemProps) {
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const toggleDone = useTodoStore((state) => state.toggleDone);
  const editTodo = useTodoStore((state) => state.editTodo);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleSaveEdit = () => {
    editTodo(todo.id, editTitle, editDescription);
    setIsEditing(false);
  };

  return (
    <li className={`flex flex-col justify-between items-start p-2 my-2 rounded-md shadow ${todo.done ? "bg-green-100 text-gray-500" : "bg-white text-gray-500"}`}>
      <div className="flex items-center w-full">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleDone(todo.id)}
          className="mr-2"
        />
        {isEditing ? (
          <div className="flex flex-col w-full">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="border p-1 rounded-md outline-none mb-1"
            />
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="border p-1 rounded-md outline-none"
            />
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <span className={todo.done ? "line-through" : ""}>
              {todo.title}
            </span>
            <span className={`text-sm ${todo.done ? "line-through" : ""}`}>
              {todo.description.length > 20 ? `${todo.description.substring(0, 20)}...` : todo.description}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        {isEditing ? (
          <button
            onClick={handleSaveEdit}
            className="bg-yellow-500 text-white px-2 py-1 rounded-md"
          >
            Saqlash
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-2 py-1 rounded-md"
          >
            Tahrirlash
          </button>
        )}

        <button
          onClick={() => removeTodo(todo.id)}
          className="bg-red-500 text-white px-2 py-1 rounded-md"
        >
          O‘chirish
        </button>
      </div>
    </li>
  );
} 