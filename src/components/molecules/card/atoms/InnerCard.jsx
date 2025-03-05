import Button from '@/components/atoms/button/Button';
import Address_vesitor from '@/components/atoms/card/Address_vesitor';
import Rate_price from '@/components/atoms/card/Rate_price';
import { ChevronDown, Plus } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';

export default function InnerCard({ e, i, data , btnName }) {
    const t = useTranslations();
    const locale = useLocale();
    const [showServ, setshowServ] = useState(false);
    const [showEquip, setshowEquip] = useState(false);

    return (
        <div data-aos='zoom-in' data-aos-delay={`${i}00`} className='  h-full pb-[80px] max-sm:pb-[50px] relative rounded-[30px] overflow-hidden w-full shadow-custom border-gray1 border-[1px]'>
            <img className='w-full bg-primary1 max-sm:max-h-[220px] max-h-[250px] object-cover ' src={data?.venueGalleries?.[0]?.imgs[0] || '/assets/test-img/notfound.png'} alt='' />
            <div className='p-[20px]'>
                <Address_vesitor titleAddress={e?.package_name?.[locale]} />
                <Rate_price cn={'!my-[15px]'} priceTitle={t('price2')} priceValue={ e?.package_price } />

                {e?.services?.length > 0 && (
                    <ul className='list flex flex-col gap-[10px] mt-[15px] '>
                        <div className='flex items-center justify-between'>
                            <div className='h3 font-[600] text-[##323135]'>{t('services_name')}</div>
                            <div onClick={() => setshowServ(!showServ)} className={` ${showServ ? 'rotate-[45deg] ' : ' rotate-0 '} duration-300  w-[25px] h-[25px] border-[1px] border-gray-700 rounded-full flex items-center justify-center cursor-pointer `}>
                                {' '}
                                <Plus className={` text-gray-700 `} size={18} />{' '}
                            </div>
                        </div>
                        <div className={` ${showServ ? 'max-h-[95px] opacity-100 ' : 'max-h-0 opacity-0'} transition-all duration-500 ease-in-out overflow-auto flex flex-col gap-[8px]`}>
                            {e?.services.map((ele, index) => (
                                <li className='flex justify-between items-center gap-[8px]' key={index}>
                                    <div className='flex items-center gap-[8px] '>
                                        <img className='w-[25px] h-[25px]' src={ele?.service?.iconMedia?.url} alt={ele?.service?.name?.ar} width={25} height={25} />
                                        <div className='h4 text-secondry3'>{ele?.service?.name?.[locale]}</div>
                                    </div>
                                    <div className='h3 px-[10px] text-primary1 flex items-center gap-[5px] '>
                                        <span className='flex items-center gap-[2px] text-[#175932]  font-[600] '>
                                            {' '}
                                            <Image src={'/assets/imgs/currency.png'} alt='' width={25} height={25} /> {ele?.price}{' '}
                                        </span>
                                        <span className='px-[5px] font-[900] '> * </span>
                                        <span className='min-w-[10px] text-center block font-[800] '> {ele?.count == 0 ? 1 : ele?.count} </span>
                                    </div>
                                </li>
                            ))}
                        </div>
                    </ul>
                )}

                {e?.equipments?.length > 0 && (
                    <ul className='list flex flex-col gap-[10px] mt-[15px] '>
                        <div className='flex items-center justify-between'>
                            <div className='h3 font-[600] text-[##323135]'>{t('equipment')}</div>
                            <div onClick={() => setshowEquip(!showEquip)} className={` ${showEquip ? 'rotate-[45deg] ' : ' rotate-0 '} duration-300  w-[25px] h-[25px] border-[1px] border-gray-700 rounded-full flex items-center justify-center cursor-pointer `}>
                                {' '}
                                <Plus className={` text-gray-700 `} size={18} />{' '}
                            </div>
                        </div>
                        <div className={` ${showEquip ? 'max-h-[95px] opacity-100 ' : 'max-h-0 opacity-0'} transition-all duration-500 ease-in-out overflow-auto flex flex-col gap-[8px]`}>
                            {e?.equipments.map((ele, index) => (
                                <li className='flex justify-between items-center gap-[8px]' key={index}>
                                    <div className='flex items-center gap-[8px] '>
                                        <img className='w-[25px] h-[25px]' src={ele?.equipment?.iconMedia?.url} alt={ele?.equipment?.name?.ar} width={25} height={25} />
                                        <div className='h4 text-secondry3'>{ele?.equipment?.name?.[locale]}</div>
                                    </div>
                                    <div className='h3 px-[10px] text-primary1 flex items-center gap-[5px] '>
                                        <span className='flex items-center gap-[2px] text-[#175932]  font-[600] '>
                                            {' '}
                                            <Image src={'/assets/imgs/currency.png'} alt='' width={25} height={25} /> {ele?.price}{' '}
                                        </span>
                                        <span className='px-[5px] font-[900] '> * </span>
                                        <span className='min-w-[10px] text-center block font-[800] '> {ele?.count == 0 ? 1 : ele?.count} </span>
                                    </div>
                                </li>
                            ))}
                        </div>
                    </ul>
                )}

                <Button href={`/reservation/${data?.id}?package=${e?.id}`} outline={true} classname='absolute bottom-[15px] left-[50%] translate-x-[-50%] w-[95%]' name={btnName || t('book_now')} />
            </div>
        </div>
    );
}
