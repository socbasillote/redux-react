import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { start, pause, reset, tick, switchMode, setMode, toggleAutoSwitch } from '../features/timer/timerSlice';

function Timer() {
    const {isRunning, timeLeft, mode, autoSwitch, pomodoroCount} = useSelector((state) => state.timer);
    const dispatch = useDispatch();


    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                dispatch(tick());
            }, 1000);
            dispatch(start(interval));
        } else if (!isRunning && interval !== null) {
            clearInterval(interval);
        }
        console.log(timeLeft)
        return () => clearInterval(interval);
    }, [isRunning, dispatch, timeLeft])

    useEffect(() => {
        if (timeLeft < 0) {

            dispatch(switchMode());
            if (autoSwitch) {
                dispatch(start())
            }
            
        }
    }, [timeLeft, dispatch])

    const formatTime = (seconds) => {
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div>
            <div>
                <label>
                    <input 
                        type='checkbox'
                        checked={autoSwitch}
                        onChange={() => dispatch(toggleAutoSwitch())}
                    />
                    Auto-switch to break after pomodoro
                </label>
            </div>
            <h2>{mode.toUpperCase()}</h2>
            <h1>{formatTime(timeLeft)}</h1>
            <h3>{pomodoroCount}</h3>

            <div style={{ marginBottom: '1rem' }}>
                <button 
                    onClick={() => dispatch(setMode('pomodoro'))}
                    style={{
                        margin: '0 0.5rem',
                        background: mode === 'pomodoro' ? '#f44336' : '#eee',
                        color: mode === 'pomodoro' ? '#fff' : '#000',
                        padding: '0.5rem 1rem',
                    }}
                >
                    Pomodoro
                </button>
                <button
                    onClick={() => dispatch(setMode('short'))}
                    style={{
                        margin: '0 0.5rem',
                        background: mode === 'short' ? '#4caf50' : '#eee',
                        color: mode === 'short' ? '#fff' : '#000',
                        padding: '0.5rem 1rem',
                    }}
                >
                    Short Break
                </button>
                <button
                    onClick={() => dispatch(setMode('long'))}
                    style={{
                        margin: '0 0.5rem',
                        background: mode === 'long' ? '#2196f3' : '#eee',
                        color: mode === 'long' ? '#fff' : '#000',
                        padding: '0.5rem 1rem'
                    }}
                >
                    Long Break
                </button>
            </div>
            <button onClick={() => dispatch(isRunning ? pause() : start())}>{isRunning ? 'Pause' : 'Start'}</button>

            <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
    )
}

export default Timer