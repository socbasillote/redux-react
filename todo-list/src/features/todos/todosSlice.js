import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  filter: "all",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    loadTodos(state, action) {
      return {
        ...state,
        todos: action.payload,
      };
    },
    addTodo: {
      reducer(state, action) {
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
