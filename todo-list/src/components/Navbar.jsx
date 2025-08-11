import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Settings from './Settings'

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
        // saveAuthmiddleware will persis auth state (currentUser becomes null)
        navigate('/login', { replace: true });
    };

    return (
        <nav className='w-full max-w-3xl mx-auto flex items-center justify-between py-3'>
            <div className='text-lg font-semibold'> Mini Todo</div>

            {currentUser ? (
                <div className='flex items-center gap-4'>
                    <span className='text-sm'>Hi, {currentUser.username}</span>
                    <button
                        onClick={handleLogout}
                        className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition'
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div />
            )}
            <div>
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className='bg-gray-800 text-white px-4 py-2 rounded'
                >
                    Settings
                </button>
            </div>

            {isSettingsOpen && <Settings onClose={() => setIsSettingsOpen(false)}/>}
        </nav>
    )
}

export default Navbar