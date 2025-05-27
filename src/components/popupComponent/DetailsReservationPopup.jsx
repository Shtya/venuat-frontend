import React, { useEffect, useState } from 'react';
import SAR from '../atoms/SAR';
import { useLocale, useTranslations } from 'next-intl';
import { ImgMunis, ImgPlus } from '@/constants/imgs';
import Image from 'next/image';
import { Percent } from 'lucide-react';
import { formatHour } from '../page/profile/HallReservation';

const BookingDetails = ({ data, loading, open }) => {
    const t = useTranslations();
    const locale = useLocale();
    const style = {
        head: 'grid grid-cols-3  gap-[10px] my-[10px]',
        body: 'grid grid-cols-3 justify-center gap-[10px] my-[10px]',
    };


    console.log(data)

    return (
        <div className=' !mb-[-20px] '>
            {/* Basic Information */}
            <div className=''>
                <div className='!mb-[30px]'>
                    <h4 className='font-normal text-primary1 text-center uppercase text-lg mb-2'> {t('reservation_days')} </h4>
                    <table className='table-auto border border-primary3 w-full text-sm'>
                        <thead className='bg-primary3 text-[#333] '>
                            <tr>
                                <th className='border border-gray-200 px-2 py-1'> {t('Date')} </th>
                                <th className='border border-gray-200 px-2 py-1'> {t('from')} </th>
                                <th className='border border-gray-200 px-2 py-1'> {t('to')} </th>
                                <th className='border border-gray-200 px-2 py-1'> {t('Price')} </th>
                                <th className='border border-gray-200 px-2 py-1'> {t('day')} </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(data?.periods || {}).map(([date, periodId], i) => {
                                // Find the matching period detail by the periodId
                                const e = data?.period_details?.find(p => p.id === periodId);

                                return (
                                    <tr key={i}>
                                        <td className='border border-primary3 text-center px-2 py-1'>{date}</td>
                                        <td className='border border-primary3 text-center px-2 py-1'>{formatHour(e?.from)}</td>
                                        <td className='border border-primary3 text-center px-2 py-1'>{formatHour(e?.to)}</td>
                                        <td className='border border-primary3 text-center px-2 py-1'>
                                            <SAR cnAll='justify-center scale-[.9]' price={data?.reservation_details?.package  ? e?.package_price : e?.price} />
                                        </td>
                                        <td className='border border-primary3 text-center px-2 py-1 capitalize'>{e?.day}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {data?.reservation_details?.servicesPrice && <Shap2 title1={t('details-reservation4')} title2={<SAR cn={'text-base !font-[600] '} price={data?.reservation_details?.servicesPrice} />} />}
                {data?.reservation_details?.equipmentsPrice && <Shap2 title1={t('details-reservation5')} title2={<SAR cn={'text-base !font-[600] '} price={data?.reservation_details?.equipmentsPrice} />} />}
                <Shap2 title1={t('Price')} title2={<SAR cn={'text-base !font-[600]'} price={data?.reservation_details?.subtotal} />} />
                <Shap2 title1={t('vat')} title2={<SAR cn={'text-base !font-[600]'} price={data?.reservation_details?.taxValue} />} />
                <Shap2 title1={t('price_with_vat')} notBorder={false} title2={<SAR cn={'text-base !font-[600]'} price={data?.reservation_details?.totalWithTax} />} />
            </div>

            {/* Venue Details */}
            <div className='mb-6'>
                <h3 className='text-xl text-center   font-[600] text-primary1 mt-[50px] mb-[10px]'>{t('details-reservation9')}</h3>
                <Shap2 title1={t('details-reservation10')} title2={data?.venue?.name?.[locale]} />
                <Shap2 title1={t('details-reservation11')} title2={data?.venue?.contact_person} />
                <Shap2 title1={t('details-reservation12')} title2={data?.venue?.email} />
                <Shap2 title1={t('details-reservation13')} notBorder={false} title2={data?.venue?.phone} />
            </div>

            {/* Venue Services */}
            {data?.reservation_details?.services?.length > 0 && (
                <div className='mb-6'>
                    <h3 className='text-xl text-center   font-[600] text-primary1 mt-[50px] mb-[15px]'>{t('details-reservation14')}</h3>
                    {data?.reservation_details?.services.map((e, i) => (
                        <Amount notBorder={data?.reservation_details?.services?.length -1 == i ? false : true} key={i} style={style.body} disabled={true} name={e?.service?.name?.[locale]} price={e.price} count={e.count} />
                    ))}
                </div>
            )}

            {/* Venue Equipments */}
            {data?.reservation_details?.equipments?.length > 0 && (
                <div className=''>
                    <h3 className='text-xl text-center   font-[600] text-primary1 mt-[50px] mb-[15px]'>{t('details-reservation15')}</h3>
                    {data?.reservation_details?.equipments.map((e, i) => (
                        <Amount notBorder={data?.reservation_details?.equipments?.length -1 == i ? false : true} key={i} style={style.body} disabled={true} name={e?.equipment?.name?.[locale]} price={e.price} count={e.count} />
                    ))}
                </div>
            )}
        </div>
    );
};

function Shap2({ title1, title2, notBorder = true }) {
    return (
        <div className={`flex items-center justify-between py-[10px] ${notBorder ? 'border-b border-gray-200' : ''}`}>
            <span className='text-base font-[500] text-[#222]   '>{title1}</span>
            <span className='!text-base font-normal text-gray-800 '>{title2}</span>
        </div>
    );
}

function Amount({ disabled, style, name, price, count ,  notBorder = true }) {
    return (
        <div className={`${style} ${notBorder ? 'border-b border-gray-200' : ''} py-[10px]`}>
            <div className='text-base font-[500] text-[#222] capitalize '>{name}</div>

            <div className='flex items-center justify-center gap-4'>
                <button disabled={disabled} className='disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300 disabled:opacity-50 flex-none w-[25px] h-[25px] cursor-pointer hover:bg-primary3 duration-300 border border-gray-300 rounded-full flex items-center justify-center'>
                    <Image className='w-4' src={ImgPlus} alt='' width={20} height={20} />
                </button>
                <span className='text-base text-center min-w-[10px]'>{count}</span>
                <button disabled={count == 0 ? true : disabled} className='disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300 disabled:opacity-50 flex-none w-[25px] h-[25px] cursor-pointer hover:bg-primary3 duration-300 border border-gray-300 rounded-full flex items-center justify-center'>
                    <Image className='w-4' src={ImgMunis} alt='' width={20} height={20} />
                </button>
            </div>

            <div className='h3 font-[600]  text-primary1 max-w-[70px] text-nowrap w-full ltr:ml-auto rtl:mr-auto rtl:!text-right '>
                <SAR cnAll={'rtl:justify-end '} cn={'text-base font-[600] '} price={count * price} />
            </div>
        </div>
    );
}

export default BookingDetails;
