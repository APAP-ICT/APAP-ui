import React, { useState } from 'react';
import './Report.css';
import history from "../../api/history.js";

const Report = () => {
    const [selectedDate, setSelectedDate] = useState('1'); // 기본값을 '1'로 설정
    const [selectedMonth, setSelectedMonth] = useState('1'); // 기본값을 '1'로 설정
    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    
    // 1월부터 31일까지의 날짜 배열 생성
    const generateDays = (month) => {
        const daysInMonth = new Date(2024, parseInt(month), 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    const handleDownload = async () => {
        if (selectedDate && selectedMonth) {
            alert(`보고서를 ${selectedMonth}월 ${selectedDate}일에 다운로드합니다.`);
            history.downloadDailyReport();
        } else {
            alert('월과 날짜를 모두 선택해주세요.');
        }
    };

    return (
        <div className="reportContainer">
            <h3>보고서 날짜 선택</h3>
            
            {/* 월, 일, 다운로드 버튼을 한 줄로 배치 */}
            <div className="controlRow">
                {/* 월 선택 드롭다운 */}
                <div className="dropdownContainer">
                    <label htmlFor="month-select">월:</label>
                    <select
                        id="month-select"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        {months.map((month, index) => (
                            <option key={index + 1} value={index + 1}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 일 선택 드롭다운 */}
                <div className="dropdownContainer">
                    <label htmlFor="day-select">일:</label>
                    <select
                        id="day-select"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    >
                        {generateDays(selectedMonth).map((day) => (
                            <option key={day} value={day}>
                                {day}일
                            </option>
                        ))}
                    </select>
                </div>

                {/* 다운로드 버튼 */}
                <button className="downloadButton" onClick={handleDownload}>
                    보고서 내려받기
                </button>
            </div>
        </div>
    );
};

export default Report;
