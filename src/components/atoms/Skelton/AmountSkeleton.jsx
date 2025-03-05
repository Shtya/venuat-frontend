import React from 'react';

export default function AmountSkeleton({ style }) {
    return (
        <div className={style} >
            {/* Placeholder for Name */}
            <div className="h-4 bg-gray-300 rounded ltr:mr-auto rtl:ml-auto w-3/4 animate-pulse"></div>

            {/* Placeholder for Quantity Controls */}
            <div className="flex items-center gap-[20px] justify-center">
                <div className="w-[25px] h-[25px] bg-gray-300 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-6 animate-pulse"></div>
                <div className="w-[25px] h-[25px] bg-gray-300 rounded-full animate-pulse"></div>
            </div>

            {/* Placeholder for Price */}
            <div className="h-4 bg-gray-300 rounded w-3/4 ltr:ml-auto rtl:mr-auto  animate-pulse"></div>
        </div>
    );
}