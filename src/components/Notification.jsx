import React from 'react';
import '../styles.css';

const Modal = ({ isOpen, onClose, messages }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>알림 내용</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

const Notifications = ({ isOpen, onClose }) => {
    const messages = [
        "A-101에서 화재 발생",
        "E-102에서 가스유출 발생",
        "E-305에서 폭력 발생",
        "E-401에서 안전모 미착용"
    ];

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} messages={messages} />
        </>
    );
};

export default Notifications;
