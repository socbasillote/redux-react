import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDurations, setTimeLeftFromMode, toggleAutoSwitch } from'../features/timer/timerSlice';

function SettingsModal({ onClose }) {
    const dispatch = useDispatch();
    const { durations, autoSwitch, timeLeft, isRunning } = useSelector((state) => state.timer);

    const [pomodoro, setPomodoro] = useState(durations.pomodoro / 60);
    const [short, setShort] = useState(durations.short / 60);
    const [long, setLong] = useState(durations.long / 60);

    const handleSave = () => {
        dispatch(
            setDurations({
                pomodoro: pomodoro * 60,
                short: short * 60,
                long: long * 60,
            })
        );
        onClose();
    }

    useEffect(() => {
        const newDurations = {
            pomodoro: pomodoro * 60,
            short: short * 60,
            long: long * 60,
        };

        dispatch(setDurations(newDurations));

        if (!isRunning) {
            dispatch(setTimeLeftFromMode());
        }

    }, [pomodoro, short, long, dispatch, isRunning])

    const handleToggleAutoSwitch = () => {
        dispatch(toggleAutoSwitch());
    }

    return (
        <div className='modal-backdrop'>
            <div className='modal'>
                <h2>Timer Settings</h2>

                <label>
                    Pomodoro (min):
                    <input type='number' value={pomodoro} onChange={(e) => setPomodoro(e.target.value)} />
                </label>
                <label>
                    Short Break (min):
                    <input type='number' value={short} onChange={(e) => setShort(e.target.value)}/>
                </label>
                <label>
                    Long Break (min):
                    <input type='number' value={long} onChange={(e) => setLong(e.target.value)} />
                </label>

                <label>
                    <input 
                        type='checkbox'
                        checked={autoSwitch}
                        onChange={handleToggleAutoSwitch}
                    />
                    Auto Switch
                </label>

                <div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default SettingsModal