import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowCompleted, changeBackgroundColor } from '../features/settings/settingsSlice'

export default function Settings() {
  const dispatch = useDispatch()
  const showCompleted = useSelector(state => state.settings.showCompleted)
  const bg = useSelector(state => state.settings.backgroundColor)

  return (
    <div className="border-t pt-4">
      <h2 className="font-bold mb-2">Settings</h2>

      <label className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={() => dispatch(toggleShowCompleted())}
        />
        Show Completed
      </label>

      <div className="flex gap-2">
        {['bg-white', 'bg-gray-100', 'bg-yellow-100', 'bg-green-100'].map(color => (
          <button
            key={color}
            className={`w-6 h-6 rounded border ${color} ${bg === color ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => dispatch(changeBackgroundColor(color))}
          ></button>
        ))}
      </div>
    </div>
  )
}
