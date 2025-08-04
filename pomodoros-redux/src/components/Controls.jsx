import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { start, pause, reset } from '../features/timer/timerSlice';


function Controls() {
    const dispatch = useDispatch();
    const isRunning = useSelector((state) => state.timer.isRunning);
    const mode = useSelector((state) => state.timer.mode);
    

    const handleStartPause = () => {
        if (isRunning) {
            dispatch(pause());
        } else {
            dispatch(start());
        }
    };

    const handleReset = () => {
        const duration = useSelector((state) => state.settings.durations[mode]);
        dispatch(reset(duration[mode]));
    }
  return (
    <div className='flex gap-4'>
        <button 
            onClick={handleStartPause}
            className='bg-white text-white px-4 py-2 rounded-lg font-semibold'
        >
            {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
            onClick={handleReset}
            className='bg-gray-300 text-white px-4 py-2 rounded-lg font-semibold'
        >
            Reset
        </button>
    </div>
  )
}

export default Controls