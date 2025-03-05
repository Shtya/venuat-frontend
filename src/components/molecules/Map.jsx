'use client';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Button from '../atoms/button/Button';
import { useTranslations } from 'next-intl';

const Map = ({ center, zoom, click, setValue }) => {
    const t = useTranslations()
    const [position, setPosition] = useState(center || [21.2854, 39.2376]); // Default to Jeddah
    const [placeName, setPlaceName] = useState('');
    const [icon, setIcon] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const customIcon = new L.Icon({
            iconUrl: '/assets/location-primary.svg',
            iconSize: [60, 60],
            iconAnchor: [30, 50],
            popupAnchor: [0, -12],
        });
        setIcon(customIcon);
    }, []);

    const fetchPlaceName = async (lat, lng) => {
        try {
            const { data } = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            if (data?.display_name) {
                setPlaceName(data.display_name);
                setValue?.('placeName', data.display_name);
                setValue?.('lat', data.lat);
                setValue?.('lng', data.lon);
            } else {
                setPlaceName('Unknown Location');
            }
        } catch (err) {
            setPlaceName('Error fetching location');
        }
    };

    const [loading , setloading] = useState(false)
    const searchLocation = async () => {
        setloading(true)
        if (!searchQuery.trim()) return;
        try {
            const { data } = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
            );
            setSearchResults(data); // Store search results
        } catch (error) {
            console.error('Error fetching location:', error);
        }
        setloading(false)
    };

    const handleSelectLocation = (lat, lon, name) => {
        setPosition([lat, lon]);
        setPlaceName(name);
        setSearchResults([]);
        setSearchQuery('');
        setValue?.('placeName', name);
        setValue?.('lat', lat);
        setValue?.('lng', lon);
    };

    const MapClickHandler = () => {
        useMapEvents({
            click: (e) => {
                if (click === false) {
                    const { lat, lng } = e.latlng;
                    setPosition([lat, lng]);
                    fetchPlaceName(lat, lng);
                } else {
                    const { lat, lng } = e.latlng;
                    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
                    window.open(googleMapsUrl, '_blank');
                }
            },
        });
        return null;
    };

    return (
        <div className='w-full w-max-[500px] z-[0] relative'>
            {/* Search Box */}
        
            {/* Map Display */}
            {placeName && <div className='h4 text-center mb-[20px]'>{placeName}</div>}

            <div className='relative ' >
            <div className="absolute top-[10px] left-[50%] translate-x-[-50%] z-[1000] w-full max-w-[350px] ">
                <div className=' relative w-full p-2 border rounded-lg outline-none bg-white' >
                    <input  className=" w-full outline-none " type="text" placeholder={t("searchLocation")}  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  />
                    <Button isLoading={loading} name={t("search")} onClick={searchLocation} classname="absolute  !min-h-[20px] right-2 top-[50%] translate-y-[-50%] bg-primary1 cursor-pointer hover:scale-[.96] duration-300 text-white text-[11px] !px-3 py-1 !rounded" />
                    {/* <button onClick={searchLocation} className= > Search </button> */}
                    
                </div>
                {searchResults.length > 0 && (
                    <ul className=" z-10 absolute w-full bg-white border rounded shadow mt-2 max-h-40 overflow-y-auto">
                        {searchResults.map((result, index) => (
                            <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleSelectLocation(result.lat, result.lon, result.display_name)} > {result.display_name} </li>
                        ))}
                    </ul>
                )}
            </div>
            <MapContainer
                className='w-full shadow-custom !rounded-[20px] max-h-[500px] object-cover'
                center={position}
                zoom={zoom || 13}
                style={{ width: '100%', height: '400px' }}
                key={position.toString()}
            >
                
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={icon}>
                    <Popup>{placeName || 'Your Location'}</Popup>
                </Marker>
                <Circle center={position} radius={500} color='#1E328B' opacity={0.3} />
                <MapClickHandler />
            </MapContainer>
            </div>
        </div>
    );
};

export default Map;



// 'use client';
// import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
// import { useState, useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import axios from 'axios';

// const Map = ({ center, zoom, click, setValue }) => {
//     const [position, setPosition] = useState(center || [21.2854, 39.2376]); // Default to Jeddah coordinates
//     const [placeName, setPlaceName] = useState('');
//     const [icon, setIcon] = useState();

//     useEffect(() => {
//         const customIcon = new L.Icon({
//             iconUrl: '/assets/location-primary.svg',
//             iconSize: [60, 60],
//             iconAnchor: [30, 50],
//             popupAnchor: [0, -12],
//         });
//         setIcon(customIcon);
//     }, []);

//     const fetchPlaceName = async (lat, lng) => {
//         try {
//             const { data } = await axios.get(
//                 `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
//             );
//             if (data?.display_name) {
//                 setPlaceName(data.display_name); // Set the place name
//                 setValue?.('placeName', data.display_name);
//                 setValue?.('lat', data.lat);
//                 setValue?.('lng', data.lon);
//             } else {
//                 setPlaceName('Unknown Location');
//                 setValue?.('placeName', 'Unknown Location');
//                 setValue?.('lat', "");
//                 setValue?.('lng', "");
//             }
//         } catch (err) {
//             setPlaceName('Error fetching location');
//             setValue?.('placeName', 'unknown location');
//         }
//     };

//     const MapClickHandler = () => {
//         useMapEvents({
//             click: (e) => {
//                 if (click === false) {
//                     const { lat, lng } = e.latlng;
//                     setPosition([lat, lng]); // Update pin position
//                     fetchPlaceName(lat, lng); // Get place name
//                 } else {
//                     const { lat, lng } = e.latlng;
//                     const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
//                     window.open(googleMapsUrl, '_blank');
//                 }
//             },
//         });
//         return null; // This component doesn't render anything visible
//     };

//     return (
//         <div className='w-full w-max-[500px] z-[0] relative'>
            
//             {placeName && <div className='h4 text-center mb-[20px]'>{placeName}</div>}
//             <MapContainer
//                 className='w-full shadow-custom rounded-[30px] max-h-[500px] object-cover'
//                 center={position}
//                 zoom={zoom || 13}
//                 style={{ width: '100%', height: '400px' }}
//                 key={position.toString()} // Add a key to force re-render only when position changes
//             >
//                 <TileLayer
//                     url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <Marker position={position} icon={icon}>
//                     <Popup>Your Location!</Popup>
//                 </Marker>
//                 <Circle center={position} radius={500} color='#1E328B' opacity={0.3} />
//                 <MapClickHandler />
//             </MapContainer>
//         </div>
//     );
// };

// export default Map;