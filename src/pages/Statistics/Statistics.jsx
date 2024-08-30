import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'; 
import './Statistics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Statistics = () => {
    const [barData, setBarData] = useState(null);
    const [doughnutData, setDoughnutData] = useState(null); 
    const [timeFilter, setTimeFilter] = useState('1w'); 
    const [portFilter, setPortFilter] = useState('all'); 

    useEffect(() => {
        const fetchData = async () => {
            let fetchedBarData;
            let fetchedDoughnutData;
            
            switch (portFilter) {
                case '신선대부두 구역':
                    fetchedBarData = {
                        labels: ['2024-08-15', '2024-08-16', '2024-08-17'],
                        datasets: [
                            { label: '화재', backgroundColor: '#ff6384', data: [5, 2, 3] },
                            { label: '기계 고장', backgroundColor: '#36a2eb', data: [2, 4, 3] },
                            { label: '화학물질 유출', backgroundColor: '#ffcd56', data: [1, 1, 2] },
                            { label: '안전모 미착용', backgroundColor: '#4bc0c0', data: [3, 5, 4] },
                            { label: '무단 침입', backgroundColor: '#9966ff', data: [1, 3, 1] },
                        ],
                    };
                    fetchedDoughnutData = {
                        labels: ['화재', '기계 고장', '화학물질 유출', '안전모 미착용', '무단 침입'],
                        datasets: [{ data: [30, 20, 10, 25, 15], backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff'] }],
                    };
                    break;
                case '양곡부두 구역':
                    fetchedBarData = {
                        labels: ['2024-08-15', '2024-08-16', '2024-08-17'],
                        datasets: [
                            { label: '화재', backgroundColor: '#ff6384', data: [2, 3, 1] },
                            { label: '기계 고장', backgroundColor: '#36a2eb', data: [3, 2, 4] },
                            { label: '화학물질 유출', backgroundColor: '#ffcd56', data: [4, 1, 3] },
                            { label: '안전모 미착용', backgroundColor: '#4bc0c0', data: [1, 3, 2] },
                            { label: '무단 침입', backgroundColor: '#9966ff', data: [2, 2, 3] },
                        ],
                    };
                    fetchedDoughnutData = {
                        labels: ['화재', '기계 고장', '화학물질 유출', '안전모 미착용', '무단 침입'],
                        datasets: [{ data: [25, 20, 25, 15, 15], backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff'] }],
                    };
                    break;
                default:
                    fetchedBarData = {
                        labels: ['2024-08-15', '2024-08-16', '2024-08-17'],
                        datasets: [
                            { label: '화재', backgroundColor: '#ff6384', data: [5, 4, 6] },
                            { label: '기계 고장', backgroundColor: '#36a2eb', data: [3, 5, 2] },
                            { label: '화학물질 유출', backgroundColor: '#ffcd56', data: [2, 3, 4] },
                            { label: '안전모 미착용', backgroundColor: '#4bc0c0', data: [4, 6, 5] },
                            { label: '무단 침입', backgroundColor: '#9966ff', data: [3, 2, 1] },
                        ],
                    };
                    fetchedDoughnutData = {
                        labels: ['화재', '기계 고장', '화학물질 유출', '안전모 미착용', '무단 침입'],
                        datasets: [{ data: [25, 25, 15, 25, 10], backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff'] }],
                    };
            }

            setBarData(fetchedBarData);
            setDoughnutData(fetchedDoughnutData);
        };

        fetchData();
    }, [timeFilter, portFilter]);

    return (
        <div className="statisticsContainer">
            <h1>항만 이상상황 통계 대시보드</h1>
            
            <div className="filterContainer">
                <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                    <option value="1w">최근 1주일</option>
                    <option value="1m">최근 1개월</option>
                    <option value="3m">최근 3개월</option>
                </select>
                <select value={portFilter} onChange={(e) => setPortFilter(e.target.value)}>
                    <option value="all">모든 항만</option>
                    <option value="부산항">신선대부두</option>
                    <option value="인천항">양곡부두</option>
                </select>
            </div>

            <div className="statisticsCard">
                <div className="statisticItem">
                    <h2>화재</h2>
                    <p>지난 주 대비 10% 상승</p>
                </div>
                <div className="statisticItem">
                    <h2>기계 고장</h2>
                    <p>지난 주 대비 5% 하락</p>
                </div>
                <div className="statisticItem">
                    <h2>안전모 미착용</h2>
                    <p>지난 달 대비 15% 상승</p>
                </div>
            </div>

            <h2>최근 이상상황 통계 (일별)</h2>
            <div className="chartContainer" style={{ width: '80%', height: '400px', margin: '0 auto' }}>
                {barData ? <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: 'top' } }, maintainAspectRatio: false }} /> : <p>로딩 중...</p>}
            </div>

            <h2>최근 이상상황 종류별 비율</h2>
            <div className="chartContainer">
    {doughnutData ? (
        <>
            <Doughnut data={doughnutData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            <div className="doughnut-legend">
                {doughnutData.labels.map((label, index) => (
                    <div className="doughnut-legend-item" key={index}>
                        <div className="doughnut-legend-color" style={{ backgroundColor: doughnutData.datasets[0].backgroundColor[index] }}></div>
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </>
    ) : (
        <p>로딩 중...</p>
    )}
</div>

        </div>
    );
};

export default Statistics;
