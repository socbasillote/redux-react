import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, loadTodos, setFilter } from "./todosSlice";
import TodoItem from "./TodoItem";
import { logoutUser } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";



export default function Todos() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todos, filter } = useSelector(state => state.todos);
  const currentUser = useSelector(state => state.auth.currentUser);
  const backgroundColor = useSelector((state) => state.settings.backgroundColor)

   if (!currentUser) {
    navigate("/login");
  }

  
  useEffect(() => {
    const savedTodos = localStorage.getItem('todosState');
    if (savedTodos) {
      dispatch(loadTodos(JSON.parse(savedTodos)));
    }
  }, [dispatch])


  
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text, currentUser.username));
    setText("");
  };

  const filteredTodos = (Array.isArray(todos) ? todos : []).filter(todo => {
    if (todo.userId !== currentUser.username) return false;
    if (filter === "done") return todo.completed;
    return true;
  });

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start text-gray-900 p-4`}
      style={{ backgroundColor}}
    >
      <Navbar />

      <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">


        <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
          <input
            className="border p-2 flex-1 text-black"
            placeholder="Add todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:scale-95 transition">Add</button>
        </form>

        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 text-white py-1 border ${filter === "all" ? "bg-gray-200" : ""}`}
            onClick={() => dispatch(setFilter("all"))}
          >
            All
          </button>
          <button
            className={`px-3 text-white py-1 border ${filter === "done" ? "bg-gray-200" : ""}`}
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
    </div>
  );
}
