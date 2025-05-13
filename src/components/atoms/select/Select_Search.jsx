'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const Select_Search = ({ cnSelect, showIcons, loading, label, cnLabel, sendId, dataAos, error, trigger, watch, KEY, setValue, icon, data, classname, place }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null);
    const t = useTranslations();
    const locale = useLocale();

    const [val, setVal] = useState();
    const [Icon, setIcon] = useState();
    const [show, setShow] = useState(false);

    const isObject = value => typeof value === 'object' && value !== null && !Array.isArray(value);

    const handleValue = e => {
        setVal({ name: e?.name });
        if (sendId) {
            setValue?.(KEY, e?.id);
        } else {
            setValue?.(KEY, typeof e?.name === 'string' ? e?.name : e?.name?.[locale]);
        }
        setValue?.(KEY + 'GET', e);
        setShow(false);
    };

    const handleValueIcon = e => {
        setIcon(e);
        setValue?.(KEY, e?.id);
        setShow(false);
        setVal({ name: t('YouChooseOne') });
    };

    const handleSearchSubmit = () => {
        const firstMatch = filteredData?.[0];
        if (firstMatch) handleValue(firstMatch);
    };

    const watchKey = watch?.(KEY);

    useEffect(() => {
        if (watchKey) {
            trigger?.(KEY);
            const getOneData = data?.find(e => e.id == watchKey);
            if (getOneData) handleValue(getOneData);
        } else {
            setVal({ name: place });
        }
    }, [watchKey, data]);

    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = event => {
            if (selectRef.current && !selectRef.current.contains(event.target)) setShow(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (show) {
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [show]);

    const filteredData = data?.filter(e => {
        const name = typeof e?.name === 'object' ? e?.name?.[locale] : e?.name;
        return name?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div ref={selectRef} data-aos={dataAos} className={`${classname} duration-500 relative select flex flex-col gap-[5px] w-full`}>
            {label && (
                <label htmlFor={KEY} className={`h5 ${cnLabel}`}>
                    {label}
                </label>
            )}

            <div onClick={() => setShow(!show)} className={`${cnSelect} border-b-[#BCBBBF] border-b-[1px] duration-300 cursor-pointer w-full h-[50px] flex justify-between items-center`}>
                {showIcons ? (
                    Icon ? (
                        <img src={Icon?.url} alt='' className='bg-[#f9fbfc] rounded-[6px] w-full p-[10px] shadow cursor-pointer hover:shadow-lg duration-300 max-w-full ltr:mr-[30px] rtl:ml-[30px] h-[35px] object-contain' />
                    ) : (
                        place
                    )
                ) : (
                    <div className='flex items-center gap-[9px] P-12'>
                        {icon && <Image src={icon} alt='' width={20} height={20} />}
                        <div className={`h5 ${val?.name ? 'text-secondry2' : 'text-secondry3'}`}>{isObject(val?.name) ? val?.name?.[locale] : val?.name || place}</div>
                    </div>
                )}
                <Image src={`/assets/down.svg`} className={`${show ? 'rotate-[180deg]' : ''} w-[12px] h-[12px] duration-300`} alt='' width={25} height={25} />
            </div>

            <div className={`${show ? '!opacity-100 !max-h-[250px]' : ''} z-[1000000] opacity-50 max-h-0 overflow-auto bg-white duration-300 shadow-md transition-all ease-in-out absolute top-[110%] w-full shadow-box`}>
                {!showIcons && (
                    <div className='p-[10px] border-b border-gray-300 bg-white sticky top-0 z-10'>
                        <input ref={inputRef} type='text' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearchSubmit()} placeholder={t('search') || 'Search...'} className='w-full h-[35px] px-3 text-sm border border-gray-300 rounded-md outline-none' />
                    </div>
                )}

                {showIcons ? (
                    <div className='grid grid-cols-[repeat(auto-fill,40px)] gap-[8px] p-[10px] justify-center'>
                        {loading
                            ? Array(14)
                                  .fill(0)
                                  .map((_, i) => <div key={i} className='bg-gray-300 animate-pulse w-full h-[40px] rounded-[6px]'></div>)
                            : data?.map((e, i) => <img key={i} src={e?.url} alt={e.id} onClick={() => handleValueIcon(e)} className={`${Icon?.id == e.id && '!bg-primary1 !bg-opacity-35'} bg-[#f9fbfc] rounded-[6px] w-full p-[10px] shadow cursor-pointer hover:shadow-lg hover:scale-[.92] duration-300 max-w-[40px] h-[40px] object-contain`} />)}
                    </div>
                ) : (
                    filteredData?.map((e, i) => (
                        <div className='hover:bg-gray1 hover:text-primary1 P-12 duration-100 min-h-[35px] cursor-pointer flex items-center px-[10px]' key={i} onClick={() => handleValue(e)}>
                            {e.icon && <Image src={e.icon} alt='' width={18} height={18} className='mr-2' />}
                            <span className='capitalize h5 hover:text-primary1 duration-0'>{isObject(e?.name) ? e?.name?.[locale] : e?.name}</span>
                        </div>
                    ))
                )}
            </div>

            {error && <div className='error absolute z-[0]'> {t(error?.message)} </div>}
        </div>
    );
};

export default Select_Search;
