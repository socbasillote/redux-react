import { useState } from 'react'
import SettingsPage from './features/settings/SettingsPage';
import TimerDisplay from './features/timer/TimerDisplay'
import Controls from './components/Controls';
import ModeSwitcher from './components/ModeSwitcher';
import MotivationalMessage from './components/MotivationalMessage';
import ThemWrapper from './features/theme/ThemeWrapper';
import useTimer from './hooks/useTimer';

import './App.css'

function App() {
  const [showSettings, setShowSettings] = useState(false);

    useTimer();
    return (
      <ThemWrapper>
        <div className='min-h-screen flex flex-col justify-center items-center gap-6 p-6 text-white transition-all duration-300'>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute top-4 right-4 px-3 py-1 bg-white text-black rounded-md font-medium"
          >
            {showSettings ? 'back' :'Settings'}
          </button>

          {showSettings ? (
            <SettingsPage />
          ) :(
            <>
            <h1 className='text-4xl font-bold'>Pomodoro Timer</h1>
            <MotivationalMessage />
            <TimerDisplay />
            <ModeSwitcher />
            <Controls />
            </>
          )}
        </div>
      </ThemWrapper>
    )
}

export default App
