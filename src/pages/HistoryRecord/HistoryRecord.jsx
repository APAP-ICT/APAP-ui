import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './HistoryRecord.css';
import {dateFormat} from "../../util/utils.js";
import history from "../../api/history.js";

const HistoryRecord = () => {
    const [incidents, setIncidents] = useState([]);
    const [selectedIncidentType, setSelectedIncidentType] = useState("");
    const [selectedCameraLocation, setSelectedCameraLocation] = useState("");
    const [selectedDate, setSelectedDate] = useState('');
    const navigate = useNavigate();


    const incidentTypes = ["화재", "전기", "가스 유출"];
    const cameraLocations = ["A-101", "A-102", "C-394", "E-132"];

    const fetchIncidents = async () => {
        const results = await history.fetchDetectResults({
            cameraName: selectedCameraLocation,
            date: selectedDate
        });
        setIncidents(results)
    };

    useEffect(() => {
        fetchIncidents();
    }, [selectedIncidentType, selectedCameraLocation, selectedDate]);

    const handleIncidentClick = (incidentId) => {
        navigate(`/history/${incidentId}`);
    };

    const handleIncidentTypeChange = (event) => {
        setSelectedIncidentType(event.target.value);
    };

    const handleCameraLocationChange = (event) => {
        setSelectedCameraLocation(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const formatIncidentTitle = (dateString, description) => `${dateFormat(dateString)}_${description}`;

    return (
        <div className="incident-list-container">
            <header className="incident-list-header">
                <h1>이상상황 과거이력 리스트</h1>
            </header>
            <div className="incident-list-filters">
                <input
                    type="date"
                    id="dateInput"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
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
