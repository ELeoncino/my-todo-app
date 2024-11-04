import React from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <div className={`task-item ${todo.isCompleted ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onToggle(todo.id)}
      />
      <div className="text-content">
        <span className="name">{todo.name}</span>
        <p className="description">{todo.description}</p>
        <span className="creator">
          Creado por: <span className="creator-name">{todo.creator}</span>
        </span>
      </div>
      <div className="buttons">
        <button className="edit-button" onClick={() => onEdit(todo.id)}>
          Editar
        </button>
        <button className="delete-button" onClick={() => onDelete(todo.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
