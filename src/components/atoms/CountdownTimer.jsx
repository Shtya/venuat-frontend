import React, { useState, useEffect } from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { useTranslations } from 'next-intl';

const CountdownTimer = ({ Package }) => {
    const [endTime, setEndTime] = useState(0);
    const t = useTranslations('');

    useEffect(() => {
        if (Package?.end_date) {
            const endDate = new Date(Package.end_date).getTime();
            setEndTime(endDate);
        }
    }, [Package]);

    return (
        <div className=''>
            <div className='mb-4 h2 text-center '>
                {t('title_timer')}
            </div>

            <div className='relative flex items-center justify-center overflow-hidden rounded-[0px_0px_20px_20px] border max-w-[450px] h-[130px] w-full mx-auto border-gray-50 shadow-md  px-6 pb-3 pt-8'>
                <div className='progress absolute left-0 right-0 top-0 h-[6px] overflow-hidden bg-gray-300 '></div>

                {endTime > Date.now() ? (
                    <FlipClockCountdown
                        to={endTime}
                        labelStyle={{ color: '#1e328b', fontSize: '14px', fontWeight: '700' }}
                        labels={['Hours', 'Minutes', 'Seconds']}
                        className=' rtl:flex-row-reverse tick flex justify-center text-[28px]'
                        onComplete={() => alert(t('timer_expired'))} // You can customize this action
                    />
                ) : (
                    <div className='text-center text-red-500 font-bold'>
                        {t('timer_expired')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountdownTimer;
