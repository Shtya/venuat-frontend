import { FaqsSendSkeleton } from '@/components/atoms/Skelton/FaqsSendSkeleton';
import Tabs from '@/components/atoms/tabs/Tabs';
import FAQs from '@/components/molecules/FAQ/FAQs';
import { FAQsData, tabsHome } from '@/Dummy/dummy';
import { ArrowDown, ArrowDownRightFromCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

export default function MyQuestion({ faqs, loadingfaqs }) {
    const t = useTranslations();

    return (
        <div>
            <div data-aos='fade-up' className='h1 text-center '>
                {t('sent_questions')}
            </div>
            <div data-aos='fade-up' className='h3 text-center  text-secondry3 '>
                {t('Halls')}
            </div>

            <VenueQuestions data={[]} loading={loadingfaqs} />
        </div>
    );
}


const VenueQuestions = ({ data, loading }) => {
    const t = useTranslations('');
    const [groupedData, setGroupedData] = useState({});
    const [activeTab, setActiveTab] = useState('');
    const [activeQuestion, setActiveQuestion] = useState(null);
    const locale = useLocale();

    useEffect(() => {
        if (data) {
            const grouped = data.reduce((acc, item) => {
                const venueId = item.venue.id;
                const venueName = item.venue.name?.[locale] || 'Unknown Venue';
                if (!acc[venueId]) acc[venueId] = { name: venueName, questions: [] };
                acc[venueId].questions.push(item);
                return acc;
            }, {});

            setGroupedData(grouped);
            if (Object.keys(grouped).length > 0) {
                setActiveTab(Object.keys(grouped)[0]); // تعيين أول قاعة كعلامة تبويب نشطة
            }
        }
    }, [data]);

    if (loading) {
        return <FaqsSendSkeleton />;
    }

    if(data?.length == 0) return  <div className='h-[200px] mt-[100px] text-center text-[25px] opacity-40  ' > {t("noQuestionYet")} </div>

    return (
        <div data-aos='fade-up' className='w-full p-4'>
            {/* Tabs */}
            <div className='flex gap-4 flex-wrap justify-center items-center mt-[20px]'>
                {Object.keys(groupedData).map(venueId => (
                    <button
                        key={venueId}
                        onClick={() => setActiveTab(venueId)}
                        className={`px-4 min-w-[150px] min-h-[60px] py-2 text-[14px] rounded-full font-medium border transition-all duration-300 ${activeTab === venueId ? 'border-primary1 bg-primary1 text-white' : 'border-[#4B4A4F] bg-white text-[#4B4A4F]'}`}
                    >
                        {groupedData[venueId].name}
                    </button>
                ))}
            </div>

            {/* Questions */}
            <div className='mt-6 space-y-2'>
                {groupedData[activeTab]?.questions?.map((e, i) => (
                    <div
                        key={e.id}
                        className={`p-4 bg-white  border-b border-[#000] border-opacity-[.14]  transition-all duration-300 ${activeQuestion === i ? 'shadow-2xl' : 'hover:shadow-xl'}`}
                    >
                        <div onClick={() => setActiveQuestion(activeQuestion === i ? null : i)} className='flex justify-between items-center cursor-pointer'>
                            <div className='flex items-center gap-[10px]'>
                                <span className='font-[800] text-primary2'>Q{i + 1}</span>
                                <div className='text-lg font-semibold text-primary1'>{e?.question?.[locale] || e.question?.ar}</div>
                            </div>
                            <svg
                                className={`${activeQuestion === i ? 'rotate-[-180deg] !scale-[1]' : ''} scale-[.7] transition-all duration-500`}
                                width="24"
                                height="14"
                                viewBox="0 0 24 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 2L12 12L22 2" stroke="#646369" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                            <div className={`${activeQuestion == i ? "mt-2  max-h-[300px] py-[10px] " : " max-h-0  "} ease-in-out duration-500 overflow-auto transition-all `}>
                                {e.answer && <div className='text-gray-800 bg-gray-50 p-3 rounded-lg'>{e.answer?.[locale] || e.answer?.ar}</div>}
                                <div className='text-xs text-gray-500 mt-2'>
                                    {t('askedOn')} {new Date(e.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};


// const VenueQuestions = ({ data, loading }) => {
//     const t = useTranslations('');
//     const [groupedData, setGroupedData] = useState({});
//     const [activeTab, setActiveTab] = useState('');
//     const [activeQuestion, setActiveQuestion] = useState(null);
//     const locale = useLocale();

//     useEffect(() => {
//         if (data) {
//             const grouped = data.reduce((acc, item) => {
//                 const venueName = item.venue.name?.[locale];
//                 if (!acc[venueName]) acc[venueName] = [];
//                 acc[venueName].push(item);
//                 return acc;
//             }, {});

//             setGroupedData(grouped);
//             if (Object.keys(grouped).length > 0) {
//                 setActiveTab(Object.keys(grouped)[0]);
//             }
//         }
//     }, [data]);

//     if (loading) {
//         return <FaqsSendSkeleton />;
//     }

//     return (
//         <div data-aos='fade-up' className='w-full p-4'>
//             {/* Tabs */}
//             <div className='flex gap-4 flex-wrap justify-center items-center mt-[20px]'>
//                 {Object.keys(groupedData).map(venueName => (
//                     <button key={venueName} onClick={() => setActiveTab(venueName)} className={`px-4 min-w-[150px] min-h-[60px] py-2 text-[14px] rounded-full font-medium border transition-all duration-300 ${activeTab === venueName ? 'border-primary1 bg-primary1 text-white' : 'border-[#4B4A4F] bg-white text-[#4B4A4F]'}`}>
//                         {venueName}
//                     </button>
//                 ))}
//             </div>

//             {/* Questions */}
//             <div className='mt-6 space-y-2'>
//                 {groupedData[activeTab]?.map((e, i) => (
//                     <div key={e.id} className={`p-4 bg-white rounded-xl shadow-lg transition-all duration-300 ${activeQuestion === i ? 'shadow-2xl' : 'hover:shadow-xl'}`}>
//                         <div onClick={() => setActiveQuestion(activeQuestion === i ? null : i)} className='flex justify-between items-center cursor-pointer'>
//                             <div className='flex items-center gap-[10px] ' >
//                                 <span className='font-[800] text-primary2 ' >  Q{i+1} </span>
//                                 <div className='text-lg font-semibold text-primary1'>{e?.question?.[locale] || e.question?.ar}</div>
//                             </div>
//                             <svg className={`${activeQuestion === i ? 'rotate-[-180deg] !scale-[1] ' : ''} scale-[.7] transition-all duration-500  `} width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L12 12L22 2" stroke="#646369" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
//                         </div>
//                         {activeQuestion === i && (
//                             <div className='mt-2'>
//                                 {e.answer && <div className='text-gray-800 bg-gray-50 p-3 rounded-lg'>{e.answer?.[locale] || e.answer?.ar}</div>}
//                                 <div className='text-xs text-gray-500 mt-2'>
//                                     {t('askedOn')} {new Date(e.created_at).toLocaleDateString()}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
