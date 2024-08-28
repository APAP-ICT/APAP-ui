import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './HistoryRecord.css';
import {dateFormat} from "../../util/utils.js";
import history from "../../api/history.js";

const incidentTypes = ["화재", "전기", "가스 유출"];
const cameraLocations = ["A-101", "A-102", "C-394", "E-132"];

const HistoryRecord = () => {
    const [incidents, setIncidents] = useState([]);
    const [incidentType, setIncidentType] = useState("");
    const [cameraLocation, setCameraLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const navigate = useNavigate();

    const isOnlyOneTruthy = (startDate, endDate) => (!startDate && endDate) || (startDate && !endDate)

    const fetchIncidents = async () => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isOnlyOneTruthy(startDate, endDate)){
            return;
        }

        if (start > end) {
            alert("시작일이 종료일보다 클 수 없습니다.");
            return;
        }

        const results = await history.fetchDetectResults({
            cameraName: cameraLocation, startDate: startDate, endDate: endDate
        });
        setIncidents(results)
    };

    useEffect(() => {
        fetchIncidents();
    }, [incidentType, cameraLocation, startDate, endDate]);

    const handleIncidentClick = (incidentId) => {
        navigate(`/history/${incidentId}`);
    };

    const handleIncidentTypeChange = (event) => {
        setIncidentType(event.target.value);
    };

    const handleCameraLocationChange = (event) => {
        setCameraLocation(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const formatIncidentTitle = (dateString, description) => `${dateFormat(dateString)}_${description}`;

    return (<div className="incident-list-container">
        <header className="incident-list-header">
            <h1>이상상황 과거이력 리스트</h1>
        </header>
        <div className="incident-list-filters">
            <input
                type="date"
                id="dateInput"
                value={startDate}
                onChange={handleStartDateChange}
            />
            ~
            <input
                type="date"
                id="dateInput"
                value={endDate}
                onChange={handleEndDateChange}
            />
            <select value={cameraLocation} onChange={handleCameraLocationChange}>
                <option value="">카메라 위치를 선택해주세요</option>
                {cameraLocations.map((location, index) => (<option key={index} value={location}>
                    {location}
                </option>))}
            </select>
            <select value={incidentType} onChange={handleIncidentTypeChange}>
                <option value="">이상상황을 선택해주세요</option>
                {incidentTypes.map((type, index) => (<option key={index} value={type}>
                    {type}
                </option>))}
            </select>
        </div>
        <div className="incident-list-grid">
            {incidents.map((incident, index) => (<div
                key={index}
                className="incident-card"
                onClick={() => handleIncidentClick(incident.id)}
            >
                <div className="incident-thumbnail">
                    <span className="play-icon">▶</span>
                </div>
                <p className="incident-title">{formatIncidentTitle(incident.localDateTime, incident.label)}</p>
            </div>))}
        </div>
    </div>);
};

export default HistoryRecord;
