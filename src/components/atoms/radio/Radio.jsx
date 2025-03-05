'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Radio = ({ setError, watch, getValues, onClick, setValue, KEY, cn, error, data }) => {
    const [checked, setChecked] = useState();
    const t = useTranslations();

    const handleChange = e => {
        onClick?.(e);
        setValue?.(KEY, e);
        setChecked(e.value);
        setError?.(null);
    };

    const watchKey = watch?.(KEY);
    useEffect(() => {
        if (watchKey) {
            handleChange(watchKey);
        }
    }, []);

    return (
        <div data-aos='fade-up' className={`${cn} mt-[20px]`}>
            <div className={`flex flex-col items-center gap-[15px] `}>
                {data?.map((e, i) => (
                    <div key={i} onClick={() => handleChange(e)} className={`${checked == e.value ? 'border-[1px] border-primary1 ' : ''} bg-white hover:bg-primary3 duration-200 border-[1px] border-[#E1E6EF] w-full h-[50px] rounded-[8px] px-[10px] flex items-center justify-between cursor-pointer`}>
                        <div className='flex items-start gap-[10px] '>
                            <Image src={`/assets/${e.name}.svg`} alt='' width={25} height={25} />
                            <div className='h4'> {t(e.name)} </div>
                        </div>
                        <div className={` w-[20px] h-[25px] ${checked == e.value ? ' before:scale-[1] after:!border-primary1 after:bg-primary1' : ''} relative cursor-pointer after:w-[20px] after:h-[20px] after:border-[2px] after:border-[#E1E6EF] after:absolute after:duration-300 after:left-0 after:top-[50%] after:translate-y-[-50%] after:rounded-[50%] before:w-[10px] before:h-[10px] before:absolute before:left-[5px] before:bg-white before:scale-0 before:duration-300 before:z-[10] before:top-[50%] before:translate-y-[-50%] before:rounded-[50%]`}> </div>
                    </div>
                ))}
            </div>

            {error?.message && <div className='error'> {error?.message} </div>}
        </div>
    );
};

export default Radio;
