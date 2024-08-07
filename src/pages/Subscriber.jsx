import React, {useEffect, useRef, useState} from 'react';
import ConnectionStatus from "../components/ConnectionStatus.jsx";
import defaultImage from '../assets/loading.png';

const Subscriber = () => {
    const imgRef = useRef(null);
    const socketRef = useRef(null);
    const [isConnected, setConnected] = useState(false);
    const handleOnErrorLoadingImage = () => {
        imgRef.current.src = defaultImage
    }

    useEffect(() => {
        const imgElement = imgRef.current;
        imgElement.src = defaultImage

        const socket = new WebSocket(import.meta.env.VITE_WS_SUBSCRIBER);
        socket.binaryType = 'arraybuffer';
        socketRef.current = socket;

        socket.onopen = () => {
            setConnected(true);
            console.log('WebSocket connection opened');
        };

        socket.onclose = () => {
            setConnected(false);
            console.log('WebSocket connection closed');
        };

        socket.onerror = (error) => {
            setConnected(false)
            console.error('WebSocket error:', error);
        };

        socket.onmessage = (event) => {
            const blob = new Blob([event.data], {type: 'image/jpeg'});
            imgElement.src = URL.createObjectURL(blob);
        };

        return () => {
            socketRef.current?.close();
        };
    }, []);

    return (
        <div>
            <h1>Viewer</h1>
            <ConnectionStatus isConnected={isConnected}/>
            <img ref={imgRef} alt="Video Stream" onError={handleOnErrorLoadingImage}/>
        </div>
    );
};

export default Subscriber;
