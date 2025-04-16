import SAR from '@/components/atoms/SAR';
import { SkeletonTable } from '@/components/atoms/Skelton/SkeltonTable';
import { hookBooking } from '@/hooks/hookBooking';
import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from 'react';
import BookingDetails from "@/components/popupComponent/DetailsReservationPopup"
import Popup from "@/components/molecules/Popup"
import { Info, Send } from 'lucide-react';
import { Link } from '@/navigation';

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

    if (loading) {
        return <SkeletonTable />;
    }

    return (
        <div className='w-full overflow-auto main-shadow '>
            <div className='w-full max-h-[80vh] overflow-auto '>
                {/* Table */}
                <table className='min-w-[1000px] w-full '>
                    <thead >
                        <tr className='border border-b-[#D5DBF6]'>
                            <th className=' border-l-[1px] ltr:border-l-transparent rtl:border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4'>{t('orderNumber')}</th>
                            <th className=' border-l-[1px] border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4'>{t('bookingDateFrom')}</th>
                            <th className=' border-l-[1px] border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4'>{t('bookingDateTo')}</th>
                            <th className=' border-l-[1px] border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4'>{t('hallName')}</th>
                            <th className=' border-l-[1px] border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4'>{t('totalPrice')}</th>
                            <th className=' border-l-[1px] border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4   '>{t('explore')}</th>
                            <th className=' border-l-[1px] rtl:border-l-transparent ltr:border-l-[#D5DBF6] !py-[20px] !px-[10px] text-center h4'>{t('communications')}</th>
                        </tr>
                    </thead>


                    {/* Table Rows */}
                    <tbody>
                        {booking?.length > 0 ? (
                            booking?.map((e, i) => {
                                return (
                                    <tr key={i} className={`${booking?.length !== i + 1 && 'border-b-[1px] border-[#D5DBF6]'}`}>
                                        <td className=' border-l-[1px] ltr:border-l-transparent rtl:border-l-[#D5DBF6] p-[10px] text-center h4 text-primary1 font-bold'>{e?.id}</td>
                                        <td className='border-l-[1px] border-l-[#D5DBF6] p-[10px] text-center h4 text-primary1 font-bold'>{e?.check_in}</td>
                                        <td className='border-l-[1px] border-l-[#D5DBF6] p-[10px] text-center h4 text-primary1 font-bold'>{e?.check_out}</td>
                                        <td className='border-l-[1px] border-l-[#D5DBF6] p-[10px] text-center h4 text-primary1 font-bold'> <div className=' text-[14px] mb-[3px] '>{e?.venue?.name?.[locale]}</div> </td>
                                        <td className='border-l-[1px] border-l-[#D5DBF6] p-[10px] text-center h4 text-primary1 font-bold'> <SAR price={e?.total_price} cnAll={"justify-center"} /> </td>
                                        <td className='border-l-[1px] border-l-[#D5DBF6] p-[10px] text-center h4'>  <div onClick={()=> handleShowDetails(e)}  className=' cursor-pointer hover:scale-[1.1] duration-300 mx-auto h-[40px] w-[55px] rounded-full p-[5px] bg-blue-600 hover:bg-blue-700 flex items-center justify-center ' > <Info size={16} className='text-white ' /> </div></td>
                                        <td  className='border-l-[1px] rtl:border-l-transparent ltr:border-l-[#D5DBF6] p-[10px] mx-auto '> 
                                            <Link href={`/send-msg/${e.id}`} title={t("sendMessageToVenue")} className=' cursor-pointer hover:scale-[1.1] duration-300 mx-auto h-[40px] w-[55px] rounded-full p-[5px] bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center  ' >
                                                <Send className=' text-white ' size={16} /> 
                                            </Link>
                                        </td>

                                    </tr>
                                );
                            })
                        ) : (
                            <tr> <td colSpan={7} className='text-center text-[25px] h-[200px] text-gray-500 p-4'> {t('noReservation')} </td> </tr>
                        )}
                    </tbody>
                </table>
            </div>


            <Popup title={t("reservationDetails")} cn={"!max-w-[800px]"} isOpen={isOpenPopup} onClose={() => setisOpenPopup(false)} content={ <BookingDetails  data={dataReservation} loading={loading} open={!isOpenPopup} onClose={() => setisOpenPopup(false)} /> } />

        </div>
    );
}
