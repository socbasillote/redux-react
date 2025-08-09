export const saveTodosMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState().todos;
  localStorage.setItem("todosState", JSON.stringify(state));
  return result;
};