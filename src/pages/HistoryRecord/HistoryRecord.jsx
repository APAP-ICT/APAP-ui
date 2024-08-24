import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HistoryRecord.css';

const HistoryRecord = () => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedIncidentType, setSelectedIncidentType] = useState(""); // 선택된 이상상황 유형 저장
    const [selectedCameraLocation, setSelectedCameraLocation] = useState(""); // 선택된 카메라 위치 저장
    const navigate = useNavigate();

    const incidentTypes = ["화재", "전기", "가스 유출"]; // 드롭다운에 표시될 이상상황 목록
    const cameraLocations = ["A-101", "C-394", "E-132"]; // 드롭다운에 표시될 카메라 위치 목록

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await axios.get('http://3.34.196.131:8080/api/infos');
                setIncidents(response.data);
            } catch (err) {
                setError('데이터를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []);

    const handleIncidentClick = (incidentId) => {
        navigate(`/history/${incidentId}`);
    };

    const handleIncidentTypeChange = (event) => {
        setSelectedIncidentType(event.target.value);
        // 이곳에 선택한 유형에 따른 추가 로직을 추가할 수 있습니다.
    };

    const handleCameraLocationChange = (event) => {
        setSelectedCameraLocation(event.target.value);
        // 이곳에 선택한 위치에 따른 추가 로직을 추가할 수 있습니다.
    };

    const formatIncidentTitle = (dateString, description) => {
        let formattedDate;
        try {
            const dateObj = new Date(dateString);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            formattedDate = `${year}-${month}-${day}`;
        } catch (error) {
            console.error("Invalid date format:", dateString, "Using default date.");
            formattedDate = "Invalid-date";
        }

        return `${formattedDate}_${description}`;
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="incident-list-container">
            <header className="incident-list-header">
                <h1>이상상황 과거이력 리스트</h1>
            </header>
            <div className="incident-list-filters">
                <input type="date" />
                <select value={selectedCameraLocation} onChange={handleCameraLocationChange}>
                    <option value="">카메라 위치를 선택해주세요</option>
                    {cameraLocations.map((location, index) => (
                        <option key={index} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
                <select value={selectedIncidentType} onChange={handleIncidentTypeChange}>
                    <option value="">이상상황을 선택해주세요</option>
                    {incidentTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div className="incident-list-grid">
                {incidents.map((incident, index) => (
                    <div 
                        key={index} 
                        className="incident-card" 
                        onClick={() => handleIncidentClick(incident.id)}
                    >
                        <div className="incident-thumbnail">
                            <span className="play-icon">▶</span>
                        </div>
                        <p className="incident-title">{formatIncidentTitle(incident.localDateTime, incident.label)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryRecord;
