import React from 'react'

const Todo = ({ todo, deleteTodo, completeTodo }) => {
  return (
    <div className="todo">
      <p>{todo.text}</p>
      <button onClick={() => completeTodo(todo)}>Complete</button>
      <button onClick={() => deleteTodo(todo)}>Delete</button>
    </div>
  )
}

export default Todo
