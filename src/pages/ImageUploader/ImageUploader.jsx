import {useState} from 'react';
import './ImageUploader.css';
import ai from "../../api/ai.js";
import {useNavigate} from "react-router-dom";

const ImageUploader = () => {
    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const navigate = useNavigate();

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
        if (photo) {
            await ai.detectImage(photo);
            alert('객체 탐지 성공');
        } else {
            alert('이미지를 선택해 주세요.');
        }
    };

    return (
        <div className="photo-uploader">
            {photo && (
                <div className="preview-container">
                    <img className="photo-preview" src={previewUrl} alt="Preview"/>
                </div>
            )}
            <div className="input-container">
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => handleFileChange(e.target.files)}
                />
                <button
                    className="upload-button"
                    type="button"
                    onClick={handleSubmit}
                >
                    이미지 업로드
                </button>
            </div>
        </div>
    );
}

export default ImageUploader;
