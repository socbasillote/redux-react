import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTodo, deleteTodo } from '../features/todos/todosSlice'

export default function TodoList() {
  const todos = useSelector(state => state.todos)
  const showCompleted = useSelector(state => state.settings.showCompleted)
  const dispatch = useDispatch()

  const filtered = showCompleted ? todos : todos.filter(t => !t.completed)

  return (
    <ul className="mb-4 ">
      {filtered.map(todo => (
        <li key={todo.id} className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
              {todo.text}
            </span>
          </div>
          <button
            className="text-red-500 hover:underline"
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
