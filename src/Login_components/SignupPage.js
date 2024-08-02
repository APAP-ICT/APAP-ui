import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SignupPage.css';

const SignupPage = () => {
    const navigate = useNavigate(); 

    useEffect(() => {
        const form = document.getElementById('signupForm');
        const cancelButton = document.getElementById('cancelButton');

        cancelButton.addEventListener('click', function() {
            form.reset(); // 폼 초기화
            navigate('/login'); // 로그인 페이지로 이동
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // 기본 제출 동작 방지
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const nickname = document.getElementById('nickname').value;

            if (password !== confirmPassword) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            // 회원가입 로직 처리 (예: 서버에 데이터 전송)
            alert(`회원가입 성공! 아이디: ${username}, 닉네임: ${nickname}`);
            form.reset(); 
        });
    }, [navigate]);

    return (
        <div className="container">
            <h1>회원가입</h1>
            <form id="signupForm">
                <label htmlFor="username">아이디</label>
                <input type="text" id="username" required />

                <label htmlFor="nickname">닉네임</label>
                <input type="text" id="nickname" required />

                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" required />

                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input type="password" id="confirmPassword" required />

                <div className="buttons">
                    <button type="submit" id="signupButton">회원가입</button>
                    <button type="button" id="cancelButton">취소</button>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;
