'use client';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
import { Maximize, Minimize  , ArrowRight } from 'lucide-react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';

import axios from 'axios';
import Button from '../atoms/button/Button';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { onEnter } from '@/helper/onEnter';
import SAR from '../atoms/SAR';


const Map = ({ showName=true , center, zoom , Fetch , click, setValue, data , setlocationName }) => {
    const [mapLoading, setMapLoading] = useState(true);
    const t = useTranslations();
    const locale = useLocale()
    const [position, setPosition] = useState(center || [21.2854, 39.2376]); // Default to Jeddah
    const [placeName, setPlaceName] = useState('');
    const [mainIcon, setMainIcon] = useState(null);
    const [pinIcon, setPinIcon] = useState(null); // Icon for red pins
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);



    const [isFullScreen, setIsFullScreen] = useState(false);
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    const toggleFullScreen = () => {
        const mapElementContainer = mapContainerRef.current;
        const mapElement = mapRef.current.getContainer();
        const mapInstance = mapRef.current;
    
        mapElementContainer.classList.toggle("fullscreen");
        mapElement.classList.toggle("fullscreen-map");
    
        setIsFullScreen(!isFullScreen);
    
        // Allow time for CSS transition before invalidating size
        setTimeout(() => {
            if (mapInstance) {
                mapInstance.invalidateSize();
            }
        }, 300); // Increased delay to ensure smooth transition
    };
    
    
    

    useEffect(() => {
        
        const PinHTML = `
            <div class="relative w-10 h-10 flex items-center justify-center">
                <div class="absolute w-20 h-20 bg-blue-500 opacity-20 rounded-full animate-ping"></div>
                <div class="w-[10px] h-[10px] bg-blue-700 rounded-full"></div>
            </div>
            `;

            const customIcon = L.divIcon({
            className: "custom-pin", // اسم فئة يمكن تخصيصها في CSS
            html: PinHTML, // إدراج الـ HTML المخصص
            iconSize: [40, 40], // حجم الأيقونة
            iconAnchor: [20, 20], // نقطة التثبيت
            popupAnchor: [0, -20], // موضع البوب أب
            });

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
        setPinIcon(customIcon);
    }, []);



    const fetchPlaceName = async (lat, lng) => {
        if (!lat || !lng) {
            return; // Exit function if lat or lng are null or undefined
        }
        try {
            const { data } = await axios.get( `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}` );
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
    onEnter(searchLocation)


    const [zoomSearch , setzoomSearch ] = useState(13)
    const handleSelectLocation = (lat, lon, name) => {
        setPosition([lat, lon]);
        setPlaceName(name);
        setSearchResults([]);
        setzoomSearch(25)
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
        if(!Fetch){
            if(!center?.[0] ) {
                fetchPlaceName(21.2854, 39.2376)}
            else {
                fetchPlaceName(center?.[0] , center?.[1] )}
        }
    } ,[center])

    return (
        <div className={`w-full max-w-[700px]  relative z-[0] ${isFullScreen ? "z-[10000000000000000] " : "z-[0]"} `}>
            {showName && placeName && <div className='h4 text-center mb-[20px]'>{placeName}</div>}

            <div onClick={toggleFullScreen} className={`overflow-map ${isFullScreen ? "active" : ""} w-screen h-screen fixed duration-500  inset-0 bg-black bg-opacity-50 backdrop-blur-[10px] `}></div>
            <div ref={mapContainerRef} className={`${isFullScreen ? "fixed top-[10%] left-[10%] w-[80vw] h-[80vh] " : "relative h-[400px] w-full " }  `}>
               
               
                <div className={`absolute top-[10px] left-[50%] translate-x-[-50%] z-[1000] ${isFullScreen ? "w-[400px]" : "w-[calc(100%-20px)] "} `}>
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



                <div className={`absolute bottom-[10px] left-[10px] z-[1000]`}>
                    <button
                        className=" bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                        onClick={toggleFullScreen}
                    >
                        {isFullScreen ? <Minimize /> : <Maximize />}
                    </button>
                </div>


                {mapLoading  && <SkeletonLoader /> }

                {<MapContainer
                        ref={mapRef}
                        id="map"
                        className={`w-full shadow-custom !rounded-[20px] object-cover `}
                        center={position}
                        zoom={ zoom || 13}
                        style={{ width: '100%', height: isFullScreen ? "100vh" : '400px' }}
                        key={position.toString()}
                        whenReady={() => setTimeout(() =>{ setMapLoading(false)},100) }
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
                                            <SAR price={location?.price} cnAll={" w-fit mx-auto "} cnIcon={"scale-[.9] "} />
                                            {/* <span className='text-center font-[600] text-[15px] flex items-center gap-[5px] justify-center ' > {location?.price} <SAR  />  </span> */}
                                            <Link className=' bg-primary1 block !text-white text-center py-[5px] px-[5px] rounded-md ' href={`details-halls/${location?.id}`} > {t("showMore")} </Link>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        ))
                    }

                    <Circle center={position} radius={500} color='#1E328B' opacity={0.3} />
                    <MapClickHandler />
                </MapContainer>}
            </div>
        </div>
    );
};

export default Map;


const SkeletonLoader = () => {
    return (
        <div className="animate-pulse w-full h-[400px] rounded-[20px] bg-gray-300"></div>
    );
};
