import React from 'react'
import { useSelector } from 'react-redux'

const messages = {
    pomodoro: 'Focus time!',
    short: 'Take a short break',
    long: "You've earned a long break!",
};

function MotivationalMessage() {
    const mode = useSelector((state) => state.timer.mode);

  return (
    <div>
        <p className='text-xl italic -mt-2'>{messages[mode]}</p>
    </div>
  )
}

export default MotivationalMessage