import {useState} from 'react';
import './ImageUploader.css';
import ai from "../api/ai.js";
import {useNavigate} from "react-router-dom";

const ImageUploader = () => {
    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const navigate = useNavigate();

    const handleClickMain = () => {
        navigate('/')
    }

    const handleFileChange = (files) => {
        const file = files[0];

        setPhoto(file);
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await ai.detectImage(photo)
        alert('객체 탐지 성공')
    };

    return (
        <div className="photo-uploader" style={{maxWidth: '1200px', margin: '0 auto'}}>
            {photo && (
                <div className="preview-container">
                    <img className="photo-preview" src={previewUrl} alt="Preview"
                         style={{maxWidth: '100%', height: 'auto'}}/>
                </div>
            )}
            <div className="input-container" style={{marginTop: '30px'}}>
                <input type="file" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e.target.files)}/>
                <button
                    className="upload-button"
                    type="submit"
                    onClick={handleSubmit}
                >
                    이미지 업로드
                </button>
            </div>
            <button onClick={handleClickMain}>메인</button>
        </div>
    );
}

export default ImageUploader;
