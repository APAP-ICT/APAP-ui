import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles.css';
import Notification from './Notification.jsx';
import LogoutModal from '../pages/Login/LogoutModal.jsx';

const Header = ({onLogout, userName = '항만관리자123'}) => {
    const navigate = useNavigate();
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleUserNameClick = () => {
        setLogoutModalOpen(true);
    };

    const handleCloseLogoutModal = () => {
        setLogoutModalOpen(false);
    };

    const handleLogout = () => {
        alert('로그아웃 되었습니다.');
        setLogoutModalOpen(false);
        onLogout();
        navigate('/login');
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
                    {userName}
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
