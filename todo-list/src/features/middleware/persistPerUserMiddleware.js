import { loginUser, logoutUser } from '../auth/authSlice'
import { addTodo, toggleTodo, removeTodo, setFilter } from '../todos/todosSlice'
import { setBackgroundColor, toggleShowCompleted, loadSettings } from '../settings/settingsSlice'
import { loadTodos } from '../todos/todosSlice'

export const persistPerUserMiddleware = (store) => (next) => (action) => {
  // Capture prev state (useful for saving on logout)
  const prevState = store.getState()
  const prevUser = prevState.auth.currentUser?.username

  const result = next(action)

  const state = store.getState()
  const currentUser = state.auth.currentUser?.username

  // When user logs in, try to load their saved app state
  if (action.type === loginUser.type) {
    const username = action.payload?.username || currentUser
    if (username) {
      try {
        const saved = localStorage.getItem(`appState_${username}`)
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed.todos) store.dispatch(loadTodos(parsed.todos))
          if (parsed.settings) store.dispatch(loadSettings(parsed.settings))
        }
      } catch (e) {
        console.error('Failed loading per-user state', e)
      }
    }
  }

  // If user logged out, save the last state under their username
  if (action.type === logoutUser.type && prevUser) {
    try {
      const payload = {
        todos: prevState.todos,
        settings: prevState.settings,
      }
      localStorage.setItem(`appState_${prevUser}`, JSON.stringify(payload))
    } catch (e) {
      console.error('Failed to save on logout', e)
    }
  }

  // Save per-user when relevant todo/settings actions occur
  const saveActions = [
    addTodo.type,
    toggleTodo.type,
    removeTodo.type,
    setFilter.type,
    setBackgroundColor.type,
    toggleShowCompleted.type,
  ]

  if (currentUser && saveActions.includes(action.type)) {
    try {
      const payload = {
        todos: state.todos,
        settings: state.settings,
      }
      localStorage.setItem(`appState_${currentUser}`, JSON.stringify(payload))
    } catch (e) {
      console.error('Failed to save per-user state', e)
    }
  }

  return result
}