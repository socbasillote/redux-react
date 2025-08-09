import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from "./authSlice";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert('All fields are required');
            return;
        }
        dispatch(registerUser({ username, password }));
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow w-80">
                <h2 className="text-xl font-bold mb-4 text-black">Register</h2>
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
                <button className='bg-blue-500 text-white px-4 py-2 w-full'>Register</button>
            </form>
        </div>
    )
}

export default Register