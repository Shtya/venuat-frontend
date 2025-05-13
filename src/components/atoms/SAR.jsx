import Image from 'next/image';
import React from 'react';

export default function SAR({ price, cn , cnIcon , cnAll }) {
    const formattedPrice = parseFloat(price).toLocaleString('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });

    return (
        <span className={`flex items-center gap-[2px] text-[15px] text-[#1e328b]  font-[500] ${cnAll} `}>
            {price && <span className={` ${cn} font-[700] `}> {formattedPrice} </span>}
            <svg  className={`flex-none ${cnIcon} `} width='20' height='20' viewBox='0 0 52 59' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <g clipPath='url(#clip0_1284_3586)'>
                    <path className={`fill-[#1e328b] ${cn}`} d='M32.3627 52.2815C31.4347 54.3349 30.8214 56.5632 30.5864 58.9001L50.2232 54.7342C51.1511 52.6813 51.764 50.4525 51.9995 48.1157L32.3627 52.2815Z' fill='' />
                    <path className={`fill-[#1e328b] ${cn}`} d='M50.2233 42.254C51.1513 40.2011 51.7646 37.9723 51.9996 35.6355L36.7032 38.8822V32.6408L50.2229 29.7736C51.1508 27.7207 51.7642 25.4919 51.9992 23.155L36.7027 26.399V3.95312C34.3588 5.26649 32.2772 7.01472 30.5851 9.07687V27.6971L24.4676 28.9948V0.900299C22.1237 2.2132 20.0421 3.9619 18.35 6.02404V30.292L4.66194 33.1948C3.73401 35.2477 3.12017 37.4765 2.88472 39.8133L18.35 36.5334V44.3933L1.77592 47.9082C0.847998 49.9611 0.234622 52.1899 -0.000366211 54.5267L17.3481 50.8474C18.7603 50.5543 19.9741 49.721 20.7633 48.5743L23.9449 43.867V43.8661C24.2752 43.379 24.4676 42.7918 24.4676 42.1594V35.2357L30.5851 33.938V46.4208L50.2229 42.2531L50.2233 42.254Z' fill='' />
                </g>
                <defs>
                    <clipPath id='clip0_1284_3586'>
                        <rect width='52' height='58' fill='white' transform='translate(0 0.899994)' />
                    </clipPath>
                </defs>
            </svg>
        </span>
    );
}


export function IconSAR({cn  , classname}) {
    return (
        <div className={classname} >
        <svg className='flex-none' width='20' height='20' viewBox='0 0 52 59' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g clip-path='url(#clip0_1284_3586)'>
                <path className={`fill-[#1e328b] ${cn}`} d='M32.3627 52.2815C31.4347 54.3349 30.8214 56.5632 30.5864 58.9001L50.2232 54.7342C51.1511 52.6813 51.764 50.4525 51.9995 48.1157L32.3627 52.2815Z' fill='' />
                <path className={`fill-[#1e328b] ${cn}`} d='M50.2233 42.254C51.1513 40.2011 51.7646 37.9723 51.9996 35.6355L36.7032 38.8822V32.6408L50.2229 29.7736C51.1508 27.7207 51.7642 25.4919 51.9992 23.155L36.7027 26.399V3.95312C34.3588 5.26649 32.2772 7.01472 30.5851 9.07687V27.6971L24.4676 28.9948V0.900299C22.1237 2.2132 20.0421 3.9619 18.35 6.02404V30.292L4.66194 33.1948C3.73401 35.2477 3.12017 37.4765 2.88472 39.8133L18.35 36.5334V44.3933L1.77592 47.9082C0.847998 49.9611 0.234622 52.1899 -0.000366211 54.5267L17.3481 50.8474C18.7603 50.5543 19.9741 49.721 20.7633 48.5743L23.9449 43.867V43.8661C24.2752 43.379 24.4676 42.7918 24.4676 42.1594V35.2357L30.5851 33.938V46.4208L50.2229 42.2531L50.2233 42.254Z' fill='' />
            </g>
            <defs>
                <clipPath id='clip0_1284_3586'>
                    <rect width='52' height='58' fill='white' transform='translate(0 0.899994)' />
                </clipPath>
            </defs>
        </svg>
        </div>
    );
}
