import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem('todosState')) || [],
  filter: "all",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    loadTodos(state, action) {

        state.todos = action.payload.todos || [];
        state.filter = action.payload.filter || 'all'


    },
    addTodo: {
      reducer(state, action) {
        if (!Array.isArray(state.todos)) {
          state.todos = [];
        }
        state.todos.push(action.payload);
      },
      prepare(text, userId) {
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false,
            userId,
          },
        };
      },
    },
    toggleTodo(state, action) {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { loadTodos, addTodo, toggleTodo, removeTodo, setFilter } = todosSlice.actions;
export default todosSlice.reducer;
