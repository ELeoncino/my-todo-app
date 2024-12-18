const BASE_URL = "http://localhost:5000/api/tareas";

// Obtener todas las tareas
export const fetchTodos = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Error al obtener las tareas.");
  return await response.json();
};

// Crear una nueva tarea
export const createTodo = async (todo) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error("Error al crear la tarea.");
  return await response.json();
};

// Actualizar una tarea existente
export const updateTodo = async (id, updatedTodo) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  });
  if (!response.ok) throw new Error("Error al actualizar la tarea.");
  return await response.json();
};

// Eliminar una tarea
export const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Error al eliminar la tarea.");
};
