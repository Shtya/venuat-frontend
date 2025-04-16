'use client';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import { useLocale, useTranslations } from 'next-intl';
import { Loader2, LocateIcon, Mail, MapPin, Phone, Send } from 'lucide-react';
import AxiosInstance from '@/config/Axios';
import { hookUser } from '@/hooks/hookUser';
import { onEnter } from '@/helper/onEnter';

const page = ({ params }) => {
    const locale = useLocale();
    const t = useTranslations();
    const { user } = hookUser();

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);  
const chatContainerRef = useRef(null); 

    useEffect(() => {
        AxiosInstance.get(`communications/reservation/${params.id}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {})
            .finally(err => {
                setIsLoading(false);
            });
    }, [loading]);


    //! get down scroll
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [data?.replies, data?.reply]);
    

    const [message, setMessage] = useState('');
    const sendMessage = () => {
        setLoading(true);

        AxiosInstance.post(`communications`, {
            fromId: user?.id,
            reservationId: +params.id,
            msg: message,
            type: 'reservation',
        })
            .then(res => {
                setMessage('');
            })
            .catch(err => {})
            .finally(() => {
                setLoading(false);
            });
    };

    onEnter(sendMessage);
    const BreadcrumbsData = [
        { name: t('my-account'), value: '/my-account' },
        { name: t('booking-conversation'), value: '' },
    ];
    const BreadcrumbsDataAr = [
        { name: t('booking-conversation'), value: '' },
        { name: t('my-account'), value: '/my-account' },
    ];

    return (
        <div className='container select !px-[30px] p-2 '>
            {/* 🧭 Breadcrumb */}
            <Breadcrumbs data={locale == "ar" ? BreadcrumbsDataAr : BreadcrumbsData} noTranslation={true} />

            <div ref={chatContainerRef} className='chat h-[40vh] overflow-auto !px-[10px] space-y-3 mb-6 !max-w-[1200px] mx-auto'>
                {/* Skeleton Loader */}
                {isLoading &&
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className={`w-fit ${i % 2 == 0 ? 'mr-auto' : 'ml-auto'} max-w-xs p-3 rounded-[15px] bg-gray-700 animate-pulse text-white`}>
                            <div className='h-4 w-40 bg-gray-600 rounded mb-2'></div>
                            <div className='h-3 w-20 bg-gray-600 rounded'></div>
                        </div>
                    ))}

                {/* No Replies */}
                {!isLoading && (!data.reply  ) && <div className='text-center text-xl mt-[100px] text-gray-400 opacity-50 '>No messages yet. Start the conversation!</div>}

                {/* Messages */}
                {!isLoading && (
                    <>
                        {data?.reply && <div className={`w-fit max-w-xs p-3 ml-auto bg-[#005c4b] text-white rounded-[15px_15px_0_15px] `}>
                            <div className='text'>{data?.reply}</div>
                            <div className='timestamp text-xs mt-1 text-opacity-70'>{moment(data?.created_at).format('hh:mm A')}</div>
                        </div>}
                        {data?.replies?.map((msg, index) => (
                            <div key={index} className={`w-fit max-w-xs p-3 rounded-[15px] ${msg.type === 'sender' ? 'ml-auto bg-[#005c4b] text-white rounded-[15px_15px_0_15px]' : 'mr-auto bg-[#363636] text-white rounded-[15px_15px_15px_0]'}`}>
                                <div className='text'>{msg.message}</div>
                                <div className='timestamp text-xs mt-1 text-opacity-70'>{moment(msg.createdAt).format('hh:mm A')}</div>
                            </div>
                        ))}

                        <div ref={bottomRef} />
                    </>
                )}
            </div>

            {/* 📥 Input Area */}
            <div className='relative mt-[50px] mb-[20px]  w-full max-w-[500px] mx-auto'>
                <input type='text' placeholder={t('send-message')} className=' outline-none rounded-full overflow-hidden w-full border p-3  bg-[#FAFAFA] pr-12 text-sm' value={message} onChange={e => setMessage(e.target.value)} />

                <div onClick={sendMessage} className='absolute z-10 ltr:right-[2.5px] rtl:left-[2.5px] top-1/2 -translate-y-1/2 rounded-full cursor-pointer hover:scale-[1.1] duration-300 mx-auto h-[40px] w-[40px] p-[5px] bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center'>
                    {loading ? <Loader2 className='text-white animate-spin' size={16} /> : <Send className='text-white' size={16} />}
                </div>
            </div>
        </div>
    );
};

export default page;
