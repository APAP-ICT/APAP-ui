import {useCallback, useRef, useState} from 'react';
import ConnectionStatusComponent from "../../components/ConnectionStatusComponent.jsx";

const LocationInput = ({onLocationChange}) => {
    const [locationName, setLocationName] = useState('');
    const [operation, setOperation] = useState('estimate_distance');

    const handleLocationInputChange = (event) => {
        setLocationName(event.target.value);
    };

    const handleOperationInputChange = (event) => {
        setOperation(event.target.value);
    };

    const handleSubmit = () => {
        onLocationChange(locationName, operation);
    };

    return (
        <div>
            <input
                type="text"
                value={locationName}
                onChange={handleLocationInputChange}
                placeholder="Enter location name"
            />
            <input
                type="text"
                value={operation}
                onChange={handleOperationInputChange}
                placeholder="Enter operation name"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};


const Publisher = () => {
    const websocketRef = useRef(null);
    const videoRef = useRef(null);
    const [isConnected, setConnected] = useState(false);
    const resolvePublisherAddress = (locationName, operation) => {
        return `${import.meta.env.VITE_WS_PUBLISHER}/${locationName}?op=${operation}`
    }

    const connectWebsocket = useCallback((locationName, operation) => {
        const videoElement = videoRef.current;
        const socket = new WebSocket(resolvePublisherAddress(locationName, operation));
        websocketRef.current = socket;

        socket.binaryType = 'arraybuffer';
        socket.onopen = () => {
            setConnected(true);
        };

        socket.onclose = () => {
            setConnected(false);
        };

        socket.onerror = (error) => {
            setConnected(false);
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
