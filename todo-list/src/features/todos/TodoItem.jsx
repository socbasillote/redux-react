import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, removeTodo } from './todosSlice'

function TodoItem({ todo }) {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-3 mb-2 w-full max-w-md hover:shadow-md transition">
            <div className="flex items-center gap-3">
                <input 
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => dispatch(toggleTodo(todo.id))}
                    className="h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-300"
                />
                <span className={`${todo.completed ? "line-through text-gray-500" : ""} text-black`}>
                    {todo.text}
                </span>
            </div>
            <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-red-500 hover:text-red-700 transition"
            >
                Delete
            </button>
        </div>
    )
}

export default TodoItem