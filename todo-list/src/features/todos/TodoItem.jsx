import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, removeTodo } from './todosSlice'

function TodoItem({ todo }) {
    const dispatch = useDispatch();

    return (
        <div className="flex justify-between items-center p-2 border-b">
            <div className="flex items-center gap-2">
                <input 
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => dispatch(toggleTodo(todo.id))}
                />
                <span className={`${todo.completed ? "line-through text-gray-500" : ""} text-black`}>
                    {todo.text}
                </span>
            </div>
            <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className='text-red-500 hover:underline'
            >
                Delete
            </button>
        </div>
    )
}

export default TodoItem