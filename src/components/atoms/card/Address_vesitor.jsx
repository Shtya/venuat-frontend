import Image from 'next/image';
import React from 'react';

export default function Address_vesitor({titleAddress , location , titleVistor , countOfVistor , cn }) {
    
	return (
        <div  className={` ${titleVistor ? "max-sm:grid-cols-1 max-sm:gap-[10px] grid grid-cols-2" : "grid-cols-1" } ${cn} items-center gap-[10px]`}>
            <div className='row max-sm:flex gap-[10px] items-center'>
                <div className='h3 font-[600]'> {titleAddress} </div>
                {location && <div className='flex items-center gap-[5px]'>
                    <Image className='max-sm:hidden  ' src={'/assets/location.svg'} alt='' width={25} height={25} />
                    <div className='h4 '> {location} </div>
                </div>}
            </div>

            {titleVistor && <div className='row max-sm:flex gap-[10px] items-center '>
                <div className='h3 font-[600] text-primary1 '> {titleVistor} </div>
                <div className=' flex items-center gap-[5px] '>
                    <Image className='max-sm:hidden ' src={'/assets/users.svg'} alt='' width={25} height={25} />
                	<div className='h4 '> {countOfVistor} </div>
                </div>
            </div>}
        </div>
    );
}
