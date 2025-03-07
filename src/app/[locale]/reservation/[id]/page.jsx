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
import { ChevronDown, CircleChevronDown, CircleChevronUp } from 'lucide-react';
import DetailsVenue from '@/components/page/confirm-reservation/DetailsVenue';
import CardPackageCheckout from '@/components/molecules/card/CardPackageCheckout';
import Arrow from '@/components/molecules/swiper/Arrow';
import SAR from '@/components/atoms/SAR';
import Rate_priceSkeleton from '@/components/atoms/Skelton/Rate_priceSkeleton';
import Address_vesitorSkeleton from '@/components/atoms/Skelton/Address_vesitorSkeleton';

const Page = ({ params }) => {
    const t = useTranslations();
    const locale = useLocale();
    const { loadingReservation, loadingPricing, packageId, setPackageId, Package, register, venue, loading, errors, trigger, setValue, submit, watch } = hookConfirmReservation({ id: params.id });
    const [minmize, setminimize] = useState(true);

    const BreadcrumbsData = [
        { name: 'confirmationDetails', value: '' },
        { name: 'hallDetails', value: `/details-halls/${params.id}` },
        { name: 'availableHalls', value: '/available-halls' },
    ];

    return (
        <main className='min-h-[100vh]  container'>
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
                            <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-[20px]'>
                                <Calendar KEY='check_in' label={t('startReservation')} error={errors?.check_in} setValue={setValue} watch={watch} trigger={trigger} place={t('from')} classname={'w-full'} cnInput='!border-secondry3 !border-[1px] !h-[45px] rounded-[4px]' />
                                <Calendar KEY='check_out' label={t('endReservation')} error={errors?.check_out} setValue={setValue} watch={watch} trigger={trigger} place={t('to')} classname={'w-full'} cnInput='!border-secondry3 !border-[1px] !h-[45px] rounded-[4px]' />
                            </div>
                            <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-[20px] mt-[30px] mb-[40px]'>
                                <TimePicker KEY={'from_time'} error={errors?.from_time} watch={watch} trigger={trigger} setValue={setValue} label={t('startReservation')} place={t('enterTime')} />
                                <TimePicker KEY={'to_time'} error={errors?.to_time} watch={watch} trigger={trigger} setValue={setValue} label={t('endReservation')} place={t('enterTime')} />
                            </div>

                            <Address_vesitor titleAddress={venue?.name?.[locale]} location={`${venue?.property?.city.name} , ${venue?.property?.city?.country.name}`} titleVistor={t('visitors_count')} countOfVistor={t('visitor_number', { count: venue?.visitCount || 0 })} />
                            <Rate_price rateTitle={t('rating')} ratings={venue?.ratings} priceTitle={t('price2')} priceValue={venue?.price} />
                        </div>

                        <img data-aos='zoom-out' className='max-lg:order-[-1] max-lg:mx-auto max-lg:mb-[20px] rounded-[30px] w-full max-w-[500px] rtl:mr-auto ltr:ml-auto bg-neutral-100 max-sm:max-h-[220px] max-h-[350px] object-contain' src={venue?.venueGalleries?.[0]?.imgs[0]} alt='' width={250} height={250} />
                    </div>
                </>
            )}

            <div className={` ${Package?.length > 0 && '!flex'} hidden items-center justify-between  mt-[100px] mb-[40px]`}>
                <div data-aos='fade-up' className='h1 font-[700] my-[30px] '>
                    {' '}
                    {t('choose_location_package')}{' '}
                </div>
                <Arrow />
            </div>
            <CardPackageCheckout packageId={packageId} setPackageId={setPackageId} data={venue} Package={Package} loading={loading} />

            <div className='max-w-[950px] mt-[80px] mx-auto '>
                <div className='flex items-center justify-between mb-[40px] '>
                    <div className='h1 text-center '> {t('confirmationDetails')} </div>
                    <CircleChevronDown onClick={() => setminimize(!minmize)} className={` text-secondry3 cursor-pointer duration-500 ${!minmize && 'rotate-[-180deg]  '} `} size={35} />
                </div>

                <DetailsVenue venue={venue} loading={loading} cn={` ${minmize ? 'max-h-[2500px] opacity-100 ' : 'max-h-0 opacity-0 '} ease-in-out transition-all   duration-500 `} />
                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'>
                    <span>{t('hallPrice')}</span>
                    {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse  '></div> : <SAR cn={'font-[700] text-primary1'} price={venue?.price.toFixed(2)} />}
                </div>

                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'>
                    <span>{t('additionalServices')}</span>
                    {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <SAR cn={'font-[700] text-primary1'} price={venue?.additionalServicesPrice} />}
                </div>

                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'>
                    <span>{t('additionalEquipment')}</span>
                    {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <SAR cn={'font-[700] text-primary1'} price={venue?.additionalEquipmentsPrice} />}
                </div>

                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'>
                    <span>{t('packagePrice')}</span>
                    {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <SAR cn={'font-[700] text-primary1'} price={venue?.packagePrice} />}
                </div>

                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'>
                    <span>
                        {' '}
                        {t('vatValue')} {'15%'}{' '}
                    </span>
                    {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <SAR cn={'font-[700] text-primary1'} price={venue?.vatAmount} />}
                </div>

                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'>
                    <span>{t('totalPrice')}</span>
                    {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <SAR cn={'font-[700] text-primary1'} price={venue?.totalPrice} />}
                </div>
                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'>
                    <span>{t('totalWithVat')}</span>
                    {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <SAR cn={'font-[700] text-primary1'} price={venue?.totalPriceWithVAT} />}
                </div>

                <Button isLoading={loadingReservation} onClick={submit} dataAos='fade-up' name={t('payNow')} classname='max-w-[400px] w-full mx-auto mt-[60px] ' />
                <div className='h3 text-center mt-[50px] mb-[10px] '> {t('poweredBy')} </div>
                <div className='flex gap-[20px] justify-center items-center '>
                    <Image className=' max-sm:w-[50px] max-sm:h-[50px] w-[100px] h-[60px] object-contain ' src={ImgPay} alt='' width={100} height={50} />
                    <Image className=' max-sm:w-[50px] max-sm:h-[50px] w-[100px] h-[60px] object-contain ' src={ImgVisa} alt='' width={100} height={50} />
                </div>
            </div>
        </main>
    );
};

export default Page;
