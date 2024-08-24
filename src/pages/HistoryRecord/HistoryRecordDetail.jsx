import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './HistoryRecordDetail.css';

const HistoryRecordDetail = () => {
    const { incidentId } = useParams(); // URL에서 incidentId를 가져옴
    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncidentDetails = async () => {
            try {
                const response = await axios.get(`http://3.34.196.131:8080/api/infos/${incidentId}`);
                setIncident(response.data);
            } catch (err) {
                setError('데이터를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchIncidentDetails();
    }, [incidentId]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!incident) return <p>해당 사건을 찾을 수 없습니다.</p>;

    return (
        <div className="container">
            <div className="mainContent">
                <h1 className="title">{incident.date}_{incident.label}</h1>
                <div className="videoContainer">
                    <div className="videoPlaceholder">
                        <span className="playIcon">▶</span>
                    </div>
                </div>
                <div className="details">
                    <h2>발생시간</h2>
                    <p>{new Date(incident.localDateTime).toLocaleString()}</p>
                    <h2>발생위치</h2>
                    <p>{incident.location}</p>
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
