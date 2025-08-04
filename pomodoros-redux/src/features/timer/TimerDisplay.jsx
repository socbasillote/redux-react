import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTimeLeft } from './timerSlice';
import { selectDurations } from '../settings/settingsSlice'

export default function TimerDisplay() {
  const dispatch = useDispatch();
  const timeLeft = useSelector((state) => state.timer.timeLeft);
  const isRunning = useSelector((state) => state.timer.isRunning);
  const mode = useSelector((state) => state.timer.mode);
  const durations = useSelector(selectDurations);

  // Update timeLeft when durations change and timer is not running
  useEffect(() => {
    const expctedTime = durations[mode];
    if (!isRunning && timeLeft !== expctedTime) {
      dispatch(setTimeLeft(expctedTime));
    }
  }, [durations, mode, isRunning, dispatch]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="text-6xl font-mono">
      {minutes}:{seconds}
    </div>
  );
}
