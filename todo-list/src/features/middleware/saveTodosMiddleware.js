import { addTodo, toggleTodo, removeTodo, setFilter } from "../todos/todosSlice";
export const saveTodosMiddleware = store => next => action => {
  const result = next(action);
  if([addTodo.type, toggleTodo.type, removeTodo.type, setFilter.type].includes(action.type)) {
    const state = store.getState().todos;
  localStorage.setItem("todosState", JSON.stringify(state));
  }
  
  return result;
};