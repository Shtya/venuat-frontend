'use client';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const Select = ({ cnSelect, showIcons, loading, label, cnLabel, sendId, dataAos, error, trigger, watch, KEY, setValue, icon, data, classname, place }) => {
    const t = useTranslations();
    const isObject = value => typeof value === 'object' && value !== null && !Array.isArray(value);

    const [val, setval] = useState();
    const [Icon, setIcon] = useState();
    const [show, setShow] = useState(false);
    const locale = useLocale();

    const handleValue = e => {
        setval({ name: e?.name });

        if (sendId) {
            setValue?.(KEY, e?.id);
        } else setValue?.(KEY, typeof e?.name == 'string' ? e?.name : e?.name?.[locale]);

        setValue?.(KEY + 'GET', e);
        setShow(false);
    };

    const handleValueIcon = e => {
        setIcon(e);
        setValue?.(KEY, e?.id);
        setShow(false);
        setval({name : t("YouChooseOne")})
    };

    const watchKey = watch?.(KEY);
    useEffect(() => {
        if (watchKey) {
            trigger?.(KEY);
            const getOneData = data?.find(e => e.id == watchKey )
            if(getOneData) handleValue(getOneData)
        }
        else {
            setval({name : place })
        }
        
    }, [watchKey , data]);


    const selectRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = event => {
            if (selectRef.current && !selectRef.current.contains(event.target)) setShow(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={selectRef} data-aos={dataAos} className={`${classname}  duration-500 relative select flex  flex-col gap-[5px]  w-full `}>
            {label && (
                <label htmlFor={KEY} className={`h5 ${cnLabel}`}>
                    {label}
                </label>
            )}

            <div onClick={() => setShow(!show)} className={` ${cnSelect}  border-b-[#BCBBBF] border-b-[1px] duration-300 cursor-pointer w-full h-[50px] flex justify-between items-center`}>
                {
                    showIcons 
                    ? Icon ? <img src={Icon?.url} alt={""}  className={` bg-[#f9fbfc] rounded-[6px] w-full p-[10px] shadow-[4px_4px_10px_rgba(0,0,0,0.1),_-4px_-4px_10px_rgba(255,255,255,0.8)] cursor-pointer hover:shadow-lg duration-300 max-w-full ltr:mr-[30px] rtl:ml-[30px] h-[35px] object-contain`} /> : place
                    :  <div className='  w-full flex items-center gap-[9px] P-12  '>
                        {icon && <Image className='' src={icon} alt='' width={20} height={20} />}
                        <div className={` max-w-[200px] truncate h5 ${val?.name ? 'text-secondry2 ' : 'text-secondry3'} `}> {isObject(val?.name) ? val?.name?.[locale] : val?.name || place} </div>
                    </div>
                }
                <Image src={`/assets/down.svg`} className={`${show ? 'rotate-[180deg]' : ''} w-[12px] h-[12px] duration-300 `} alt='' width={25} height={25} />
            </div>

            {showIcons ? (
                <div className={`${show ? '!opacity-100 !max-h-[153px]' : ''} z-[1000000] opacity-50 max-h-0 overflow-auto bg-[#f1f1f1] duration-300 shadow-md transition-all ease-in-out absolute top-[110%] w-full shadow-box`}>
                    <div className='grid grid-cols-[repeat(auto-fill,40px)] gap-[8px] p-[10px] justify-center'>
                        {loading
                            ? Array(14)
                                  .fill(0)
                                  .map((_, i) => <div key={i} className='bg-gray-300 animate-pulse w-full h-[40px] rounded-[6px]'></div>)
                            : data?.map((e, i) => <img key={i} src={e?.url} alt={e.id} onClick={() => handleValueIcon(e)} className={` ${Icon?.id == e.id && ' !bg-primary1 !bg-opacity-35 '} bg-[#f9fbfc] rounded-[6px] w-full p-[10px] shadow-[4px_4px_10px_rgba(0,0,0,0.1),_-4px_-4px_10px_rgba(255,255,255,0.8)] cursor-pointer hover:shadow-lg hover:scale-[.92] duration-300 max-w-[40px] h-[40px] object-contain`} />)}
                    </div>
                </div>
            ) : (
                <div className={`${show ? '!opacity-100 !max-h-[180px] ' : ' '} z-[1000000]  opacity-50 max-h-0  overflow-auto bg-white duration-300 shadow-md  transition-all ease-in-out absolute top-[110%] w-full shadow-box`}>
                    {data &&
                        data.map((e, i) => (
                            <div className=' hover:bg-gray1 hover:text-primary1  P-12 duration-100 min-h-[35px] cursor-pointer flex items-center px-[10px] ' key={i} onClick={_ => handleValue(e)}>
                                <span className='capitalize h5 hover:text-primary1 duration-0 '> {isObject(e?.name) ? e?.name?.[locale] : e?.name} </span>
                            </div>
                        ))}
                </div>
            )}
            {error && <div className='error absolute z-[0] '> {t(error?.message)} </div>}
        </div>
    );
};

export default Select;
