import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === 'qwer@gmail.com' && password === '1234') {
            alert('로그인 성공!');
            onLogin(username);
            navigate('/');
        } else {
            alert('로그인 실패: 잘못된 아이디 또는 비밀번호입니다.');
        }
    };

    return (
        <div className="login-container">
            <h1 className="title">APAP</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    required
                />
                <button type="submit" className="login-button">로그인</button>
            </form>
            <div className="footer-links">
                <a href="/signup">회원가입</a>
            </div>
        </div>
    );
};

export default LoginPage;
