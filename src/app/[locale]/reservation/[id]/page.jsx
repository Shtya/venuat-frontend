'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import Button from '@/components/atoms/button/Button';
import Image from 'next/image';
import { ImgPay, ImgVisa } from '@/constants/imgs';
import Address_vesitor from '@/components/atoms/card/Address_vesitor';
import Rate_price from '@/components/atoms/card/Rate_price';
import Calendar from '@/components/atoms/calendar/Calendar';
import { hookConfirmReservation } from '@/hooks/hookConfirmReservation';
import TimePicker from '@/components/atoms/time-clock/Time';
import { CircleChevronDown, Percent } from 'lucide-react';
import DetailsVenue from '@/components/page/confirm-reservation/DetailsVenue';
import SAR from '@/components/atoms/SAR';
import Rate_priceSkeleton from '@/components/atoms/Skelton/Rate_priceSkeleton';
import Address_vesitorSkeleton from '@/components/atoms/Skelton/Address_vesitorSkeleton';
import CountdownTimer from "@/components/atoms/CountdownTimer"
import SuccesReservationPopup from '@/components/popupComponent/SuccesReservationPopup';
import Popup from '@/components/molecules/Popup';


const Page = ({ params }) => {
    const t = useTranslations();
    const locale = useLocale();
    const { isOpenPopup , setisOpenPopup , loadingReservation, loadingPricing, Package , venue, loading, errors, trigger, setValue, submit, watch } = hookConfirmReservation({ id: params.id });
    const [minmize, setminimize] = useState(true);

    const BreadcrumbsData = [
        { name: 'availableHalls', value: '/available-halls' },
        { name: 'hallDetails', value: `/details-halls/${params.id}` },
        { name: 'confirmationDetails', value: '' },
    ];

    return (
        <main className='min-h-[100vh] !max-w-[1300px] container'>
            <Breadcrumbs data={BreadcrumbsData} />

            {loading ? (
                <>
                    <div className='max-lg:grid-cols-1 grid grid-cols-2 items-center relative my-[20px] mb-[80px] animate-pulse'>
                        <div className='p-[20px] max-lg:max-w-[500px] w-full max-lg:mx-auto'>
                            <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-[20px]'>
                                <div className='h-[55px] bg-gray-300 rounded-[4px]'></div>
                                <div className='h-[55px] bg-gray-300 rounded-[4px]'></div>
                            </div>

                            <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-[20px] mt-[20px] mb-[40px]'>
                                <div className='h-[55px] bg-gray-300 rounded-[4px]'></div>
                                <div className='h-[55px] bg-gray-300 rounded-[4px]'></div>
                            </div>

                            <Address_vesitorSkeleton />

                            <Rate_priceSkeleton />
                        </div>

                        <div className='h-full max-lg:order-[-1] max-lg:mx-auto max-lg:mb-[20px] rounded-[30px] w-full max-w-[500px] rtl:mr-auto ltr:ml-auto bg-gray-300 max-sm:max-h-[220px] max-h-[350px]'></div>
                    </div>
                </>
            ) : (
                <>

                    <div className='max-lg:grid-cols-1 grid grid-cols-2 items-center relative my-[20px] mb-[80px]'>
                        <div className='p-[20px] max-lg:max-w-[500px] w-full max-lg:mx-auto'>
                            <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-[20px] mb-[40px] '>
                                <Calendar KEY='check_in' label={t('CheckInDate')} error={errors?.check_in} setValue={setValue} watch={watch} trigger={trigger} place={t('from')} classname={'w-full '} cnInput='px-[20px]  !border-secondry3 !border-[1px] !h-[45px] rounded-[4px]' />
                                <Calendar KEY='check_out' label={t('CheckOutDate')} error={errors?.check_out} setValue={setValue} watch={watch} trigger={trigger} place={t('to')} classname={'w-full'} cnInput=' px-[20px]  !border-secondry3 !border-[1px] !h-[45px] rounded-[4px]' />
                            </div>
                            <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-[20px] mt-[30px] mb-[40px]'>
                                <TimePicker KEY={'from_time'} error={errors?.from_time} watch={watch} trigger={trigger} setValue={setValue} label={t('CheckInTime')} place={t('enterTime')} />
                                <TimePicker KEY={'to_time'} error={errors?.to_time} watch={watch} trigger={trigger} setValue={setValue} label={t('CheckOutTime')} place={t('enterTime')} />
                            </div>

                            <Address_vesitor titleAddress={venue?.name?.[locale]}  titleVistor={t('visitors_count')} e={venue} />
                            <Rate_price rateTitle={t('rating')} ratings={venue?.ratings} priceTitle={t('price2')} priceValue={venue?.price} />
                        </div>

                        <img data-aos='zoom-out' className='max-lg:order-[-1] max-lg:mx-auto max-lg:mb-[20px] rounded-[30px] w-full max-w-[500px] rtl:mr-auto ltr:ml-auto bg-neutral-100 max-sm:max-h-[220px] max-h-[350px] object-contain' src={venue?.venueGalleries?.[0]?.imgs[0]} alt='' width={250} height={250} />
                    </div>
                </>
            )}

            {!loading && Package && <CountdownTimer Package={Package} />}
            <div className='max-w-full mt-[80px] mx-auto '>
                <div className=' arrow-show-details flex items-center justify-between mb-[40px] '>
                    <div className='h1 text-center '> {t('confirmationDetails')} </div>
                    <CircleChevronDown onClick={() => setminimize(!minmize)} className={` text-secondry3 cursor-pointer duration-500 ${!minmize && 'rotate-[-180deg]  '} `} size={35} />
                </div>

                <DetailsVenue setValue={setValue} Package={Package} venue={venue} loading={loading} cn={` ${minmize ? 'max-h-[2500px] opacity-100 ' : 'max-h-0 opacity-0 '} ease-in-out transition-all   duration-500 `} />
                
                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'> <span>{t('hallPrice')}</span> {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse  '></div> : <SAR cn={'font-[700] text-[18px]  text-primary1'} price={venue?.price.toFixed(2)} />} </div>
                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'> <span>{t('additionalServices')}</span> {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <SAR cn={'font-[700] text-[18px]  text-primary1'} price={venue?.additionalServicesPrice} />} </div>
                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'> <span>{t('additionalEquipment')}</span> {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <SAR cn={'font-[700] text-[18px]  text-primary1'} price={venue?.additionalEquipmentsPrice} />} </div>
                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'> <span> {t('vatValue')} </span> {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <span className='font-[700] text-[18px]  text-primary1 flex items-center gap-[5px] ' >15 <Percent size={20} /> </span> } </div>

                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'> <span>{t('totalPrice')}</span> {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <SAR cn={'font-[700] text-[18px]  text-primary1'} price={venue?.totalPrice} />} </div>
                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'> <span>{t('totalWithVat')}</span> {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <SAR cn={'font-[700] text-[18px]  text-primary1'} price={venue?.totalPriceWithVAT} />} </div>

                <Button isLoading={loadingReservation} onClick={submit} name={t('payNow')} classname='max-w-[400px] w-full mx-auto mt-[60px] ' />
                
                <div className='h3 text-center mt-[50px] mb-[10px] '> {t('poweredBy')} </div>
                <div className='flex gap-[20px] justify-center items-center '>
                    <Image className=' max-sm:w-[50px] max-sm:h-[50px] w-[100px] h-[60px] object-contain ' src={ImgPay} alt='' width={100} height={50} />
                    <Image className=' max-sm:w-[50px] max-sm:h-[50px] w-[100px] h-[60px] object-contain ' src={ImgVisa} alt='' width={100} height={50} />
                </div>
            </div>

            <Popup title={t("reservationSuccess1")} cn={"!max-w-[800px]"} isOpen={isOpenPopup} onClose={() => setisOpenPopup(false)} content={ <SuccesReservationPopup   onClose={() => setisOpenPopup(false)} /> } />

            
        </main>
    );
};

export default Page;
