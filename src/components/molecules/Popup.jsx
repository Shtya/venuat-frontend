'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Popup = ({ content, isOpen, onClose, title, cn }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div className={`${!isOpen ? 'pointer-events-none' : 'backdrop-blur-[2px]'} fixed top-0 left-0 w-full h-full px-[30px] flex items-center justify-center z-[50000000000000000000]`}>
            {/* Background Overlay */}
            <div onClick={onClose} className={`${!isOpen && 'top-[-100vh] opacity-0'} transition-all duration-500 w-full h-full absolute left-0 top-0 opacity-70`} style={{ background: 'rgba(0, 0, 0, 0.78)' }}></div>

            <div onClick={onClose} className={`${!isOpen && 'bottom-[-100vh] opacity-0'} transition-all duration-500 w-full h-full absolute left-0 bottom-0 opacity-70`} style={{ background: 'rgba(0, 0, 0, 0.78)' }}></div>

            {/* Popup Content */}
            <div className={`${!isOpen ? 'max-h-0 opacity-0 ' : ' opacity-100 max-h-[700px] max-md:max-h-[500px] p-[30px]'} overflow-auto duration-500 transition-all bg-white dark:bg-bg1 rounded-[6px] shadow-lg mx-auto max-w-[600px] w-full relative ${cn}`}>
                {/* Close Button */}
                <div className='flex items-center justify-between mb-[30px]'>
                    <h3 className=' capitalize flex-1 text-center #0D0C0D text-[24px] font-[700] '>{title}</h3>
                    <svg onClick={onClose} className=' cursor-pointer duration-300 hover:scale-[.99] ' width='30' height='30' viewBox='0 0 49 49' fill='none' xmlns='http://www.w3.org/2000/svg'> <path fill-rule='evenodd' clip-rule='evenodd' d='M48.248 24.6055C48.248 37.8607 37.5032 48.6055 24.248 48.6055C10.9928 48.6055 0.248047 37.8607 0.248047 24.6055C0.248047 11.3503 10.9928 0.605469 24.248 0.605469C37.5032 0.605469 48.248 11.3503 48.248 24.6055ZM14.9144 33.9391C14.6895 33.714 14.5631 33.4089 14.5631 33.0907C14.5631 32.7725 14.6895 32.4673 14.9144 32.2423L22.5512 24.6055L14.9144 16.9687C14.6959 16.7423 14.5749 16.4392 14.5776 16.1246C14.5804 15.81 14.7066 15.509 14.9291 15.2865C15.1516 15.064 15.4525 14.9378 15.7672 14.9351C16.0818 14.9323 16.3849 15.0533 16.6112 15.2719L24.248 22.9087L31.8848 15.2719C32.1112 15.0533 32.4143 14.9323 32.7289 14.9351C33.0436 14.9378 33.3445 15.064 33.567 15.2865C33.7895 15.509 33.9157 15.81 33.9185 16.1246C33.9212 16.4392 33.8002 16.7423 33.5816 16.9687L25.9448 24.6055L33.5816 32.2423C33.8002 32.4686 33.9212 32.7717 33.9185 33.0864C33.9157 33.401 33.7895 33.702 33.567 33.9244C33.3445 34.1469 33.0436 34.2731 32.7289 34.2759C32.4143 34.2786 32.1112 34.1577 31.8848 33.9391L24.248 26.3023L16.6112 33.9391C16.3862 34.164 16.081 34.2904 15.7628 34.2904C15.4447 34.2904 15.1395 34.164 14.9144 33.9391Z' fill='#1E328B' />{' '} </svg>
                </div>

                <div className='h-[0px] mb-[30px] dark:border-border1 border-[1px] border-[#ebebeb]'></div>

                <div>{content}</div>
            </div>
        </div>,
        document.body, // Mount the popup directly to the body
    );
};

export default Popup;
