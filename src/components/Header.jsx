import React, { useState } from 'react';
import LogoutModal from '../pages/Login/LogoutModal.jsx';
import Notification from './Notification'; // Notification 컴포넌트 임포트
import '../styles.css'; // 스타일 파일 임포트

const Header = ({ onLogout }) => {
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
          항만관리자123
        </button>
        <Notification />
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
