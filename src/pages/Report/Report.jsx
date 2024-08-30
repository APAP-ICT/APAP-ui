import React, { useState } from 'react';
import './Report.css';
import history from "../../api/history.js";


const Report = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(6);
    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleDownload = async () => {
        if (selectedDate) {
            alert(`보고서를 ${selectedMonth + 1}월 ${selectedDate}일에 다운로드합니다.`);
            history.downloadDailyReport()
        } else {
            alert('날짜를 선택해주세요.');
        }
    };

    const handleMonthChange = (direction) => {
        setSelectedMonth((prevMonth) => {
            if (direction === 'prev') {
                return prevMonth === 0 ? 11 : prevMonth - 1;
            } else {
                return prevMonth === 11 ? 0 : prevMonth + 1;
            }
        });
        setSelectedDate(null);
    };

    const renderCalendar = () => {
        const daysInMonth = new Date(2024, selectedMonth + 1, 0).getDate();
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
            {selectedDate ? (
                <h3>선택한 날짜: {selectedMonth + 1}월 {selectedDate}일</h3>
            ) : (
                <h3> </h3>
            )}
            <div className="monthSelector">
                <button className="arrowButton" onClick={() => handleMonthChange('prev')}>^</button>
                <h3 className="monthLabel">{months[selectedMonth]}</h3>
                <button className="arrowButton" onClick={() => handleMonthChange('next')}>v</button>
            </div>
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
