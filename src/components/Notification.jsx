import React, { useState, useEffect, useRef } from "react";
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
        alertMessage: item.label,
        localDateTime: item.localDateTime,
        imageUrl: item.imageUrl,
        description: item.description
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
            <ul>
              {alerts.map((alert) => (
                <li key={alert.id}>
                  카메라 이름: {alert.cameraName} - 사고 내용: {alert.alertMessage}
                  <br />
                  시간: {new Date(alert.localDateTime).toLocaleString()}
                  <br />
                  설명: {alert.description}
                  <br />
                  <img src={alert.imageUrl} alt="알림 이미지" style={{maxWidth: '200px'}} />
                </li>
              ))}
            </ul>
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
