"use client"
import React, { useEffect, useState } from 'react';
import Starts from './Starts';

export default function CountainerStarts({ratings}) {
	const [avarageRate , setavarageRate ] = useState(0)
    useEffect(()=>{
        if(ratings && ratings?.length > 0){
        const totalRating = ratings?.reduce((sum, e) => sum + +e.rating, 0)
        const averageRating = totalRating / ratings.length || 0; 
        setavarageRate(Number(averageRating).toFixed(1) || 0)
        }
    },[ratings ])
    return (
        <div className='flex items-center gap-[15px]  '>
            {/* <Starts countFill={Math.floor(avarageRate)} countEmpty={5 - Math.floor(avarageRate)} color='white' />
            <span className='h4  '> {`${avarageRate}/5`} </span> */}
        </div>
    );
}
