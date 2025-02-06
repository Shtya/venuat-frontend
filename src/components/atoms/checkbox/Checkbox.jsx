'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Checkbox = ({ watch , dataAos , cn, KEY, label, setValue, err, cnLabel }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        setValue?.(KEY, !isChecked);
    };


    const watchKey = watch?.(KEY)
    useEffect(()=>{
        if(watchKey) { setIsChecked(watchKey)  }
    },[])

    return (
        <div  data-aos={dataAos} className={`form-group text-black2 mt-5 flex items-center gap-3 ${cn}`}>
            <input type='checkbox' id={KEY} className={`hidden`} checked={isChecked} onChange={handleCheckboxChange} />
            <div onClick={handleCheckboxChange} className={`w-5 h-5 border-2 ${isChecked ? 'border-primary2 bg-primary2' : 'border-gray-400 bg-white'} rounded-[4px] cursor-pointer flex items-center justify-center`}>
                {isChecked && <Image src='/assets/check.svg' alt='' width={20} height={20} />}
            </div>
            <label htmlFor={KEY} className={`cursor-pointer select-none text-base text-gray-700 ${cnLabel} `}> {label}  </label>
        </div>
    );
};

export default Checkbox;
