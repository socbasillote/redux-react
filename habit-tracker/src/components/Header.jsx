import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/settings/settingsSlice";

import React from 'react'

function Header() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.settings.theme);

  return (
    <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
      <h1 className="text-2xl font-bold">Habit Tracker</h1>
      <button onClick={() => dispatch(toggleTheme())}>
      Current theme: {theme}
    </button>
    </header>
  )
}

export default Header