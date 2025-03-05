'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const RadioNested = ({ setError, watch, getValues , setValue, KEY, cn, error }) => {

    const data = [
        {value:"halls" , name : "hall"} ,
        {value:"hotel" , name : "hotel"} ,
    ]

    const dataCountPlace ={
        halls :   [
            {value: false , name : "onePlace"} ,
            {value: true , name : "multiPlace"} ,
        ],

        hotel : [
            {value: false , name : "oneHotel"} ,
            {value: true , name : "multiHotel"} ,
        ],
    }
    

    const t = useTranslations();

    const [checked, setChecked] = useState();
    const [showNestedBox, setShowNestedBox] = useState(false); // State to control nested box visibility
    const handleChange = (e) => {
        setValue?.("type_place", e.name);
        setChecked(e.value);
        setError?.(null);
        setShowNestedBox(e.value);
    };

    const watchKey = watch?.("type_place");
    useEffect(() => {
        if (watchKey) {
            handleChange(watchKey);
        }
    }, []);


    const [checked2, setChecked2] = useState();
    const handleChange2 = (e) => {
        setValue?.("is_multi_place", e.value);
        setChecked2(e.value);
        setError?.(null);
    };

    const watchKey2 = watch?.("is_multi_place");
    useEffect(() => {
        if (watchKey2) {
            handleChange2(watchKey2);
        }
    }, []);

    return (
        <div data-aos='fade-up' className={`${cn} mt-[20px]`}>
            <div className={`flex flex-col items-center gap-[15px]`}>
                {data?.map((e, i) => (
                    <div key={i} className='w-full'  >
                        <div onClick={() => handleChange(e)} className={`${checked == e.value ? 'border-[1px] border-primary1 ' : ''} bg-white hover:bg-primary3 duration-200 border-[1px] border-[#E1E6EF] w-full h-[50px] rounded-[8px] px-[10px] flex items-center justify-between cursor-pointer`}>
                            <div className='flex items-start gap-[10px]'>
                                <Image src={`/assets/${e.name}.svg`} alt='' width={25} height={25} />
                                <div className='h4'> {t(e.name)} </div>
                            </div>
                            <div className={`w-[20px] h-[25px] ${checked == e.value ? ' before:scale-[1] after:!border-primary1 after:bg-primary1' : ''} relative cursor-pointer after:w-[20px] after:h-[20px] after:border-[2px] after:border-[#E1E6EF] after:absolute after:duration-300 after:left-0 after:top-[50%] after:translate-y-[-50%] after:rounded-[50%] before:w-[10px] before:h-[10px] before:absolute before:left-[5px] before:bg-white before:scale-0 before:duration-300 before:z-[10] before:top-[50%] before:translate-y-[-50%] before:rounded-[50%]`} > </div>
                        </div>

                        {
                            // showNestedBox == e.value && 
                                <div className={`mt-[20px] ${showNestedBox == e.value ? "max-h-[400px] opacity-100 " : " max-h-0 opacity-0 "} ease-in-out transition-all duration-500  flex items-center gap-[10px]  `}  > 
                                    {dataCountPlace[e.value]?.map((e, i) => (
                                        <div key={i} className='w-full' data-aos="fade-up"  data-aos-delay={`${i}00`}  >
                                            <div onClick={() => handleChange2(e)} className={`${checked2 == e.value ? 'border-[1px] border-primary1 ' : ''} mb-[10px] bg-white hover:bg-primary3 duration-200 border-[1px] border-[#E1E6EF] w-full h-[50px] rounded-[8px] px-[10px] flex items-center justify-between cursor-pointer`}>
                                                <div className='flex items-start gap-[10px]'>
                                                    <Image src={`/assets/${e.name}.svg`} alt='' width={25} height={25} />
                                                    <div className='h4'> {t(e.name)} </div>
                                                </div>
                                                <div className={`w-[20px] h-[25px] ${checked2 == e.value ? ' before:scale-[1] after:!border-primary1 after:bg-primary1' : ''} relative cursor-pointer after:w-[20px] after:h-[20px] after:border-[2px] after:border-[#E1E6EF] after:absolute after:duration-300 after:left-0 after:top-[50%] after:translate-y-[-50%] after:rounded-[50%] before:w-[10px] before:h-[10px] before:absolute before:left-[5px] before:bg-white before:scale-0 before:duration-300 before:z-[10] before:top-[50%] before:translate-y-[-50%] before:rounded-[50%]`} > </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                        }
                    </div>
                ))}
            </div>

            {error?.message && <div className='error'> {error?.message} </div>}
        </div>
    );
};

export default RadioNested;