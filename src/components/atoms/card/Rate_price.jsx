"use client"
import React, { useState , useEffect } from 'react';
import Starts from '../start/Starts';
import SAR from '../SAR';

export default function Rate_price({ rateTitle, ratings , priceTitle, priceValue , cn }) {

    const [avarageRate , setavarageRate ] = useState(0)
    useEffect(()=>{
        if(ratings && ratings?.length > 0){
        const totalRating = ratings?.reduce((sum, e) => sum + +e.rating, 0)
        const averageRating = totalRating / ratings.length || 0; 
        setavarageRate(Number(averageRating).toFixed(1) || 0)
        }
    },[ratings ])


    return (
        <div  className={` ${ rateTitle ? "max-sm:grid-cols-1 grid-cols-2 " : " grid-cols-1 " } ${cn} grid items-start gap-[10px] max-sm:my-[10px] my-[20px]`}>
            {rateTitle && <div className=' flex-col flex gap-[10px] max-sm:flex-row max-sm:gap-[10px] '>
                <div className='h3 font-[600] '> {rateTitle} </div>
                <div className='flex flex-wrap items-center gap-[10px]  '>
                    <Starts countFill={Math.floor(avarageRate)} countEmpty={5 - Math.floor(avarageRate)} />
                    <span className='h4'> {`${avarageRate}/5`} </span>
                </div>
            </div>}

            <div className={` ${rateTitle ? "flex-col" : " gap-[10px] "}  flex gap-[5px] max-sm:flex-row max-sm:gap-[10px] `}>
                <div className='h3 font-[600]'> {priceTitle} </div>
                <div className='h2 text-primary1 font-[600] '> <SAR price={priceValue} /> </div>
            </div>
        </div>
    );
}
