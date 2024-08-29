import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './HistoryRecordDetail.css';
import history from "../../api/history.js";
import {replaceOperationType} from "../../util/utils.js";

const HistoryRecordDetail = () => {
    const { incidentId } = useParams();
    const [incident, setIncident] = useState(null);
    const navigate = useNavigate();

    const fetchIncidentDetail = async () => {
        const result = await history.fetchDetectResult(incidentId);
        setIncident(result);
    };

    useEffect(() => {
        fetchIncidentDetail();
    }, [incidentId]);

    const handleBackClick = () => {
        navigate(-1);
    };

    if (!incident) return <p>해당 사건을 찾을 수 없습니다.</p>;

    return (
        <div className="container">
            <div className="backButtonContainer">
                <button className="backButton" onClick={handleBackClick}>
                    ←
                </button>
            </div>
            <div className="mainContent">
                <h1 className="title">{replaceOperationType(incident.label)}</h1>
                <div className="videoContainer">
                    {/* 서버에서 가져온 실제 사진을 표시 */}
                    {incident.imageUrl ? (
                        <img src={incident.imageUrl} alt="사고 이미지" className="incident-image" />
                    ) : (
                        <div className="videoPlaceholder">
                            <span className="playIcon">▶</span>
                        </div>
                    )}
                </div>
                <div className="details">
                    <h2>발생시간</h2>
                    <p>{new Date(incident.localDateTime).toLocaleString()}</p>
                    <h2>발생위치</h2>
                    <p>{incident.cameraName}</p>
                    <h2>상황 설명 및 발생가능 위험성</h2>
                    <p>{incident.description}</p>
                </div>
            </div>
            <div className="rightSidebar">
                <h2>연관된 이상상황</h2>
                <div className="relatedItems">
                    {incident.relatedIncidents && incident.relatedIncidents.length > 0 ? (
                        incident.relatedIncidents.map((related, index) => (
                            <div key={index} className="relatedItem">
                                {related.date}_{related.label}
                            </div>
                        ))
                    ) : (
                        <p>연관된 이상상황이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistoryRecordDetail;
