import { FaqsSendSkeleton } from '@/components/atoms/Skelton/FaqsSendSkeleton';
import Tabs from '@/components/atoms/tabs/Tabs';
import FAQs from '@/components/molecules/FAQ/FAQs';
import { FAQsData, tabsHome } from '@/Dummy/dummy';
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

            <VenueQuestions data={faqs} loading={loadingfaqs} />
        </div>
    );
}

const VenueQuestions = ({ data, loading }) => {
    const t = useTranslations('');
    const [groupedData, setGroupedData] = useState({});
    const [activeTab, setActiveTab] = useState('');
    const locale = useLocale();

    useEffect(() => {
        if (data) {
            const grouped = data.reduce((acc, item) => {
                const venueName = item.venue.name?.[locale];
                if (!acc[venueName]) acc[venueName] = [];

                acc[venueName].push(item);
                return acc;
            }, {});

            setGroupedData(grouped);
            if (Object.keys(grouped).length > 0) {
                setActiveTab(Object.keys(grouped)[0]);
            }
        }
    }, [data]);

    if (loading) {
        return <FaqsSendSkeleton />;
      }

    return (
        <div className='w-full'>
            <div  data-aos="fade-up" className='flex gap-4 flex-wrap justify-center items-center  mt-[20px]'>
                {Object.keys(groupedData).map(venueName => (
                    <button key={venueName} onClick={() => setActiveTab(venueName)} className={`px-4 min-w-[150px]  min-h-[60px] py-2 text-[14px]  rounded-full  font-medium border ${activeTab === venueName ? ' border-primary1 bg-primary1 text-white' : ' border-[#4B4A4F]'}`}>
                        {venueName}
                    </button>
                ))}
            </div>

            {/* Cards */}
            <div className='mt-6 space-y-4'>
                {groupedData[activeTab]?.map(e => (
                    <div data-aos='fade-up'  key={e.id} className='p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
                        {/* Question */}
                        <div className='text-xl font-semibold text-primary1'>{ e?.question?.[locale] || e.question?.ar}</div>

                        {/* Status */}
                        <div className='mt-3 flex items-center'>
                            <span className='text-sm font-medium text-gray-600'> {t('status')} </span>
                            <span className={`ml-2 px-3 py-1 text-sm font-semibold rounded-full ${e.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{e.status}</span>
                        </div>

                        {/* Answer (if available) */}
                        {e.answer && (
                            <div className='mt-3'>
                                <span className='text-sm font-medium text-gray-600'> {t('answer')} </span>
                                <p className='mt-1 text-sm text-gray-800 bg-gray-50 p-3 rounded-lg'>{e.answer?.[locale]}</p>
                            </div>
                        )}

                        {/* Asked On */}
                        <div className='mt-4 text-xs text-gray-500'>
                            {' '}
                            {t('askedOn')} {new Date(e.created_at).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
