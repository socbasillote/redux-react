import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowCompleted, changeBackgroundColor } from '../features/settings/settingsSlice'

export default function SettingsModal({ isOpen, onClose }) {
  const dispatch = useDispatch()
  const showCompleted = useSelector(state => state.settings.showCompleted)
  const bg = useSelector(state => state.settings.backgroundColor)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 relative">
        <h2 className="text-xl font-bold mb-4">Settings</h2>

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => dispatch(toggleShowCompleted())}
          />
          Show Completed Todos
        </label>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Background Color</h3>
          <div className="flex gap-2">
            {['bg-white', 'bg-gray-100', 'bg-yellow-100', 'bg-green-100'].map(color => (
              <button
                key={color}
                className={`w-6 h-6 rounded  border ${color} ${bg === color ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => dispatch(changeBackgroundColor(color))}
              ></button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-lg"
        >
          ×
        </button>
      </div>
    </div>
  )
}
