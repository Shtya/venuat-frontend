'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import Button from '@/components/atoms/button/Button';
import Image from 'next/image';
import { ImgPay, ImgVisa } from '@/constants/imgs';
import Address_vesitor from '@/components/atoms/card/Address_vesitor';
import Rate_price from '@/components/atoms/card/Rate_price';
import Calendar from '@/components/atoms/calendar/Calendar';
import { hookConfirmReservation } from '@/hooks/hookConfirmReservation';
import { Asterisk, CircleChevronDown } from 'lucide-react';
import DetailsVenue from '@/components/page/confirm-reservation/DetailsVenue';
import SAR, { IconSAR } from '@/components/atoms/SAR';
import Rate_priceSkeleton from '@/components/atoms/Skelton/Rate_priceSkeleton';
import Address_vesitorSkeleton from '@/components/atoms/Skelton/Address_vesitorSkeleton';
import CountdownTimer from '@/components/atoms/CountdownTimer';
import SuccesReservationPopup from '@/components/popupComponent/SuccesReservationPopup';
import Popup from '@/components/molecules/Popup';
import RadioDate from '@/components/atoms/radio/RadioDate';
import AxiosInstance from '@/config/Axios';
import { useGlobalContext } from '@/context/GlobalContext';
import { formatHour } from '@/components/page/profile/HallReservation';

const Page = ({ params }) => {
    const t = useTranslations();
    const locale = useLocale();
    const {PackageId , selectedPeriods, setSelectedPeriods, changeListen , isOpenPopup, setisOpenPopup, loadingReservation, loadingPricing, Package, venue, loading, errors, trigger, setValue, submit, watch } = hookConfirmReservation({ id: params.id });
    const [minmize, setminimize] = useState(true);
    const [disabled, setDisabled] = useState(true);

    const BreadcrumbsData = [
        { name: 'availableHalls', value: '/available-halls' },
        { name: 'hallDetails', value: `/details-halls/${params.id}` },
        { name: 'confirmationDetails', value: '' },
    ];

    const checkIn = watch('check_in');
    const checkOut = watch('check_out');

    const [periods, setPeriods] = useState({});
    const {subtotal , taxValue , totalWithTax , servicesPrice , equipmentsPrice , Days    , setPriceVenue  , setDays} = useGlobalContext()

    useEffect(() => {
        Object.entries(selectedPeriods).forEach(async ([day, value]) => {
            setValue(`periods.${day?.split(':')[1].trim()}`, value);
        });
    }, [selectedPeriods , checkIn , checkOut , changeListen ]);

    const { totalPrice, totalDays } = Object.entries(selectedPeriods).reduce(
        (acc, [day, id]) => {
            const selectedItem = periods[day]?.find(p => p.id === id);
            if (selectedItem?.price) {
                if(PackageId) acc.totalPrice += selectedItem.package_price || 0;
                    else acc.totalPrice += selectedItem.price;
                acc.totalDays += 1;
            }
            return acc;
        },
        { totalPrice: 0, totalDays: 0 },
    );

    useEffect(() => {
        const fetchPeriods = async () => {
            if (!checkIn || !checkOut) return;
            let url ;
            PackageId 
                ? url = `/venues/${params?.id}/periods/range?from=${checkIn}&to=${checkOut}&packageId=${PackageId}`
                : url = `/venues/${params?.id}/periods/range?from=${checkIn}&to=${checkOut}` ;
            
                AxiosInstance.get(url)
                .then(response => {
                    setPeriods(response?.data);
                })
                .catch(error => {
                    setPeriods({});
                });
        };

        fetchPeriods();
    }, [checkIn, checkOut , changeListen ]);



    
    useEffect(() => {
        setDays(totalDays)
        setPriceVenue(totalPrice)
    }, [loading, totalPrice, loadingPricing]);


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
                    <div className='max-lg:grid-cols-1 grid grid-cols-2 items-start relative my-[20px] mb-[80px]'>
                        <div className='sm:p-[20px] max-lg:max-w-[600px] w-full max-lg:mx-auto'>
                            <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-[20px] mb-[20px] '>
                                <Calendar KEY='check_in' label={t('CheckInDate')} error={errors?.check_in} setValue={setValue} watch={watch} trigger={trigger} place={t('from')} classname={'w-full '} cnInput='px-[20px]  !border-secondry3 !border-[1px] !h-[45px] rounded-[4px]' />
                                <Calendar KEY='check_out' label={t('CheckOutDate')} error={errors?.check_out} setValue={setValue} watch={watch} trigger={trigger} place={t('to')} classname={'w-full'} cnInput=' px-[20px]  !border-secondry3 !border-[1px] !h-[45px] rounded-[4px]' />
                            </div>

                            <div className='space-y-6 mt-2 mb-6'>
                                {Object.keys(periods).map((e, i) => (
                                    <div key={i} id={`day_${e?.split(':')[1].trim()}`} className='space-y-2 relative '>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-[5px]  font-medium text-primary1'>
                                                <span className='text-sm font-semibold  '>{e?.split(':')[0]}</span>
                                                <span className='text-xs text-black mt-[3px] bg-neutral-200  px-[5px] py-[2px] rounded-[3px] '>{e?.split(':')[1]}</span> {/* 10/4 */}
                                            </div>

                                            {periods?.[e]?.length < 1 && <span className='inline-block px-4 py-2 text-sm font-normal text-gray-800 bg-gray-200 rounded-full border border-gray-300'> {t("not-availabel")} </span>}
                                        </div>

                                        {periods?.[e]?.length >= 1 && (
                                            <RadioDate
                                                changeListen={changeListen}
                                                checkIn={checkIn}
                                                checkOut={checkOut}
                                                name={`day_${e}`}
                                                setDisabled={setDisabled}
                                                options={periods[e]?.map(item => ({
                                                    label: <div className='text-nowrap flex items-center gap-[5px] flex-wrap text-sm ' > {formatHour(item.from)} - {formatHour(item.to)} </div>,
                                                    price: PackageId ? item?.package_price  : item.price  ,
                                                    value: item.id,
                                                    booked_dates: item.booked_dates,
                                                    date: e?.split(':')[1].trim(),
                                                }))}
                                                selected={selectedPeriods[e] || ''}
                                                onChange={val => setSelectedPeriods(prev => ({ ...prev, [e]: val }))}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <Address_vesitor titleAddress={venue?.name?.[locale]} titleVistor={t('visitors_count')} e={venue} />
                            <Rate_price rateTitle={t('rating')} ratings={venue?.ratings} />
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

                <DetailsVenue setValue={setValue} Package={Package} venue={venue} loading={loading} cn={` ${minmize ? 'max-h-[3500px] opacity-100 ' : 'max-h-0 opacity-0 '} ease-in-out transition-all   duration-500 `} />

                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'>
                    <span>{t('hallPricePerDays', { days: Days })}</span>
                    {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse  '></div> : <SAR cn={'font-[700] text-[18px]  text-primary1'} price={totalPrice.toFixed(2)} />}
                </div>

                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'>
                    <span>{t('additionalServices')}</span>
                    {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <TotalDaysPrice totalDays={Days} price={servicesPrice } />}
                </div>

                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'>
                    <span>{t('additionalEquipment')}</span>
                    {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <TotalDaysPrice totalDays={Days} price={equipmentsPrice} />}
                </div>

                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'> 
                  <span> {t('vatValue')} </span>          
                  {loadingPricing 
                      ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> 
                      :  <SAR cn={'font-[700] text-[18px]  text-primary1'} price={taxValue} />
                  } 
                  </div>

                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'>
                    <span>{t('totalPrice')}</span>
                    {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <SAR cn={'font-[700] text-[18px]  text-primary1'} price={subtotal} />}
                </div>

                <div className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap'>
                    <span>{t('totalWithVat')}</span>
                    {loadingPricing ? <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div> : <SAR cn={'font-[700] text-[18px]  text-primary1'} price={totalWithTax} />}
                </div>

                <Button checkAuth={true} isLoading={loadingReservation} disabled={disabled}  onClick={submit} name={t('payNow')} classname='max-w-[400px] w-full mx-auto mt-[60px] ' />

                <div className='h3 text-center mt-[50px] mb-[10px] '> {t('poweredBy')} </div>
                <div className='flex gap-[20px] justify-center items-center '>
                    <Image className=' max-sm:w-[50px] max-sm:h-[50px] w-[100px] h-[60px] object-contain ' src={ImgPay} alt='' width={100} height={50} />
                    <Image className=' max-sm:w-[50px] max-sm:h-[50px] w-[100px] h-[60px] object-contain ' src={ImgVisa} alt='' width={100} height={50} />
                </div>
            </div>

            <Popup title={t('reservationSuccess1')} cn={'!max-w-[800px]'} isOpen={isOpenPopup} onClose={() => setisOpenPopup(false)} content={<SuccesReservationPopup onClose={() => setisOpenPopup(false)} />} />
        </main>
    );
};

export default Page;

const TotalDaysPrice = ({ totalDays, price }) => {
    const locale = useLocale();
    const t = useTranslations();

    const getDaysLabel = count => {
    if (locale === 'ar') {
        if (count === 0) return 'لا أيام';
        if (count === 1) return 'يوم';
        if (count === 2) return 'يومان';
        if (count <= 10) return 'أيام';
        return 'يومًا';
    } else {
        return count === 0 ? 'no days' : count > 1 ? 'days' : 'day';
    }
};


    return (
        <span className='flex items-center gap-1 capitalize'>
            {
                totalDays != 0 && <>
                    <span className='text-sm font-semibold'>{totalDays}</span>
                    <span className='text-sm  '>{getDaysLabel(totalDays)}</span>
                    <Image src={'/assets/multiplication.png'} alt='' width={25} height={25} />
                </> 
            }
            <SAR price={price} cn='font-[700] text-[18px] text-primary1' />
        </span>
    );
};
