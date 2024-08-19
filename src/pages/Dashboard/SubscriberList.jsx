import {useEffect, useState} from "react";
import ai from "../../api/ai.js";
import SubscriberComponent from "../../components/SubscriberComponent.jsx";

const SubscriberList = () => {
    const [locations, setLocations] = useState([]);

    const fetchLocations = async () => {
        const locations = await ai.fetchLocations();
        setLocations(locations);
    }

    useEffect(() => {
        fetchLocations()
    }, []);

    return (
        <div>
            <h1>Subscriber Locations</h1>
            {!locations.length ? (
                <p>카메라가 없습니다.</p>
            ) : (
                <ul>
                    {locations.map((location, index) => (
                        <li key={index}>
                            <SubscriberComponent locationName={location}/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SubscriberList;
