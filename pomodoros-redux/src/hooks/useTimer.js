import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  tick,
  switchMode,
  incrementPomodoro,
  start,
} from '../features/timer/timerSlice';
import { setThemeColor } from '../features/theme/themeSlice';

export default function useTimer() {
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => state.timer.isRunning);
  const timeLeft = useSelector((state) => state.timer.timeLeft);
  const mode = useSelector((state) => state.timer.mode);
  const pomodoroCount = useSelector((state) => state.timer.pomodoroCount);
  const durations = useSelector((state) => state.settings.durations);
  const longBreakInterval = useSelector((state) => state.settings.longBreakInterval);
  const autoStart = useSelector((state) => state.settings.autoStart);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }

    if (!isRunning || timeLeft === 0) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, dispatch]);

  // Handle auto-switch and auto-start
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      if (mode === 'pomodoro') {
        dispatch(incrementPomodoro());
        const nextMode =
          (pomodoroCount + 1) % longBreakInterval === 0 ? 'long' : 'short';
        dispatch(
          switchMode({
            mode: nextMode,
            duration: durations[nextMode],
          })
        );
        dispatch(setThemeColor(nextMode));
        if (autoStart) dispatch(start());
      } else {
        dispatch(
          switchMode({
            mode: 'pomodoro',
            duration: durations.pomodoro,
          })
        );
        dispatch(setThemeColor('pomodoro'));
        if (autoStart) dispatch(start());
      }
    }
  }, [timeLeft, dispatch, mode, pomodoroCount, durations, longBreakInterval]);
}
