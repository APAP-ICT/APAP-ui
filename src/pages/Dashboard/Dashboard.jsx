import {useState} from 'react';
import './Dashboard.css';
import SubscriberComponent from "../../components/SubscriberComponent.jsx";
import {Timeline} from "rsuite";
import CheckIcon from '@rsuite/icons/legacy/Check';
import history from "../../api/history.js";
import {dateFormat, datetimeFormat} from "../../util/utils.js";

const HistoryTimeLineComponent = ({area, histories}) => {
    const concatTimelineTitle = (history) => {
        return `${datetimeFormat(history.localDateTime)} 발생 이상현상 : ${history.label}`
    }

    const defineStatusStyle = (status) => {
        if (status === 'alert') {
            return {background: '#FF0000', color: '#FF0000'}
        } else {
            return {background: '#FFFF00', color: '#FFFF00'}
        }
    }

    return (<>
        <h2>{area} 구역의 이상상황 타임라인</h2>
        <Timeline>
            {histories && histories.map(history => {
                return <Timeline.Item dot={<CheckIcon style={defineStatusStyle(history.status)}/>}>
                    {concatTimelineTitle(history)}
                </Timeline.Item>
            })}
        </Timeline>
    </>)
}

const cameraLocations = ['신선대부두', '양곡부두', '감천항', '연합부두'];

const Dashboard = () => {
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedHistory, setSelectedHistory] = useState([]);

    const handleAreaClick = async (area) => {
        setSelectedArea(area);
        const now = dateFormat(new Date().toDateString());
        const results = await history.fetchDetectResults({
            cameraName: area, startDate: now, endDate: now
        })

        setSelectedHistory(results);
    };

    return (<div className="dashboard">
        <header className="dashboard-header">
            <h1>대시보드</h1>
        </header>
        <div className="dashboard-content">
            {cameraLocations.map((area) => (<div
                key={area}
                className={`card ${selectedArea === area ? 'selected' : ''}`}
                onClick={() => handleAreaClick(area)}
            >
                <h2>{area} 구역</h2>
                <SubscriberComponent locationName={area}/>
            </div>))}
        </div>
        {selectedArea && (<div className="timeline-content">
            <HistoryTimeLineComponent area={selectedArea} histories={selectedHistory}/>
        </div>)}
    </div>)
};

export default Dashboard;
