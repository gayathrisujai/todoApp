import React from 'react';

function Todo({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.completed ? 'completed' : ''}>{todo.description}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
}

export default Todo;
