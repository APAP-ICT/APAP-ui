import React, {useState} from 'react';
import './Dashboard.css';
import SubscriberComponent from "../../components/SubscriberComponent.jsx";
import {Timeline} from "rsuite";
import CheckIcon from '@rsuite/icons/legacy/Check';

const historyData = {
    'A-101': [
        {date: '2024-07-08 17:52:41', description: '안전모 미착용 위반', status: 'warning'},
        {date: '2024-07-07 08:12:01', description: '화재 발생', status: 'alert'},
        {date: '2024-07-07 11:30:30', description: '폭력 발생', status: 'alert'},
        {date: '2024-07-06 13:20:11', description: '2인 1조 동행 위반', status: 'warning'},
    ],
    'A-102': [
        {date: '2024-07-08 17:30:00', description: '이상 행동 감지', status: 'alert'},
        {date: '2024-07-07 10:15:00', description: '고장 발생', status: 'warning'},
    ],
    'A-103': [
        {date: '2024-07-08 12:00:00', description: '출입 금지 구역 진입', status: 'alert'},
    ],
    'A-104': [
        {date: '2024-07-08 09:45:00', description: '사고 발생', status: 'alert'},
        {date: '2024-07-07 14:00:00', description: '이상 행동 감지', status: 'warning'},
    ],
};


const HistoryTimeLineComponent = ({area, histories}) => {
    const concatTimelineTitle = (history) => {
        return `${history.date} ${history.description}`
    }

    const defineStatusStyle = (status) => {
        if (status === 'alert') {
            return {background: '#FF0000', color: '#FF0000'}
        } else if (status === 'warning') {
            return {background: '#FFFF00', color: '#FFFF00'}
        }
    }

    return (
        <>
            <h2>{area} 구역의 이상상황 타임라인</h2>
            <Timeline>
                {histories && histories.map(history => {
                    return <Timeline.Item dot={<CheckIcon style={defineStatusStyle(history.status)}/>}>
                        {concatTimelineTitle(history)}
                    </Timeline.Item>
                })}
            </Timeline>
        </>
    )
}

const Dashboard = () => {
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedHistory, setSelectedHistory] = useState([]);

    const handleAreaClick = (area) => {
        setSelectedArea(area);
        setSelectedHistory(historyData[area] || []);
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>대시보드</h1>
            </header>
            <div className="dashboard-content">
                {['A-101', 'A-102'].map((area) => (
                    <div
                        key={area}
                        className={`card ${selectedArea === area ? 'selected' : ''}`}
                        onClick={() => handleAreaClick(area)}
                    >
                        <h2>{area} 구역</h2>
                        <SubscriberComponent locationName={area}/>
                    </div>
                ))}
            </div>
            {selectedArea && (
                <div className="timeline-content">
                    <HistoryTimeLineComponent area={selectedArea} histories={selectedHistory}/>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
