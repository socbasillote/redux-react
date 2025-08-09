import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js';
import { loadAuthState } from './features/auth/authSlice.js'
import { loadTodos } from './features/todos/todosSlice.js'

const persistAuth = localStorage.getItem('authState');
if (persistAuth) {
  store.dispatch(loadAuthState(JSON.parse(persistAuth)));

}

const persistedTodos = localStorage.getItem("todosState") && ![];

if (persistedTodos) {
  
  store.dispatch(loadTodos(JSON.parse(persistedTodos)));
} else {
  localStorage.setItem('todosState', (JSON.stringify([])));
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
