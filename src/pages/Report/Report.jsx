import React, { useState } from 'react';
import './Report.css';

const Report = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(6); // 기본값: 7월 (0-11로 표현)
    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleDownload = () => {
        if (selectedDate) {
            alert(`보고서를 ${selectedMonth + 1}월 ${selectedDate}일에 다운로드합니다.`);
        } else {
            alert('날짜를 선택해주세요.');
        }
    };

    const renderCalendar = () => {
        const daysInMonth = new Date(2024, selectedMonth + 1, 0).getDate(); // 선택한 월의 마지막 날
        const calendarDays = [];

        for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push(
                <div
                    key={i}
                    className={`calendarDay ${selectedDate === i ? 'selected' : ''}`}
                    onClick={() => handleDateClick(i)}
                >
                    {i}
                </div>
            );
        }

        return calendarDays;
    };

    return (
        <div className="reportContainer">
            <h1>보고서</h1>
            <h3>날짜를 선택해주세요.</h3>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                {months.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                ))}
            </select>
            <h3>{months[selectedMonth]}</h3>
            <div className="calendarGrid">
                {renderCalendar()}
            </div>
            <button className="downloadButton" onClick={handleDownload}>
                보고서 내려받기
            </button>
        </div>
    );
};

export default Report;
