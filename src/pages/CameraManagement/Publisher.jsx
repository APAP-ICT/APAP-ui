import {useCallback, useRef, useState} from 'react';
import ConnectionStatusComponent from "../../components/ConnectionStatusComponent.jsx";

const LocationInput = ({onLocationChange}) => {
    const [locationName, setLocationName] = useState('');

    const handleInputChange = (event) => {
        setLocationName(event.target.value);
    };

    const handleSubmit = () => {
        onLocationChange(locationName);
    };

    return (
        <div>
            <input
                type="text"
                value={locationName}
                onChange={handleInputChange}
                placeholder="Enter location name"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};


const Publisher = () => {
    const websocketRef = useRef(null);
    const videoRef = useRef(null);
    const [isConnected, setConnected] = useState(false);
    const resolvePublisherAddress = (locationName) => {
        return `${import.meta.env.VITE_WS_PUBLISHER}/${locationName}`
    }

    const connectWebsocket = useCallback((locationName) => {
        const videoElement = videoRef.current;
        const socket = new WebSocket(resolvePublisherAddress(locationName));
        websocketRef.current = socket;

        socket.binaryType = 'arraybuffer';
        socket.onopen = () => {
            setConnected(true);
            console.log('WebSocket connection opened');
        };

        socket.onclose = () => {
            setConnected(false);
            console.log('WebSocket connection closed');
        };

        socket.onerror = (error) => {
            setConnected(false);
            console.error('WebSocket error:', error);
        };

        function captureFrame() {
            if (videoElement.readyState !== videoElement.HAVE_ENOUGH_DATA)
                return;

            const offscreenCanvas = new OffscreenCanvas(videoElement.videoWidth, videoElement.videoHeight);
            const context = offscreenCanvas.getContext('2d');
            context.drawImage(videoElement, 0, 0, offscreenCanvas.width, offscreenCanvas.height);

            offscreenCanvas.convertToBlob({type: 'image/jpeg'}).then(blob => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(blob);
                }
            });
        }

        navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
            videoElement.srcObject = stream;
            const intervalId = setInterval(captureFrame, 100);

            return () => {
                clearInterval(intervalId);
                socket?.close();
            };
        }).catch(error => {
            console.error('Error accessing media devices.', error);
        });

        return () => {
            socket?.close();
        };
    }, []);

    return (
        <div>
            <LocationInput onLocationChange={connectWebsocket}/>
            <h1>Streamer</h1>
            <ConnectionStatusComponent isConnected={isConnected}/>
            <video ref={videoRef} autoPlay></video>
        </div>
    );
};

export default Publisher;
