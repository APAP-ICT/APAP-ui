import React from 'react';
import './styles.css';
import Notifications from './Notification';

const MainContent = () => {
    return (
        <div className="main-content">
            <h2>상황 보고</h2>
            <Notifications />
        </div>
    );
};

export default MainContent;
