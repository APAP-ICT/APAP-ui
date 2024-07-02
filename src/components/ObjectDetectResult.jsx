import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import history from "../api/history.js";


const ObjectDetectResult = () => {
    const [results, setResults] = useState()
    const navigate = useNavigate();
    const fetchDetectResults = async () => {
        const results = await history.fetchDetectResults()
        console.log(results)
        setResults(results)
    }
    const formatDatetime = (datetime) => datetime.split('T').join(' ')
    const handleClickUpload = () => {
        navigate('/upload')
    }

    useEffect(() => {
        fetchDetectResults();
    }, []);


    return (
        <div>
            <h2>탐지 결과</h2>
            <button onClick={handleClickUpload}>이미지 업로드</button>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>날짜</th>
                    <th>탐지 결과</th>
                    <th>이미지</th>
                </tr>
                </thead>
                <tbody>
                {results && results.length ? (results.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{formatDatetime(item.localDateTime)}</td>
                        <td>{item.label}</td>
                        <td>
                            <img src={item.imageUrl} alt={item.label} width="100"/>
                        </td>
                    </tr>
                ))) : (<tr>
                    <td colSpan="4">데이터가 없습니다</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default ObjectDetectResult
