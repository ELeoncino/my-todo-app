import React, { useState, useEffect } from "react";
import TodoList from "./Components/TodoList";
import AddTodoForm from "./Components/AddTodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/todos");
      if (!response.ok) {
        throw new Error("Error al obtener las tareas.");
      }
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (error) {
      setError("Hubo un problema al cargar las tareas.");
    }
  };

  const addTodo = async (newTodo) => {
    const todo = {
      id: Date.now().toString(),
      ...newTodo,
      isCompleted: false,
    };
    try {
      const response = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const savedTodo = await response.json();
      setTodos([...todos, savedTodo]);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const editTodo = async (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    const newName =
      prompt("Editar nombre:", todoToEdit.name) || todoToEdit.name;
    const newDescription =
      prompt("Editar descripción:", todoToEdit.description) ||
      todoToEdit.description;
    const newCreator =
      prompt("Editar creador:", todoToEdit.creator) || todoToEdit.creator;

    const updatedTodo = {
      ...todoToEdit,
      name: newName,
      description: newDescription,
      creator: newCreator,
    };

    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const toggleTodoCompletion = async (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    const updatedTodo = {
      ...todoToToggle,
      isCompleted: !todoToToggle.isCompleted,
    };

    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, { method: "DELETE" });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const resetTodos = async () => {
    try {
      await fetch("http://localhost:3001/todos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      });
      setTodos([]);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      {error && <p className="error">{error}</p>}
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodoCompletion}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
      <button className="reset-button" onClick={resetTodos}>
        Resetear Tareas
      </button>
    </div>
  );
}

export default App;
