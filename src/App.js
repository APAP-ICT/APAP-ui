import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles.css';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';
import LoginPage from './Login_components/LoginPage';
import SignupPage from './Login_components/SignupPage';
import Dashboard from './Sidebar_components/Dashboard';
import Statistics from './Sidebar_components/Statistics';
import History from './Sidebar_components/HistoryRecord'; // HistoryRecord 컴포넌트 import
import CameraManagement from './Sidebar_components/CameraManagement';
import Report from './Sidebar_components/Report';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태 관리

    const handleLogin = () => {
        setIsAuthenticated(true); // 로그인 처리
    };

    const handleLogout = () => {
        setIsAuthenticated(false); // 로그아웃 처리
    };

    return (
        <Router>
            <div className="app-container">
                {isAuthenticated ? ( // 로그인 상태에 따라 조건부 렌더링
                    <>
                        <Sidebar />
                        <div className="main-content">
                            <Header onLogout={handleLogout} /> {/* 로그아웃 핸들러를 Header에 전달 */}
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/statistics" element={<Statistics />} />
                                <Route path="/history" element={<History />} /> {/* HistoryRecord 컴포넌트 렌더링 */}
                                <Route path="/camera-management" element={<CameraManagement />} />
                                <Route path="/report" element={<Report />} />
                                <Route path="/" element={<MainContent />} />
                                <Route path="*" element={<Navigate to="/" />} /> {/* 잘못된 경로 처리 */}
                            </Routes>
                        </div>
                    </>
                ) : (
                    <Routes>
                        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} /> {/* 로그인 페이지 */}
                        <Route path="/signup" element={<SignupPage />} /> {/* 회원가입 페이지 */}
                        <Route path="*" element={<Navigate to="/login" />} /> {/* 잘못된 경로 처리 */}
                    </Routes>
                )}
            </div>
        </Router>
    );
};

export default App;
