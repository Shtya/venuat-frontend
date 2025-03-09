'use client';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Button from '../atoms/button/Button';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { ArrowBigLeft, ArrowBigRight, ArrowRight } from 'lucide-react';

const Map = ({ showName=true , center, zoom, click, setValue, data , setlocationName }) => {
    const t = useTranslations();
    const locale = useLocale()
    const [position, setPosition] = useState(center || [21.2854, 39.2376]); // Default to Jeddah
    const [placeName, setPlaceName] = useState('');
    const [mainIcon, setMainIcon] = useState(null);
    const [pinIcon, setPinIcon] = useState(null); // Icon for red pins
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Icon for the main location (Blue)
        const mainLocationIcon = new L.Icon({
            iconUrl: '/assets/location-primary.svg',
            iconSize: [60, 60],
            iconAnchor: [30, 50],
            popupAnchor: [0, -12],
        });

        // Icon for additional data locations (Red Pins)
        const redPinIcon = new L.Icon({
            iconUrl: "/assets/pin2.svg" ,        
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -12],
        });

        setMainIcon(mainLocationIcon);
        setPinIcon(redPinIcon);
    }, []);



    const fetchPlaceName = async (lat, lng) => {
        try {
            const { data } = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            if (data?.display_name) {
                setPlaceName(data.display_name);
                setlocationName?.(data?.display_name)
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

    const searchLocation = async () => {
        if(!searchQuery) return
        setLoading(true);
        if (!searchQuery.trim()) return;
        try {
            const { data } = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
            );
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
        setLoading(false);
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


    useEffect(()=> {
        fetchPlaceName(center?.[0] , center?.[1] )
    } ,[])

    return (
        <div className='w-full w-max-[500px] z-[0] relative'>
            {showName && placeName && <div className='h4 text-center mb-[20px]'>{placeName}</div>}

            <div className='relative'>
                <div className="absolute top-[10px] left-[50%] translate-x-[-50%] z-[1000] w-[calc(100%-20px)] ">
                    <div className='relative w-full p-2 border rounded-[20px] outline-none bg-white'>
                        <input
                            className="w-full outline-none text-[14px] px-[10px] "
                            type="text"
                            placeholder={t("searchLocation")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button
                            isLoading={loading}
                            name={ <ArrowRight />}
                            onClick={searchLocation}
                            classname="absolute !min-h-[20px] rtl:rotate-[-180deg] rtl:left-[4px] ltr:right-[4px] top-[50%] translate-y-[-50%] bg-primary1 cursor-pointer hover:scale-[.96] duration-300 text-white text-[11px] !px-[5px] py-1 !rounded-[20px]  "
                        />
                    </div>
                    {searchResults.length > 0 && (
                        <ul className="z-10 absolute w-full bg-white border rounded shadow mt-2 max-h-40 overflow-y-auto">
                            {searchResults.map((result, index) => (
                                <li
                                    key={index}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleSelectLocation(result.lat, result.lon, result.display_name)}
                                >
                                    {result.display_name}
                                </li>
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

                    {/* Main Marker (User Selected Location) */}
                    {!data && mainIcon && (
                        <Marker position={position} icon={mainIcon}>
                            <Popup>{placeName || 'Your Location'}</Popup>
                        </Marker>
                    )}

                    {/* Additional Data Markers (Red Pins) */}
                    {data?.length > 0 &&
                        data.map((location, index) => (
                            location.lat && location.lng && ( // Ensure lat & lng exist
                                <Marker
                                    key={index}
                                    position={[location.lat, location.lng]}
                                    icon={pinIcon}
                                >
                                    <Popup  >
                                        <div className='flex flex-col gap-[10px] ' >
                                            {location?.name?.[locale] || `Location ${index + 1}`}
                                            <Link className=' bg-primary1 block !text-white text-center py-[5px] px-[5px] rounded-md ' href={`details-halls/${location?.id}`} > {t("showMore")} </Link>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        ))
                    }

                    <Circle center={position} radius={500} color='#1E328B' opacity={0.3} />
                    <MapClickHandler />
                </MapContainer>
            </div>
        </div>
    );
};

export default Map;
