import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { logout } from '../auth/authSlice';

function Leaderboard() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userCounts = useSelector((state) => state.counter.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const sortedUsers = Object.entries(userCounts).sort(([, aCount], [, bCount]) => bCount - aCount);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded shadow-md p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-black">🏆 Leaderboard</h2>

        <ul className="divide-y">
          {sortedUsers.map(([username, count], index) => (
            <li key={username} className="py-2 flex justify-between text-black">
              <span className="font-medium">
                {index + 1}. {username}
              </span>
              <span className="text-blue-600 font-bold">{count}</span>
            </li>
          ))}
        </ul>

        <div className="text-center pt-4">
          <Link
            to="/counter"
            className="text-blue-500 underline hover:text-blue-700"
          >
            ← Back to Counter
          </Link>
          <button
            onClick={handleLogout}
            className='text-red-500 underline hover:text-red-700'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
