import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBackgroundColor, toggleShowCompleted } from '../features/settings/settingsSlice';

function Settings( { onClose }) {
    const dispatch = useDispatch();
    const {backgroundColor, showCompleted } = useSelector((state) => state.settings);

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className='text-lg font-bold mb-2'>Settings</h2>
                <label className='block mb-2'>
                    <span className='text-gray-700'>Background Color:</span>
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => dispatch(setBackgroundColor(e.target.value))}
                        className='ml-2'
                    />
                </label>

                <label className="flex items-center gap-2 mb-4">
                    <input 
                        type='checkbox'
                        checked={showCompleted}
                        onChange={() => dispatch(toggleShowCompleted())}
                    />
                    Show Completed
                </label>

                <button
                    onClick={onClose}
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default Settings