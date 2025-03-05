'use client';

import { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function TimePicker({ cnInput, watch, trigger , error , label, place , setValue , KEY }) {
    const t =useTranslations()
    const [time, setTime] = useState(null);

    const watchKey = watch?.(KEY)
    useEffect(()=>{
      if(watchKey) trigger?.(KEY)
    },[watchKey])
  

    const handleChangeTime = (selectedDates) => {
        const selectedDate = selectedDates[0];
        setTime(selectedDate);

        // Format the selected time to HH:MM:SS
        const hours = String(selectedDate.getHours()).padStart(2, '0');
        const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
        const seconds = String(selectedDate.getSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        // Pass the formatted time to the parent component
        setValue?.(KEY, formattedTime);
    };

    return (
        <div className=" relative flex flex-col gap-[5px] w-full ">
            <label className="text-[#000] h5 font-normal">{label}</label>
            
            <div className="relative max-w-[600px] w-full">
				<Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" src={"/assets/clock.svg"} alt='' width={20} height={20} />

                <Flatpickr
                    value={time}
                    onChange={handleChangeTime}
                    options={{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: 'H:i',
                        time_24hr: true,
                    }}
                    className={` ${cnInput} w-full border h-[45px] pl-10 pr-4 rounded-[4px]  border-secondry3`}
                    placeholder={place}
                />
            </div>

            {error && <div className='error absolute ' > {t(error?.message)} </div>}

        </div>
    );
}
