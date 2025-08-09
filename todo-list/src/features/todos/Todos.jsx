import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setFilter } from "./todosSlice";
import TodoItem from "./TodoItem";
import { logoutUser } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Todos() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todos, filter } = useSelector(state => state.todos);
  const currentUser = useSelector(state => state.auth.currentUser);

  if (!currentUser) {
    navigate("/login");
  }

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text, currentUser.username));
    setText("");
  };

  const filteredTodos = (todos || []).filter(todo => {
    if (todo.userId !== currentUser.username) return false;
    if (filter === "done") return todo.completed;
    return true;
  });

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-black">Hi, {currentUser.username}</h2>
        <button
          onClick={() => {
            dispatch(logoutUser());
            navigate("/login");
          }}
          className="text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 text-black"
          placeholder="Add todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2">Add</button>
      </form>

      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 border ${filter === "all" ? "bg-gray-200" : ""}`}
          onClick={() => dispatch(setFilter("all"))}
        >
          All
        </button>
        <button
          className={`px-3 py-1 border ${filter === "done" ? "bg-gray-200" : ""}`}
          onClick={() => dispatch(setFilter("done"))}
        >
          Done
        </button>
      </div>

      <div>
        {filteredTodos.length === 0 ? (
          <p className="text-gray-500">No todos found.</p>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        )}
      </div>
    </div>
  );
}
