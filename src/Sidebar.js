import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>APAP</h2>
            <Link to="/dashboard" className="sidebar-item">대시보드</Link>
            <Link to="/statistics" className="sidebar-item">통계 현황</Link>
            <Link to="/history" className="sidebar-item">이상상황 과거이력</Link>
            <Link to="/camera-management" className="sidebar-item">카메라 관리</Link>
            <Link to="/report" className="sidebar-item">보고서 조회</Link>
        </div>
    );
};

export default Sidebar;
