import Button from '@/components/atoms/button/Button';
import SAR from '@/components/atoms/SAR';
import { SkeletonTable } from '@/components/atoms/Skelton/SkeltonTable';
import { hookBooking } from '@/hooks/hookBooking';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';
import BookingDetails from "@/components/popupComponent/DetailsReservationPopup"
import Popup from "@/components/molecules/Popup"

export default function HallReservation({ }) {
    const t = useTranslations();
    const locale = useLocale();
    const [isOpenPopup , setisOpenPopup] = useState(false)
    const [dataReservation , setdataReservation ] = useState()

    const handleShowDetails = (e)=>{
      setdataReservation(e)
      setisOpenPopup(true)
    }


    const { booking , loading } = hookBooking();
    const statusColors = {
        PENDING: '#F59E0B', // Yellow for pending
        CONFIRMED: '#10B981', // Green for confirmed
        CANCELLED: '#EF4444', // Red for cancelled
    };

    // Render Skeleton Loading if `loading` is true
    if (loading) {
        return <SkeletonTable />;
    }

    return (
        <div className='w-full overflow-auto main-shadow '>
            <div className='w-full  rounded-[20px] max-h-[80vh] overflow-auto '>
                {/* Table */}
                <table className='min-w-[1000px] w-full  '>
                    {/* Table Headers */}
                    <thead>
                        <tr className='border-b-[1px] border-[#D5DBF6]'>
                            <th className=' border-l-[1px] ltr:border-l-transparent rtl:border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4'>{t('orderNumber')}</th>
                            <th className=' border-l-[1px] border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4'>{t('bookingDateFrom')}</th>
                            <th className=' border-l-[1px] border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4'>{t('bookingDateTo')}</th>
                            <th className=' border-l-[1px] border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4'>{t('hallName')}</th>
                            <th className=' border-l-[1px] border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4'>{t('totalPrice')}</th>
                            {/* <th className=' border-l-[1px] border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4'>{t('address')}</th> */}
                            <th className=' border-l-[1px] rtl:border-l-transparent ltr:border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4'>{t('explore')}</th>
                        </tr>
                    </thead>

                    {/* Table Rows */}

                    <tbody>
                        {booking?.length > 0 ? (
                            booking?.map((e, i) => {
                                const checkOutDate = new Date(e?.check_out);
                                const isConfirmed = !isNaN(checkOutDate) && checkOutDate < new Date();

                                const reservationStatus = isConfirmed ? 'CONFIRMED' : e?.status?.toUpperCase();

                                return (
                                    <tr key={i} className={`${booking?.length !== i + 1 && 'border-b-[1px] border-[#D5DBF6]'}`}>
                                        <td className='border-l-[1px] ltr:border-l-transparent rtl:border-l-[#D5DBF6] p-[10px] text-center h4 text-primary1 font-bold'>{e?.id}</td>
                                        <td className='border-l-[1px] border-l-[#D5DBF6] p-[10px] text-center h4 text-primary1 font-bold'>{e?.check_in}</td>
                                        <td className='border-l-[1px] border-l-[#D5DBF6] p-[10px] text-center h4 text-primary1 font-bold'>{e?.check_out}</td>
                                        <td className='border-l-[1px] border-l-[#D5DBF6] p-[10px] text-center h4 text-primary1 font-bold'>
                                            <div className=' text-[14px] mb-[3px] '>{e?.venue?.name?.[locale]}</div>
                                            {/* <Image className='mx-auto w-[100px] h-[80px] object-cover rounded-[20px]' src={e?.venue?.venueGalleries?.[0]?.imgs?.[0]} alt='' width={120} height={120} /> */}
                                        </td>
                                        <td className='border-l-[1px] border-l-[#D5DBF6] p-[10px] text-center h4 text-primary1 font-bold'>
                                            <SAR price={e?.total_price} />
                                        </td>
                                        {/* <td className='border-l-[1px] border-l-[#D5DBF6] p-[10px] text-center h4 text-primary1 font-bold'>{`${e?.venue?.property?.city?.name}, ${e?.venue?.property?.city?.country?.name}`}</td> */}
                                        {/* <td className='border-l-[1px] rtl:border-l-transparent ltr:border-l-[#D5DBF6] p-[10px] text-center'>
                                            <button
                                                disabled={reservationStatus === 'CANCELLED'}
                                                style={{
                                                    background: statusColors[reservationStatus],
                                                    borderColor: statusColors[reservationStatus],
                                                }}
                                                className={`px-[15px] cursor-default mx-[10px] text-white rounded-full border-[1px] h4 hover:bg-opacity-80 h-[50px]`}>
                                                {reservationStatus}
                                            </button>
                                        </td> */}
                                        <td className='border-l-[1px] rtl:border-l-transparent ltr:border-l-[#D5DBF6] p-[10px] text-center'>
                                          <Button name={t("moreInfo")} classname={"!min-h-[35px] mx-auto !w-fit "} onClick={()=> handleShowDetails(e)} />
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={7} className='text-center text-[25px] h-[200px] text-gray-500 p-4'>
                                    {t('noReservation')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            <Popup title={t("reservationDetails")} cn={"!max-w-[800px]"} isOpen={isOpenPopup} onClose={() => setisOpenPopup(false)} content={ <BookingDetails  data={dataReservation} loading={loading} open={!isOpenPopup} onClose={() => setisOpenPopup(false)} /> } />

        </div>
    );
}
