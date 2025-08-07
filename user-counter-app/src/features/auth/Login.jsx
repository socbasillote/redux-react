import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login }  from './authSlice';
import { setUserCount } from '../counter/counterSlice';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.currentUser);

    useEffect(() => {
        if (currentUser) {
            navigate('/counter');
        }
    }, [currentUser, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        const trimmed = username.trim();
        if (!trimmed) return;

        dispatch(login(trimmed));

        // Load count from LocalStorage (or 0)
        const storedData = JSON.parse(localStorage.getItem('userCounts') || '{}');
        const userCount = storedData[trimmed] || 0;
        dispatch(setUserCount({ username: trimmed, count: userCount }));

        setUsername('');
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
            onSubmit={handleLogin}
            className='bg-white shadow-md rounded p-6 w-full max-w-sm space-y-4'
        >
            <h2 className='text-2xl font-semibold text-center text-black'>Login</h2>
            <input 
                type='text'
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full border text-black px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300'
            />
            <button
                type='submit'
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
                Login
            </button>
        </form>
    </div>
  )
}

export default Login