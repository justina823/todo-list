import React from 'react'

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  
  return (
    <div className='todoList'>
      <label>
      
        
        <input className='checkBox' type="checkbox" checked={todo.complete} onChange={handleTodoClick}></input>
        {todo.name}
        
      </label>
    </div>
  )
}