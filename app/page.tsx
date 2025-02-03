import TodoList from "./components/Todolist";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-200">
      <TodoList />
    </main>
  );
}
