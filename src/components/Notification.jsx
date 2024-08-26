import { useEffect, useRef, useState } from "react";
import axios from "axios";
import '../styles.css';

const Notification = () => {
    const [alerts, setAlerts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef();

    const fetchDetectResults = async () => {
        try {
            const response = await axios.get("http://3.34.196.131:8080/api/infos");
            const formattedAlerts = response.data.map((item) => ({
                id: item.id,
                cameraName: item.cameraName,
                localDateTime: new Date(item.localDateTime).toLocaleString(),  // 날짜를 먼저 변환
                label: item.label,
            }));
            setAlerts(formattedAlerts);
        } catch (error) {
            console.error("탐지 결과를 가져오는 중 오류 발생:", error);
        }
    };

    const handleNotificationClick = async () => {
        await fetchDetectResults();
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

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
                        <table className="alert-table">
                            <thead>
                                <tr>
                                    <th>카메라 이름</th>
                                    <th>발생 시간</th>
                                    <th>탐지 결과</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alerts.map((alert) => (
                                    <tr key={alert.id}>
                                        <td>{alert.cameraName}</td>
                                        <td>{alert.localDateTime}</td> {/* 날짜만 표시 */}
                                        <td style={{ whiteSpace: 'pre-wrap' }}>{alert.label}</td>  {/* 탐지 결과만 표시 */}
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

export default Notification;
