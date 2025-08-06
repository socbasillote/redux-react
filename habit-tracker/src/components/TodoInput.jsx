import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todos/todosSlice'

export default function TodoInput() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch(addTodo(text))
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="flex-1 border px-2 py-1 rounded"
        placeholder="Add todo..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
        Add
      </button>
    </form>
  )
}
