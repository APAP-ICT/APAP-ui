import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './HistoryRecord.css';
import {dateFormat} from "../../util/utils.js";
import history from "../../api/history.js";

const incidentTypes = [
    "개인 보호 장비(PPE) 미착용",
    "안전 수칙 무시 및 부적절한 작업 방식",
    "기계 고장 시 임시로 부적절한 수리 후 사용",
    "정비되지 않은 장비 사용",
    "과적재 혹은 불안정한 하역 작업",
    "크레인, 지게차, 컨테이너 트럭 등의 비정상 운행",
    "보안 구역 무단 침입",
    "화학물질이나 위험물 취급 시 안전 절차 미준수",
    "위험물 저장 및 운반 시 적절한 표기 및 관리 미흡",
    "화재 및 폭발 위험이 있는 작업장에서의 부적절한 행위",
    "음주, 약물 사용 후 작업",
    "작업 중 휴대전화 사용 등 주의 산만",
    "태풍, 지진 등 자연재해 시 대피 및 안전 조치 미흡"
];
const cameraLocations = ["신선대부두", "양곡부두", "감천항 입구", "연합부두 선착장"];

const HistoryRecord = () => {
    const [incidents, setIncidents] = useState([]);
    const [incidentType, setIncidentType] = useState("");
    const [cameraLocation, setCameraLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const navigate = useNavigate();

    const isOnlyOneTruthy = (startDate, endDate) => (!startDate && endDate) || (startDate && !endDate);

    const fetchIncidents = async () => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isOnlyOneTruthy(startDate, endDate)) {
            return;
        }

        if (start > end) {
            alert("시작일이 종료일보다 클 수 없습니다.");
            return;
        }

        try {
            const results = await history.fetchDetectResults({
                cameraName: cameraLocation, 
                startDate: startDate, 
                endDate: endDate,
                incidentType: incidentType
            });
            setIncidents(results);
        } catch (error) {
            console.error('Error fetching incidents:', error);
        }
    };

    const handleSearchClick = () => {
        fetchIncidents();
    };

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

    return (
        <div className="incident-list-container">
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
                    {cameraLocations.map((location, index) => (
                        <option key={index} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
                <select value={incidentType} onChange={handleIncidentTypeChange}>
                    <option value="">이상상황을 선택해주세요</option>
                    {incidentTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <button onClick={handleSearchClick} className="search-button">검색</button>
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
