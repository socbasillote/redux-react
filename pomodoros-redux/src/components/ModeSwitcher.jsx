import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchMode, start, reset } from '../features/timer/timerSlice';
import { setThemeColor } from '../features/theme/themeSlice';
import { selectAutoStart } from '../features/settings/settingsSlice';

const modes = ['pomodoro', 'short', 'long'];

export default function ModeSwitcher() {
  const dispatch = useDispatch();
  const currentMode = useSelector((state) => state.timer.mode);
  const durations = useSelector((state) => state.settings.durations);
  const autoStart = useSelector((state) => state.settings.autoStart);

  const handleClick = (mode) => {
    if (mode === currentMode) return;

    dispatch(switchMode({ mode, duration: durations[mode] }));
    dispatch(setThemeColor(mode));

    if (autoStart) {
      dispatch(start());
    } else {
      dispatch(reset());
    }
  };

  return (
    <div className="flex gap-4">
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => handleClick(mode)}
          className={`px-4 py-1 rounded-md font-medium transition-all ${
            currentMode === mode
              ? 'bg-white text-black'
              : 'bg-black bg-opacity-20 text-white'
          }`}
        >
          {mode === 'pomodoro' && 'Pomodoro'}
          {mode === 'short' && 'Short Break'}
          {mode === 'long' && 'Long Break'}
        </button>
      ))}
    </div>
  );
}
