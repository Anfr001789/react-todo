import { useState } from "react";

// Menentukan bentuk data satu tugas
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  // State untuk menyimpan daftar tugas
  const [todos, setTodos] = useState<Todo[]>([]);

  // State untuk menyimpan isi input
  const [input, setInput] = useState<string>("");

  function addTodo(): void {
    const text = input.trim();

    // Jangan menambahkan tugas kosong
    if (text === "") {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      completed: false
    };

    // Membuat array baru berisi tugas lama dan tugas baru
    setTodos([...todos, newTodo]);

    // Mengosongkan input
    setInput("");
  }

  function toggleTodo(id: number): void {
    const updatedTodos = todos.map(function (todo): Todo {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function deleteTodo(id: number): void {
    const updatedTodos = todos.filter(function (todo): boolean {
      return todo.id !== id;
    });

    setTodos(updatedTodos);
  }

  return (
    <main className="container">
      <h1>To-Do List React</h1>

      <div className="form">
        <input
          value={input}
          onChange={function (event) {
            setInput(event.target.value);
          }}
          onKeyDown={function (event) {
            if (event.key === "Enter") {
              addTodo();
            }
          }}
          placeholder="Masukkan tugas"
        />

        <button onClick={addTodo}>Tambah</button>
      </div>

      <ul>
        {todos.map(function (todo) {
          return (
            <li key={todo.id}>
              <span
                onClick={() => toggleTodo(todo.id)}
                className={todo.completed ? "completed" : ""}
              >
                {todo.text}
              </span>

              <button onClick={() => deleteTodo(todo.id)}>
                Hapus
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App;
