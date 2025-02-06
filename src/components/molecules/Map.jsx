'use client';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios"

const Map = ({ center, zoom , click , setValue }) => {
    const [position, setPosition] = useState(center || [21.2854, 39.2376]); // Default to Jeddah coordinates
    const [placeName, setPlaceName] = useState('');
    const [icon, setIcon] = useState();

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
        axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
            .then(({data}) =>{
                if(data?.display_name){
                    setPlaceName(data.display_name); // Set the place name
                    setValue?.("placeName" , data.display_name )
                }
                else{
                    setPlaceName('Unknown Location');
                    setValue?.("placeName" , "Unknown Location" )
                }
            })
            .catch((err)=> {
                setPlaceName('Error fetching location');
                setValue?.("placeName" , "unknown location")
            })
       
    };

    const MapClickHandler = () => {
        if(click == false) {
            useMapEvents({
                click:  (e) => {
                    const { lat, lng } = e.latlng;
                    setPosition([lat, lng]); // Update pin position
                    fetchPlaceName(lat, lng); // Get place name
                },
            });
            return null;
        } 
        else 
        useMapEvents({
            click: e => {
                const { lat, lng } = e.latlng;
                const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
                window.open(googleMapsUrl, '_blank');
            },
        });
        return null; // This component doesn't render anything visible
    };

    return (
        <div className=' w-full w-max-[500px] z-[0] relative '>
            {placeName && <div className="h4 text-center mb-[20px]  "> {placeName} </div>}
            <MapContainer className='w-full shadow-custom rounded-[30px] max-h-[500px] object-cover' center={position} zoom={zoom || 13} style={{ width: '100%', height: '400px' }}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                <Marker position={position} icon={icon}>
                    <Popup> Your Location! </Popup>
                </Marker>
                <Circle center={position} radius={500} color='#1E328B' opacity={0.3} />
				<MapClickHandler />
            </MapContainer>
        </div>
    );
};

export default Map;
