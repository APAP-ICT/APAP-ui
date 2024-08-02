import React, { useState } from 'react';
import './CameraManagement.css';

const CameraManagement = () => {
    const [cameras, setCameras] = useState([
        { id: 'A101', status: 'ON' },
        { id: 'A102', status: 'ON' },
        { id: 'B101', status: 'OFF' },
        { id: 'E101', status: 'ON' },
        { id: 'E102', status: 'OFF' },
        { id: 'E103', status: 'ON' },
    ]);

    const toggleCamera = (id) => {
        setCameras(cameras.map(camera => 
            camera.id === id 
                ? { ...camera, status: camera.status === 'ON' ? 'OFF' : 'ON' } 
                : camera
        ));
    };

    return (
        <div className="cameraContainer">
            {cameras.map(camera => (
                <div key={camera.id} className="cameraCard">
                    <div className="videoPlaceholder">
                        <span className="playIcon">▶</span>
                    </div>
                    <div className="cameraId">{camera.id}</div>
                    <button 
                        className={`toggleButton ${camera.status === 'ON' ? 'on' : 'off'}`} 
                        onClick={() => toggleCamera(camera.id)}
                    >
                        {camera.status}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CameraManagement;
