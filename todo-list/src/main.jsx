import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js';
import { loadAuthState } from './features/auth/authSlice.js'
import { loadTodos } from './features/todos/todosSlice.js'
import { loadSettings } from './features/settings/settingsSlice.js'

const persistAuth = localStorage.getItem('authState');
if (persistAuth) {
  try {
    const parsed = JSON.parse(persistAuth);
    store.dispatch(loadAuthState(parsed));

    const username = parsed.currentUser?.username;
    if (username) {
      const key = `appState_${username}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsedUserState = JSON.parse(saved);
        if (parsedUserState.todos) store.dispatch(loadTodos(parsedUserState.todos));
        if (parsedUserState.seetings) store.dispatch(loadSettings(parsedUserState.settings))
      }
    }
  } catch (e) {
    console.error('Failed to parse persisted auth:', e)
  }
}
/* if (persistAuth) {
  store.dispatch(loadAuthState(JSON.parse(persistAuth)));

}

const persistedTodos = localStorage.getItem("todosState") && ![];

if (persistedTodos) {
  
  store.dispatch(loadTodos(JSON.parse(persistedTodos)));
} */ /* else {
  localStorage.setItem('todosState', (JSON.stringify([])));
} */

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
