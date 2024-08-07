import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="sidebar">
                <h2>APAP</h2>
                <div className="sidebar-item" onClick={() => handleNavigation('/dashboard')}>
                    대시보드
                </div>
                <div className="sidebar-item" onClick={() => handleNavigation('/statistics')}>
                    통계 현황
                </div>
                <div className="sidebar-item" onClick={() => handleNavigation('/history')}>
                    이상상황 과거이력
                </div>
                <div className="sidebar-item" onClick={() => handleNavigation('/camera-management')}>
                    카메라 관리
                </div>
                {/* 하위 메뉴는 임시 메뉴*/}
                <div className="sidebar-item" onClick={() => handleNavigation('/object-detect')}>
                    객체 탐지 결과
                </div>
                <div className="sidebar-item" onClick={() => handleNavigation('/subscriber')}>
                    실시간 상황
                </div>
                <div className="sidebar-item" onClick={() => handleNavigation('/publisher')}>
                    카메라
                </div>
                <div className="sidebar-item" onClick={() => handleNavigation('/uploader')}>
                    이미지 업로드
                </div>
            </div>
        </>
    );
};
export default Sidebar;
