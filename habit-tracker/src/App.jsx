import { useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import SettingsModal from './components/SettingsModal'
import { useSelector } from 'react-redux'

import './App.css'

function App() {
  const bg = useSelector(state => state.settings.backgroundColor)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className={`${bg} min-h-screen p-6 text-black`}>
      <div className="max-w-md mx-auto bg-gray-100 p-4 rounded shadow-md relative">
        <h1 className="text-2xl font-bold mb-4">Mini Todo App</h1>
        <TodoInput />
        <TodoList />
        <button
          className="mt-2 text-sm text-blue-500 hover:underline"
          onClick={() => setIsSettingsOpen(true)}
        >
          ⚙️ Settings
        </button>

        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </div>
    </div>
  )
}

export default App
