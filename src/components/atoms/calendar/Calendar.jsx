"use client";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useEffect , useState } from "react";


const Calendar = ({watch , dataAos , reverse , cnInput , label , cnLabel , trigger , error , setValue ,KEY, classname , place }) => {
  const t = useTranslations()
  const datePickerRef = useRef(null);
  const [currentDate , setcurrentDate ] = useState()

  const watchKey = watch?.(KEY)
  useEffect(()=>{
    if(watchKey) {
       trigger?.(KEY)
        setcurrentDate(watchKey)
      }
      else{
        setcurrentDate(place)

      }
  },[watchKey])


  useEffect(() => {

    const ele = document.getElementById(KEY) 
    flatpickr( ele , {
      dateFormat: "Y-m-d",
      onChange: (selectedDates) => {
        const date = selectedDates[0];
        if (date) {
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
          setcurrentDate(formattedDate?.split("T")[0]);
          setValue && setValue( KEY , formattedDate?.split("T")[0]);
        }
      }
    });
  }, []);

  return (
    <label data-aos={dataAos} id={KEY} className={` flex flex-col gap-[5px] relative  w-[180px] rounded-[5px] cursor-pointer ${classname} `}>
      {label && <label htmlFor={KEY} className={`h5 ${cnLabel}`} > {label} </label> }

      <label  htmlFor={KEY} className={` ${cnInput} ${reverse ? "px-[10px]" : "px-[10px]"} border-b-[1px] border-b-[#BCBBBF] h-[50px] flex items-center justify-between gap-[20px] w-full  cursor-pointer`}>
        <input className=" hidden absolute cursor-pointer inset-0 opacity-0  z-[-1] " id={KEY} ref={datePickerRef} type="text" />
        <Image className={` ltr:mr-[0px] ltr:ml-[-10px] rtl:mr-[-10px] rtl:ml-[-10px] ${reverse && "order-[10] "}`} src="/assets/calendar.svg" alt="" width={20} height={20} />
        <span className={` flex-1  h5  ml-[-10px] ${currentDate ? "text-secondry2" : "text-secondry3"} `}> { currentDate || place } </span>
      </label>

      {error && <div className='error absolute ' > {t(error?.message)} </div>}
    </label>
  );
};

export default Calendar;
