'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import Amount from '@/components/page/confirm-reservation/Amount';
import Divider from '@/components/atoms/Divider';
import Checkbox from '@/components/atoms/checkbox/Checkbox';
import { ensureYourHalls, services } from '@/Dummy/dummy';
import Button from '@/components/atoms/button/Button';
import Image from 'next/image';
import { ImgPay, ImgVisa } from '@/constants/imgs';
import Starts from '@/components/atoms/start/Starts';
import Address_vesitor from '@/components/atoms/card/Address_vesitor';
import Rate_price from '@/components/atoms/card/Rate_price';
import Calendar from '@/components/atoms/calendar/Calendar';
import { hookConfirmReservation } from '@/hooks/hookConfirmReservation';
import Input from '@/components/atoms/input/Input';

const page = () => {
    const t = useTranslations();
    const { register, errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset } = hookConfirmReservation()

    const style = {
        head: 'grid grid-cols-3  gap-[10px] my-[20px]',
        body: 'grid grid-cols-3 justify-center gap-[10px] my-[20px]',
    };


    return (
        <main className='min-h-[100vh]  container'>
            <Breadcrumbs
                data={[
                    { name: 'confirmationDetails', value: '' },
                    { name: 'hallDetails', value: '/details-halls' },
                    { name: 'availableHalls', value: '/available-halls' },
                ]}
            />

            <div className=' max-lg:grid-cols-1 grid grid-cols-2 items-center  relative my-[20px] mb-[80px] '>
                <div className='p-[20px] max-lg:max-w-[500px] w-full  max-lg:mx-auto '>
                    <div className='grid grid-cols-2 gap-[20px] ' >
                        <Calendar  KEY="from" label={t("startReservation")} error={errors?.from} setValue={setValue}  watch={watch} trigger={trigger}  place={t("from")}  classname={"w-full"}  cnInput="!border-secondry3 !border-[1px] !h-[40px] rounded-[4px] " />
                        <Calendar  KEY="to"   label={t("endReservation")}   error={errors?.to}   setValue={setValue}  watch={watch} trigger={trigger}  place={t("to")}  classname={"w-full"}  cnInput="!border-secondry3 !border-[1px] !h-[40px] rounded-[4px] " />
                    </div>
                    <Input    KEY="time"   error={errors?.time} register={register("time")} rounded={false} classname="!border-b-transparent " icon={"/assets/clock.svg"} type={"number"} label={ t("reservationTime") }  place={ t("enterTime") } cnLabel={"mt-[20px]"}  cnInput=" mb-[20px] !rounded-[4px] !border-secondry3 !border-[1px] " />
                    
                    <Address_vesitor 
                        countOfVistor={t(ensureYourHalls?.countNumber.name, { count: ensureYourHalls?.countNumber.value })}
                        titleVistor={t(ensureYourHalls?.countTitle)}
                        titleAddress={t(ensureYourHalls?.head)}
                         location={t(ensureYourHalls?.address)}
                        />

                    <Rate_price 
                        empty={3}
                        fill={2}
                        priceTitle={t(ensureYourHalls?.price)}
                        priceValue={t(ensureYourHalls?.priceValue.name, { count: ensureYourHalls.priceValue.value })}
                        rateTitle={t(ensureYourHalls?.rate.name)}
                        countOfRate={ensureYourHalls?.rate.value}
                    />

                </div>
                <Image data-aos="fade-up" className=' max-lg:order-[-1] max-lg:mx-auto max-lg:mb-[20px] rounded-[30px] w-full max-w-[500px] rtl:mr-auto ltr:ml-auto bg-primary1 max-sm:max-h-[220px] max-h-[250px] object-cover ' src={ensureYourHalls?.img} alt='' width={250} height={250} />
            </div>

            <div  className='max-w-[700px] mx-auto '>
                <div data-aos="fade-up" className='h1 text-center '> {t('confirmationDetails')} </div>

                <div className={style.head}>
                    <span data-aos="fade-up" className=' font-medium text-secondry3 '> {t('additionalServices')} </span>
                    <span data-aos="fade-up" className='text-center font-medium text-secondry3 '> {t('quantity')} </span>
                    <span data-aos="fade-up" className='max-w-[70px] w-full ltr:ml-auto rtl:mr-auto font-medium text-secondry3 '> {t('price2')} </span>
                </div>

                {t.raw('services').map((e, i) => (
                    <Amount  style={style.body} key={i} name={e.name} price={e.price} quantity={e.quantity} />
                ))}

                <Divider />
                <div data-aos="fade-up" className=' mt-[40px] mb-[20px] font-medium text-secondry3 '> {t('additionalServices')} </div>
                <div className='grid max-sm:grid-cols-1 grid-cols-2  gap-x-[100px] gap-y-[20px]  '>
                    {services.map((e, i) => (
                        <div data-aos="fade-up" key={i} className='  flex items-center justify-between gap-[10px]'>
                            <div>
                                <Checkbox cn='!mt-0' KEY={e.name+i} label={t(e.name)} />
                            </div>
                            <div className='h3 text-primary1 '> {t('price', { count: e.price })} </div>
                        </div>
                    ))}
                </div>

                <Divider classname='my-[30px]' />

                <div data-aos="fade-up" className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap  '>
                    <span>{t('hallPrice')}</span> <span> {t('price', { count: 400 })} </span>
                </div>
                <div data-aos="fade-up" className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap  '>
                    <span>{t('additionalFees')}</span> <span> {t('price', { count: 400 })} </span>
                </div>
                <div data-aos="fade-up" className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap  '>
                    <span>{t('vatValue')}</span> <span> {t('price', { count: 400 })} </span>
                </div>
                <div data-aos="fade-up" className='h2 my-[10px] flex items-center justify-between gap-[10px] flex-wrap  '>
                    <span>{t('total')}</span> <span> {t('price', { count: 400 })} </span>
                </div>

                <Button dataAos="fade-up" name={t('payNow')} classname='max-w-[400px] w-full mx-auto mt-[60px] ' />

                <div data-aos="fade-up" className='h3 text-center mt-[50px] mb-[10px] '> {t('poweredBy')} </div>

                <div className='flex gap-[20px] justify-center items-center '>
                    <Image data-aos="fade-up" className=' max-sm:w-[50px] max-sm:h-[50px] w-[100px] h-[60px] object-contain ' src={ImgPay} alt='' width={100} height={50} />
                    <Image data-aos="fade-up" className=' max-sm:w-[50px] max-sm:h-[50px] w-[100px] h-[60px] object-contain ' src={ImgVisa} alt='' width={100} height={50} />
                </div>
            </div>
        </main>
    );
};

export default page;
