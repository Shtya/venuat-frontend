// import { FaqsSendSkeleton } from '@/components/atoms/Skelton/FaqsSendSkeleton';
// import { useLocale, useTranslations } from 'next-intl';
// import React, { useEffect, useState } from 'react';

// export default function MyQuestion({ faqs, loadingfaqs }) {
//     const t = useTranslations();

//     return (
//         <div>
//             <div data-aos='fade-up' className='h1 text-center '>
//                 {t('sent_questions')}
//             </div>
//             <div data-aos='fade-up' className='h3 text-center  text-secondry3 '>
//                 {t('Halls')}
//             </div>

//             <VenueQuestions data={faqs} loading={loadingfaqs} />
//         </div>
//     );
// }

// const VenueQuestions = ({ data, loading }) => {
//     const t = useTranslations('');
//     const [groupedData, setGroupedData] = useState({});
//     const [activeTab, setActiveTab] = useState('');
//     const [activeQuestion, setActiveQuestion] = useState(null);
//     const locale = useLocale();

//     useEffect(() => {
//         if (data) {
//             const grouped = data.reduce((acc, item) => {
//                 const venueId = item.venue.id;
//                 const venueName = item.venue.name?.[locale] || 'Unknown Venue';
//                 if (!acc[venueId]) acc[venueId] = { name: venueName, questions: [] };
//                 acc[venueId].questions.push(item);
//                 return acc;
//             }, {});

//             setGroupedData(grouped);
//             if (Object.keys(grouped).length > 0) {
//                 setActiveTab(Object.keys(grouped)[0]); // تعيين أول قاعة كعلامة تبويب نشطة
//             }
//         }
//     }, [data]);

//     if (loading) {
//         return <FaqsSendSkeleton />;
//     }

//     if (data?.length == 0) return <div className='h-[200px] mt-[100px] text-center text-[25px] opacity-40  '> {t('noQuestionYet')} </div>;

//     return (
//         <div data-aos='fade-up' className='w-full p-4'>
//             {/* Tabs */}
//             <div className='flex gap-4 flex-wrap justify-center items-center mt-[20px]'>
//                 {Object.keys(groupedData).map(venueId => (
//                     <button key={venueId} onClick={() => setActiveTab(venueId)} className={`px-4 min-w-[150px] min-h-[60px] py-2 text-[14px] rounded-full font-medium border transition-all duration-300 ${activeTab === venueId ? 'border-primary1 bg-primary1 text-white' : 'border-[#4B4A4F] bg-white text-[#4B4A4F]'}`}>
//                         {groupedData[venueId].name}
//                     </button>
//                 ))}
//             </div>

//             {/* Questions */}
//             <div className='mt-6 space-y-2'>
//                 {groupedData[activeTab]?.questions?.map((e, i) => (
//                     <div key={e.id} className={`p-4 bg-white  border-b border-[#000] border-opacity-[.14]  transition-all duration-300 ${activeQuestion === i ? 'shadow-2xl' : 'hover:shadow-xl'}`}>
//                         <div onClick={() => setActiveQuestion(activeQuestion === i ? null : i)} className='flex justify-between items-center cursor-pointer'>
//                             <div className='flex items-center gap-[10px]'>
//                                 <span className='font-[800] text-primary2'>Q{i + 1}</span>
//                                 <div className='text-lg font-semibold text-primary1'>{e?.question?.[locale] || e.question?.ar}</div>
//                             </div>
//                             <svg className={`${activeQuestion === i ? 'rotate-[-180deg] !scale-[1]' : ''} scale-[.7] transition-all duration-500`} width='24' height='14' viewBox='0 0 24 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
//                                 <path d='M2 2L12 12L22 2' stroke='#646369' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round' />
//                             </svg>
//                         </div>

//                         <div className={`${activeQuestion == i ? 'mt-2  max-h-[300px] py-[10px] ' : ' max-h-0  '} ease-in-out duration-500 overflow-auto transition-all `}>
//                             {e.answer && <div className='text-gray-800 bg-gray-50 p-3 rounded-lg'>{e.answer?.[locale] || e.answer?.ar}</div>}
//                             <div className='text-xs text-gray-500 mt-2'>
//                                 {t('askedOn')} {new Date(e.created_at).toLocaleDateString()}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

'use client';
import moment from 'moment';

import React, { useEffect, useRef, useState } from 'react';
import { Send, Search, User, Loader2 } from 'lucide-react';
import AxiosInstance from '@/config/Axios';
import { hookUser } from '@/hooks/hookUser';
import { onEnter } from '@/helper/onEnter';
import { useTranslations } from 'next-intl';

export default function MyQuestion() {
    const [selectedId, setSelectedId] = useState(2);
    const t = useTranslations()
    const [data, setData] = useState();
    const [currentChat, setcurrentChat] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');

    const { user } = hookUser();

    useEffect(() => {
        if (user)
            AxiosInstance.get(`communications?fromId=${user?.id}&type=non_reservation`)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {})
                .finally(() => {
                    setIsLoading(false);
                });
    }, [user , loading]);

    // فلترة البيانات حسب البحث
    const filteredData = data?.data?.filter(conv => {
        const venue = conv?.venue?.name?.en?.toLowerCase() || '';
        return venue.includes(search.toLowerCase());
    });

    //
    const chatContainerRef = useRef(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
        // }, [data?.replies, data?.reply]);
    }, [message , currentChat]);

    // open the chat
    const handleConversation = conv => {
        setSelectedId(conv?.id);
        setcurrentChat(conv);
    };


    // send message 
    const sendMessage = () => {
        setLoading(true);
        AxiosInstance.post(`communications/${currentChat.id}/reply`, {
            message: message,
            type: 'sender'
        })
            .then(async (res) => { 
                setcurrentChat(res?.data)
                setMessage('');  })
            .catch(err => {})
            .finally(() => { setLoading(false); });
    };

    onEnter(sendMessage);

    return (
        <div className='flex max-sm:!h-full sm:h-[60vh] max-sm:flex-col max-sm:gap-[15px] gap-[5px] filter  w-full text-sm'>
            {/* Sidebar */}
            <div className='w-[240px] max-sm:!w-full max-xl:w-[180px] rounded-tr-[5px] flex-none max-sm:!h-[300px] h-full bg-white overflow-y-auto overflow-x-hidden shadow-[0_4px_12px_rgba(0,0,0,0.06)]'>
                <div className='sticky sm:border-b sm:border-b-neutral-300 z-[10] top-0 h-[50px] w-full bg-[#f7f8fd] mb-[10px]'>
                    <Search className='absolute top-[50%] text-gray-500 rtl:right-[10px] ltr:left-[10px] translate-y-[-50%]' size={16} />
                    <input type='text' placeholder='Search...' value={search} onChange={e => setSearch(e.target.value)} className='ltr:pl-[35px] bg-transparent text-gray-500 rtl:pr-[35px] outline-none h-full w-full text-sm focus:outline-none' />
                </div>

                <ul className=''>
                    {isLoading
                        ? Array(5)
                              .fill(0)
                              .map((_, idx) => (
                                  <li key={idx} className='px-[10px] py-2'>
                                      <div className='flex items-center gap-[10px] animate-pulse'>
                                          <div className='bg-[#ddd] w-[40px] h-[40px] rounded-full'></div>
                                          <div className='flex-1 space-y-2'>
                                              <div className='flex justify-between'>
                                                  <div className='bg-[#ddd] h-[10px] w-[80px] rounded'></div>
                                                  <div className='bg-[#ddd] h-[10px] w-[30px] rounded'></div>
                                              </div>
                                              <div className='bg-[#ddd] h-[10px] w-full rounded'></div>
                                          </div>
                                      </div>
                                  </li>
                              ))
                        : filteredData?.map(conv => (
                              <li key={conv.id} onClick={() => handleConversation(conv)} className={`cursor-pointer px-[10px] py-2 ${selectedId === conv.id ? 'bg-primary2 text-white font-medium ' : 'hover:bg-neutral-100 duration-300'}`}>
                                  <div className='flex items-center gap-[10px]'>
                                      <div className={`flex-none bg-[#ececec] ${selectedId === conv.id ? "!bg-primary3 text-primary1 " : ""} w-[40px] h-[40px] flex items-center justify-center rounded-full`}>
                                          <User />
                                      </div>
                                      <div className='w-full'>
                                          <div className={`text-gray-700 text-sm font-medium ${selectedId === conv.id ? "!text-white " : ""} `} > {conv?.venue?.name?.en}</div>
                                          <div className={`text-gray-500 text-xs text-wrap ${selectedId === conv.id ? "!text-white !text-opacity-60 " : ""} `}>{conv?.reply?.length <= 20 ? conv?.reply : conv?.reply?.slice(0, 20) + '..'}</div>
                                      </div>
                                  </div>
                              </li>
                          ))}
                </ul>
            </div>

            {/* Chat */}
            <div className=' py-[10px] max-sm:h-[400px] rounded-tl-[5px]  h-full w-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] ' >
                <div ref={chatContainerRef} className=' p-4 relative flex-1 flex flex-col  h-[calc(100%-55px)] overflow-auto !px-[10px] space-y-3   '>

                {
                !currentChat?.reply && <span className='text-gray-400 text-center h-full flex items-center justify-center w-full mt-10 text-[18px] '> {t("no-messages")} </span>
                }
                    {currentChat?.created_at && (
                        <div className='text-center text-xs text-gray-500 my-2'>
                            {moment(currentChat?.created_at).calendar(null, {
                                sameDay: '[Today]',
                                lastDay: '[Yesterday]',
                                lastWeek: 'dddd',
                                sameElse: 'MMMM D, YYYY'
                            })}
                        </div>
                    )}


                    {currentChat?.reply && (
                        <div className={`w-fit max-w-xs p-3 ml-auto bg-[#005c4b] text-white rounded-[15px_15px_0_15px] `}>
                            <div className='text'>{currentChat?.reply}</div>
                            <div className='timestamp text-xs mt-1 text-opacity-70'>{moment(currentChat?.created_at).format('hh:mm A')}</div>
                        </div>
                    )}
                    {currentChat?.replies?.map((msg, index) => (
                        <div key={index} className={`w-fit max-w-xs p-3 rounded-[15px] ${msg.type === 'sender' ? 'ml-auto bg-[#005c4b] text-white rounded-[15px_15px_0_15px]' : 'mr-auto bg-[#363636] text-white rounded-[15px_15px_15px_0]'}`}>
                            <div className='text'>{msg.message}</div>
                            <div className='timestamp text-xs mt-1 text-opacity-70'>{moment(msg.createdAt).format('hh:mm A')}</div>
                        </div>
                    ))}

                </div>
                {currentChat?.reply && <div className='bg-white'>
                    <div className=' relative mx-auto px-[20px] w-full max-w-[500px]' >
                        <input type='text' placeholder={t('send-message')} className='outline-none rounded-full overflow-hidden w-full border p-3  bg-[#FAFAFA] pr-12 text-sm' value={message} onChange={e => setMessage(e.target.value)} />
                        <div onClick={sendMessage} className='absolute border-2 border-[#e5e7eb] z-10 ltr:right-[2.5px] rtl:left-[2.5px] top-1/2 -translate-y-1/2 rounded-full cursor-pointer hover:scale-[1.1] duration-300 mx-auto h-[40px] w-[40px] p-[5px] bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center'>
                            {loading ? <Loader2 className='text-white animate-spin' size={16} /> : <Send className='text-white' size={16} />}
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    );
}
