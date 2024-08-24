import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedHistory, setSelectedHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAreaClick = async (area) => {
        setSelectedArea(area);
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://3.34.196.131:8080/api/infos?area=${area}`);
            const formattedData = response.data.map(item => ({
                date: formatDateTime(item.localDateTime),
                description: `발생 이상현상: ${item.label}`,
            }));
            setSelectedHistory(formattedData);
        } catch (err) {
            setError('데이터를 가져오는 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>대시보드</h1>
            </header>
            <div className="dashboard-content">
                {['A-101', 'A-102', 'A-103', 'A-104'].map((area) => (
                    <div
                        key={area}
                        className={`card ${selectedArea === area ? 'selected' : ''}`}
                        onClick={() => handleAreaClick(area)}
                    >
                        <h2>{area} 구역</h2>
                        <div className="video-placeholder">비디오 스트리밍</div>
                    </div>
                ))}
            </div>
            {selectedArea && (
                <div className="history">
                    <h2>{selectedArea} 구역의 이상상황 타임라인</h2>
                    {loading && <p>로딩 중...</p>}
                    {error && <p className="error">{error}</p>}
                    {!loading && !error && (
                        <div className="timeline">
                            {selectedHistory.map((event, index) => (
                                <div key={index} className="timeline-item">
                                    <div className={`status-dot`}></div>
                                    <span>{event.date} {event.description}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
