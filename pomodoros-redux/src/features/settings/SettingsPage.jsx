import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPomodoroDuration,
  setShortBreakDuration,
  setLongBreakDuration,
  setLongBreakInterval,
  setAutoStart,
  selectAutoStart,
} from './settingsSlice';
import { setColorForMode } from '../theme/themeSlice';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const durations = useSelector((state) => state.settings.durations);
  const longBreakInterval = useSelector((state) => state.settings.longBreakInterval);
  const colors = useSelector((state) => state.theme.colors);

  const autoStart = useSelector(selectAutoStart);
  
  const handleAutoStartToggle = (e) => {
    dispatch(setAutoStart(e.target.checked));
  }
 
  const handleDurationChange = (e, mode) => {
    const minutes = parseInt(e.target.value, 10) || 0;
    const seconds = minutes * 60;
    const actionMap = {
      pomodoro: setPomodoroDuration,
      short: setShortBreakDuration,
      long: setLongBreakDuration,
    };
    dispatch(actionMap[mode](seconds));
  };

  const handleIntervalChange = (e) => {
    dispatch(setLongBreakInterval(Number(e.target.value)));
  };

  const handleColorChange = (e, mode) => {
    dispatch(setColorForMode({ mode, color: e.target.value }));
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 bg-white text-black rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold">Settings</h2>

      <div>
        <h3 className="font-semibold mb-2">Durations (in minutes)</h3>
        {['pomodoro', 'short', 'long'].map((mode) => (
          <div key={mode} className="mb-3">
            <label className="block capitalize">
              {mode}:
              <input
                type="number"
                min="1"
                value={Math.floor(durations[mode] / 60)}
                onChange={(e) => handleDurationChange(e, mode)}
                className="ml-2 border rounded px-2 py-1"
              />
            </label>
          </div>
        ))}
      </div>

      <div>
        <label className="font-semibold">
          Long Break Interval:
          <input
            type="number"
            min="1"
            value={longBreakInterval}
            onChange={handleIntervalChange}
            className="ml-2 border rounded px-2 py-1"
          />
        </label>
      </div>

      <div>
        <h3 className="font-semibold mb-2 mt-4">Theme Colors</h3>
        {['pomodoro', 'short', 'long'].map((mode) => (
          <div key={mode} className="mb-3">
            <label className="block capitalize">
              {mode}:
              <input
                type="color"
                value={colors[mode]}
                onChange={(e) => handleColorChange(e, mode)}
                className="ml-2"
              />
            </label>
          </div>
        ))}
      </div>

      <div className='settings-item'>
        <label htmlFor='autoStartToggle'>Auto-start Next Timer:</label>
        <input 
            id='autoStartToggle'
            type='checkbox'
            checked={autoStart}
            onChange={handleAutoStartToggle}
        />
      </div>
    </div>
  );
}
