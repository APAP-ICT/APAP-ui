import {useEffect, useRef, useState} from 'react';
import ConnectionStatusComponent from "./ConnectionStatusComponent.jsx";
import defaultImage from '../assets/loading.png';

const SubscriberComponent = ({locationName}) => {
    const imgRef = useRef(null);
    const socketRef = useRef(null);
    const [isConnected, setConnected] = useState(false);
    const resolveSubscriberAddress = (locationName) => {
        return `${import.meta.env.VITE_WS_SUBSCRIBER}/${locationName}`
    }
    const handleOnErrorLoadingImage = () => {
        imgRef.current.src = defaultImage
    }

    useEffect(() => {
        const imgElement = imgRef.current;
        imgElement.src = defaultImage

        const socket = new WebSocket(resolveSubscriberAddress(locationName));
        socket.binaryType = 'arraybuffer';
        socketRef.current = socket;

        socket.onopen = () => {
            setConnected(true);
        };

        socket.onclose = () => {
            setConnected(false);
        };

        socket.onerror = (error) => {
            setConnected(false);
            console.error(error);
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
            <ConnectionStatusComponent isConnected={isConnected}/>
            <img ref={imgRef} alt="Video Stream" onError={handleOnErrorLoadingImage}/>
        </div>
    );
};

export default SubscriberComponent;
