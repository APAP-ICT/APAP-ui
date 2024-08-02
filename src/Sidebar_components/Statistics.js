import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'; 
import './Statistics.css';

// Chart.js에서 필요한 스케일과 요소를 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Statistics = () => {
    const barData = {
        labels: ['7월 7일', '7월 8일', '7월 9일'],
        datasets: [
            {
                label: '화재',
                backgroundColor: 'blue',
                data: [5, 6, 7],
            },
            {
                label: '가스유출',
                backgroundColor: 'green',
                data: [3, 2, 4],
            },
            {
                label: '폭력',
                backgroundColor: 'red',
                data: [1, 3, 2],
            },
            {
                label: '선박사고',
                backgroundColor: 'purple',
                data: [2, 1, 3],
            },
        ],
    };

    const doughnutData = {
        labels: ['안전모 미착용', '가스 유출', '폭력'],
        datasets: [
            {
                data: [60, 20, 20],
                backgroundColor: ['red', 'green', 'blue'],
            },
        ],
    };

    return (
        <div className="statisticsContainer">
            <h1>통계 콘텐츠</h1>
            <div className="statisticsCard">
                <div className="statisticItem">
                    <h2>안전모 미착용</h2>
                    <p>지난 대비 15% 상승</p>
                </div>
                <div className="statisticItem">
                    <h2>A-101</h2>
                    <p>지난 달 대비 7.2% 하락</p>
                </div>
                <div className="statisticItem">
                    <h2>5.2회</h2>
                    <p>지난 주 대비 30% 하락</p>
                </div>
            </div>
            <h2>최근 이상상황 통계</h2>
            <Bar data={barData} options={{ responsive: true }} />
            <h2>최근 이상상황 종류별 통계</h2>
            <div className="chartContainer"> {/* 차트를 감싸는 컨테이너 추가 */}
                <Doughnut data={doughnutData} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default Statistics;
