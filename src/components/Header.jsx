import {useState} from 'react';
import LogoutModal from '../pages/Login/LogoutModal.jsx';
import NotificationListComponent from './NotificationListComponent.jsx';
import '../styles.css';

const Header = ({onLogout, userName = '항만관리자'}) => {
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
    };

    return (
        <div className="header">
            <div className="header-buttons">
                <button className="user-name-button" onClick={handleUserNameClick}>
                    {userName}
                </button>
                <NotificationListComponent/>
            </div>
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={handleCloseLogoutModal}
                onLogout={handleLogout}
            />
        </div>
    );
};

export default Header;
