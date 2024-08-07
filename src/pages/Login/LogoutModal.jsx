import React from 'react';
import './Logout_styles.css';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>로그아웃 하시겠습니까?</h2>
                <button onClick={onLogout}>로그아웃</button>
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    );
};

export default LogoutModal;
