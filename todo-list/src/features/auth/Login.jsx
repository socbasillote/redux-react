import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from './authSlice'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const users = useSelector(state => state.auth.users);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("All fields are requried");
            return;
        }
        const userExists = users.find(
            u => u.username === username && u.password === password
        );
        if (!userExists) {
            alert("Invalid credentials");
            return
        }
        dispatch(loginUser({ username, password }));
        navigate("/todos");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
                <h2 className="text-xl font-bold mb-4 text-black">Login</h2>
                <input 
                    className='border p-2 w-full mb-2 border-gray-400 text-black'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    className='border p-2 w-full mb-4 border-gray-400 text-black'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-green-500 text-white px-4 py-2 w-full">Login</button>
            </form>
        </div>
    )
}

export default Login