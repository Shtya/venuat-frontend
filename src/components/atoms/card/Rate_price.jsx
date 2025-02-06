import React from 'react';
import Starts from '../start/Starts';

export default function Rate_price({ rateTitle, countOfRate, fill, empty, priceTitle, priceValue }) {
    return (
        <div  className='row max-sm:grid-cols-1 grid grid-cols-2 items-start gap-[10px] max-sm:my-[10px] my-[20px] '>
            <div className=' flex-col flex gap-[10px] max-sm:flex-row max-sm:gap-[10px] '>
                <div className='h3 font-[600] '> {rateTitle} </div>
                <div className='flex flex-wrap items-center gap-[10px]  '>
                    <Starts countFill={fill} countEmpty={empty} />
                    <span className='h4'> {countOfRate} </span>
                </div>
            </div>

            <div className=' flex-col flex gap-[5px] max-sm:flex-row max-sm:gap-[10px] '>
                <div className='h3 font-[600]'> {priceTitle} </div>
                <div className='h2 text-primary1 font-[600] '> {priceValue} </div>
            </div>
        </div>
    );
}
