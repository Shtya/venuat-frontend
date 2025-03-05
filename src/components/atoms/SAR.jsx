import Image from 'next/image';
import React from 'react';

export default function SAR({price , cn}) {

    const formattedPrice = parseFloat(price).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    return (
        <span className='flex items-center gap-[2px] text-[#175932]  font-[500] '>
			<span className={cn} > {formattedPrice} </span>
            <Image className='rtl:order-[1] ' src={'/assets/imgs/currency.png'} alt='' width={25} height={25} /> 
        </span>
    );
}
