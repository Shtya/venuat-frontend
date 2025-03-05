import React from 'react';

export default function CardPlaceholder({cn , index}) {
    return (
        <div data-aos='zoom-in' data-aos-delay={`${index}00`} className={`animate-pulse h-full pb-20 max-sm:pb-12 relative rounded-3xl overflow-hidden w-full shadow-custom border border-gray-300 bg-gray-200 ${cn} `}>
            <div className='w-full h-[250px] max-sm:h-[220px] bg-gray-300'></div>
            <div className='p-5'>
                <div className='h-4 bg-gray-400 w-2/3 rounded mb-3'></div>
                <div className='h-3 bg-gray-300 w-1/2 rounded mb-2'></div>
                <div className='h-3 bg-gray-300 w-1/4 rounded mb-4'></div>
                <div className='h-10 bg-gray-400 rounded mt-5'></div>
            </div>
        </div>
    );
}
