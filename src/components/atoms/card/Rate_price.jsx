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
        <div  className={` ${ rateTitle ? "max-sm:grid-cols-1 grid-cols-[1fr,100px] " : " grid-cols-1 " } ${cn} grid items-start gap-[10px] max-sm:mt-[10px] mt-[20px]`}>
 
            {priceValue && priceValue != 0 &&<div className={` ${rateTitle ? "flex-col" : " gap-[10px] "}  flex gap-[5px] max-sm:flex-row  `}>
                <div className='text-[17px] max-md:text-[15px]  font-[600]'> {priceTitle} </div>
                <div className='h2 text-primary1 font-[600] '> <SAR price={priceValue} /> </div>
            </div>}
        </div>
    );
}
