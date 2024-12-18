import React, { useState, useEffect } from "react";
import TodoList from "./Components/TodoList";
import AddTodoForm from "./Components/AddTodoForm";
import "./App.css";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo as apiDeleteTodo,
} from "./Services/Api";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  // Obtener todas las tareas
  const getTodos = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
      setError(null);
    } catch (error) {
      setError("Hubo un problema al cargar las tareas.");
    }
  };

  // Agregar una nueva tarea
  const addTodo = async (newTodo) => {
    try {
      const savedTodo = await createTodo({ ...newTodo, isCompleted: false });
      setTodos([...todos, savedTodo]);
    } catch (error) {
      console.error("Error al agregar la tarea:", error.message);
    }
  };

  // Editar una tarea existente
  const editTodo = async (id) => {
    const todoToEdit = todos.find((todo) => todo._id === id);

    // Solicitar los nuevos valores
    const newName =
      prompt("Editar nombre:", todoToEdit.name) || todoToEdit.name;
    const newDescription =
      prompt("Editar descripción:", todoToEdit.description) ||
      todoToEdit.description;
    const newCreator =
      prompt("Editar autor:", todoToEdit.creator) || todoToEdit.creator;

    const updatedTodo = {
      ...todoToEdit,
      name: newName,
      description: newDescription,
      creator: newCreator,
    };

    try {
      const savedTodo = await updateTodo(id, updatedTodo);
      setTodos(todos.map((todo) => (todo._id === id ? savedTodo : todo)));
    } catch (error) {
      console.error("Error al editar la tarea:", error.message);
    }
  };

  // Alternar el estado de completado
  const toggleTodoCompletion = async (id) => {
    const todoToToggle = todos.find((todo) => todo._id === id);
    const updatedTodo = {
      ...todoToToggle,
      isCompleted: !todoToToggle.isCompleted,
    };

    try {
      const savedTodo = await updateTodo(id, updatedTodo);
      setTodos(todos.map((todo) => (todo._id === id ? savedTodo : todo)));
    } catch (error) {
      console.error(
        "Error al alternar el estado de completado:",
        error.message
      );
    }
  };

  // Eliminar una tarea
  const deleteTodo = async (id) => {
    try {
      await apiDeleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error.message);
    }
  };

  // Cargar las tareas al montar el componente
  useEffect(() => {
    getTodos();
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
    </div>
  );
}

export default App;
