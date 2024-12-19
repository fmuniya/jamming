import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ message }) => {
    return (
        <div className='LoadingScreen'>
            <div className='spinner'>
                <p>{message || "Saving your playlist..."}</p>
            </div>
        </div>
    );
};

export default LoadingScreen;