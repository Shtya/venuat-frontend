import React, { useState, useEffect } from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { useTranslations } from 'next-intl';

const CountdownTimer = ({ Package }) => {
  const [countdownTo, setCountdownTo] = useState(null);
  const [staticDiff, setStaticDiff] = useState(null);
  const [status, setStatus] = useState('loading');
  const t = useTranslations('');

  useEffect(() => {
    if (Package?.start_date && Package?.end_date) {
      const start = new Date(Package.start_date).getTime();
      const end = new Date(Package.end_date).getTime();
      const now = Date.now();

      if (now < start) {
        setStatus('before');
        const diff = start - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setStaticDiff({ hours, minutes, seconds });
      } else if (now >= end) {
        setStatus('expired');
      } else {
        setStatus('running');
        setCountdownTo(end);
      }
    }
  }, [Package]);

  if (status === 'expired') return null;

  return (
    <div>
      <div className='mb-4 h2 text-center'>
    {status === 'before'
        ? t('title_timer_before')
        : status === 'running'
        ? t('title_timer_running')
        : ''}
    </div>


      <div className='relative flex items-center justify-center overflow-hidden rounded-[0px_0px_20px_20px] border max-w-[450px] h-[130px] w-full mx-auto border-gray-50 shadow-md px-6 pb-3 pt-8'>
        <div className='progress absolute left-0 right-0 top-0 h-[6px] overflow-hidden bg-gray-300'></div>

        {status === 'running' && countdownTo && (
          <FlipClockCountdown
            to={countdownTo}
            labelStyle={{ color: '#1e328b', fontSize: '14px', fontWeight: '700' }}
            labels={['Hours', 'Minutes', 'Seconds']}
            className='rtl:flex-row-reverse tick flex justify-center text-[28px]'
            onComplete={() => alert(t('timer_expired'))}
          />
        )}

        {status === 'before' && staticDiff && (
          <div className='flex gap-4 text-[28px] font-bold text-blue-700'>
            <div className='text-center'>
              <div className='text-3xl  ' >{String(staticDiff.hours).padStart(2, '0')}</div>
              <div className='text-lg  text-primary '>{t('Hours')}</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl  ' >{String(staticDiff.minutes).padStart(2, '0')}</div>
              <div className='text-lg  text-primary '>{t('Minutes')}</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl  ' >{String(staticDiff.seconds).padStart(2, '0')}</div>
              <div className='text-lg  text-primary '>{t('Seconds')}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;

// import React, { useState, useEffect } from 'react';
// import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
// import '@leenguyen/react-flip-clock-countdown/dist/index.css';
// import { useTranslations } from 'next-intl';

// const CountdownTimer = ({ Package }) => {
//     const [endTime, setEndTime] = useState(0);
//     const t = useTranslations('');

//     useEffect(() => {
//         if (Package?.end_date) {
//             const endDate = new Date(Package.end_date).getTime();
//             setEndTime(endDate);
//         }
//     }, [Package]);

//     console.log(Package.start_date , Package.end_date)
//     return (
//         <div className=''>
//             <div className='mb-4 h2 text-center '>
//                 {t('title_timer')}
//             </div>

//             <div className='relative flex items-center justify-center overflow-hidden rounded-[0px_0px_20px_20px] border max-w-[450px] h-[130px] w-full mx-auto border-gray-50 shadow-md  px-6 pb-3 pt-8'>
//                 <div className='progress absolute left-0 right-0 top-0 h-[6px] overflow-hidden bg-gray-300 '></div>

//                 {endTime > Date.now() ? (
//                     <FlipClockCountdown
//                         to={endTime}
//                         labelStyle={{ color: '#1e328b', fontSize: '14px', fontWeight: '700' }}
//                         labels={['Hours', 'Minutes', 'Seconds']}
//                         className=' rtl:flex-row-reverse tick flex justify-center text-[28px]'
//                         onComplete={() => alert(t('timer_expired'))} // You can customize this action
//                     />
//                 ) : (
//                     <div className='text-center text-red-500 font-bold'>
//                         {t('timer_expired')}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CountdownTimer;
