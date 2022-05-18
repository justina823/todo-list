import React, { useState, useRef, useEffect } from 'react';
import TodoList from './components/TodoList'
import {v1 as uuid} from "uuid";
import './App.css'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
//storing todo list to local 
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos] 
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // take the event  
  // The useRef Hook can be used to keep track of previous state values
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuid(), name: name, complete: false}]
    })
    // clear out input  
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className='main'>
      <div className='addTask'>
      
      <input className='taskBox' ref={todoNameRef} type="text" />
      <button className='addBtn' onClick={handleAddTodo}><img src="https://img.icons8.com/ios/50/000000/add--v1.png"/></button>
      </div>
      
        <div className='reminder'>{todos.filter(todo => !todo.complete).length} left to do</div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <button className='clearBtn' onClick={handleClearTodos}><img className="clearImg" src="https://img.icons8.com/ios/50/000000/broom.png"/> clear completed</button>
   </div>
  )
}

export default App;