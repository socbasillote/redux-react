import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function ThemeWrapper({ children }) {
    const bg = useSelector(state => state.theme.currentColor);

    useEffect(() => {
        document.body.style.backgroundColor = bg;

        return () => {
            document.body.style.backgroundColor = '';
        }
    }, [bg])
    return (
        <div style={{ color: '#fff'}}>
            {children}
        </div>
    )
}

export default ThemeWrapper