import {useEffect, useRef, useState} from "react";
import '../styles.css';
import history from "../api/history.js";
import {datetimeFormat} from "../util/utils.js";
import {useNavigate} from "react-router-dom";

const NotificationListComponent = () => {
    const [alerts, setAlerts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef();
    const navigate = useNavigate();

    const fetchDetectResults = async () => {
        const results = await history.fetchDetectResults({})
        const sortedByDateTime = results.sort((a, b) => new Date(b.localDateTime) - new Date(a.localDateTime))
        setAlerts(sortedByDateTime);
    };

    const handleNotificationClick = async () => {
        await fetchDetectResults();
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleAlertOnClick = (infoId) => {
        handleCloseModal();
        navigate(`history/${infoId}`);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <button className="notification-button" onClick={handleNotificationClick}>
                알림
            </button>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" ref={modalRef}>
                        <h2>알림 내용</h2>
                        <table className="message-table">
                            <thead>
                            <tr>
                                <th>카메라 이름</th>
                                <th>발생 시간</th>
                                <th>탐지 결과</th>
                            </tr>
                            </thead>
                            <tbody>
                            {alerts.map((alert) => (
                                <tr key={alert.id} onClick={()=>handleAlertOnClick(alert.id)}>
                                    <td>{alert.cameraName}</td>
                                    <td>{datetimeFormat(alert.localDateTime)}</td>
                                    <td style={{whiteSpace: 'pre-wrap'}}>{alert.label}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button onClick={handleCloseModal}>닫기</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default NotificationListComponent;
