import React, { useState } from "react";
import PropTypes from "prop-types";

const AddTodoForm = ({ onAddTodo }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && description.trim() && creator.trim()) {
      onAddTodo({ name, description, creator });
      setName("");
      setDescription("");
      setCreator("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la tarea"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        required
      />
      <input
        type="text"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
        placeholder="Autor"
        required
      />
      <button type="submit">Añadir</button>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
