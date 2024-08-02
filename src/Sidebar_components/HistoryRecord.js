import React from 'react';
import './HistoryRecord.css';

const HistoryRecord = () => {
    return (
        <div className="container">
            <div className="mainContent">
                <h1 className="title">0708_화재1</h1>
                <div className="videoContainer">
                    <div className="videoPlaceholder">
                        <span className="playIcon">▶</span>
                    </div>
                </div>
                <div className="details">
                    <h2>발생시간</h2>
                    <p>24년 7월 8일 13시 10분 15초</p>
                    <h2>발생위치</h2>
                    <p>A-101</p>
                    <h2>상황 설명 및 발생가능 위험성</h2>
                    <p>화재 발생으로 인한 연기와 화염의 위험이 있으며, 인근 지역으로의 확산 가능성이 있습니다.</p>
                </div>
            </div>
            <div className="rightSidebar">
                <h2>연관된 이상상황</h2>
                <div className="relatedItems">
                    <div className="relatedItem">0708_폭력3</div>
                    <div className="relatedItem">0708_화재2</div>
                </div>
            </div>
        </div>
    );
};

export default HistoryRecord;
