import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from './counterSlice';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../auth/authSlice';

function Counter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const userCounts = useSelector((state) => state.counter.users);
  const count = userCounts[currentUser] || 0;

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleIncrement = () => {
    dispatch(increment(currentUser));
  };
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">
      <div className="bg-white rounded shadow-md p-6 w-full max-w-sm space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-black">Welcome, {currentUser}!</h2>
        <p className="text-lg text-black">Your count: <span className="font-bold text-black">{count}</span></p>
        <button
          onClick={handleIncrement}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Increase Count
        </button>
        <div className="flex justify-between pt-4 text-sm text-blue-600 underline">
          <Link to="/leaderboard">Leaderboard</Link>
          { currentUser && (
            <button onClick={handleLogout} className='text-red-500 underline hover:text-red-700'>
                Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Counter;
