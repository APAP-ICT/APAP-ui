import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'; // useNavigate 훅 임포트
import '../styles.css';
import Notification from './Notification.jsx'; // Notifications 컴포넌트 임포트
import LogoutModal from '../pages/Login/LogoutModal.jsx'; // 로그아웃 모달 컴포넌트 임포트

const Header = ({onLogout}) => { // onLogout을 props로 받음
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleUserNameClick = () => {
        setLogoutModalOpen(true);
    };

    const handleCloseLogoutModal = () => {
        setLogoutModalOpen(false);
    };

    const handleLogout = () => {
        alert('로그아웃 되었습니다.'); // 예시로 알림
        setLogoutModalOpen(false); // 모달 닫기
        onLogout(); // 로그아웃 상태 업데이트
        navigate('/login'); // 로그인 페이지로 이동
    };

    const handleNotificationClick = () => {
        setNotificationsOpen(true);
    };

    const handleCloseNotifications = () => {
        setNotificationsOpen(false);
    };

    return (
        <>
            <div className="header">
                <button className="user-name-button" onClick={handleUserNameClick}>
                    항만관리자123
                </button>
                <button className="notification-button" onClick={handleNotificationClick}>
                    알림
                </button>
                <LogoutModal
                    isOpen={isLogoutModalOpen}
                    onClose={handleCloseLogoutModal}
                    onLogout={handleLogout}
                />
                <Notification
                    isOpen={isNotificationsOpen}
                    onClose={handleCloseNotifications}
                />
            </div>
        </>
    );
};

export default Header;
