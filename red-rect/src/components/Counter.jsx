import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../features/counter/counterSlice';

function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    const increColor = () => {
        dispatch(increment());
        document.body.style.background = "#000";

    }

    const decreColor = () => {
        dispatch(decrement());
        document.body.style.background = "#2d2d2d";
    }

    const resetsColor = () => {
        dispatch(reset());
        document.body.style.background = "#fff";
        document.body.style.color = '#000'
    }

    useEffect(() => {
        if (count >= 10) {
            document.body.style.background = "#1F1A38";
            console.log(count)
        }
        console.log(count)
    }, [count])
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Counter: {count}</h1>
            <button onClick={increColor}>Increment</button>
            <button onClick={decreColor}>Decrement</button>
            <button onClick={resetsColor}>Reset</button>
        </div>
    )
}

export default Counter