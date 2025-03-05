'use client';
import { useTranslations } from 'next-intl';
import Card from '@/components/molecules/card/Card';
import CardSlider from '@/components/molecules/card/CardSlider';
import Button from '@/components/atoms/button/Button';
import Hero from '@/components/page/home/Hero.jsx';
import CardGrid2_1 from '@/components/molecules/card/CardGrid2_1';
import Arrow from '@/components/molecules/swiper/Arrow';
import { hookHomePage } from '@/hooks/hookHomePage';
import TabsHome from '@/components/atoms/tabs/TabsHome';
import { hookSetting } from '@/hooks/hookSettings';

const page = () => {
    const t = useTranslations();
    const {  occasionId, setoccasionId , venues, loading , occasionNames } = hookHomePage()
    const {loading:loadingSetting , data:dataSetting } = hookSetting()

    return (
        <main className='home'>
            <Hero />

            <div className='my-[100px] '>
                <div className='container'>
                    <div data-aos='zoom-out' className='h1 mb-[20px] text-center '> {t('chooseVenue')} </div>
                    <TabsHome isLoading={loading} setindextab={setoccasionId} data={occasionNames} classname={'my-[30px] mb-[50px] '} />
                    <Card isLoading={loading} indextab={occasionId} data={venues} />


                    <div data-aos='zoom-out' className='h4 mt-[100px] text-center'> {t('mostPlace')}  </div>
                    <div data-aos='zoom-out' data-aos-delay={200} className='h1 mb-[40px] text-center text-primary1 '>{t('recentHighlights')}  </div>
                    <CardGrid2_1 isLoading={loadingSetting} data={dataSetting?.specialVenues} />
                    <Button dataAos='zoom-out' href={'/available-halls'} name={t('browse_all')} outline={true} classname={'!max-w-[300px]  mx-auto mt-[50px] '} />

                    <div  className='flex items-center justify-between  mt-[100px] mb-[40px]'>
                        <div data-aos='zoom-out' className='h1  text-primary1 '> {t('bestRate')} </div>
                        <Arrow />
                    </div>
                    <CardSlider isLoading={loadingSetting} data={dataSetting?.bestRatedVenues} />
                    <Button href={'/available-halls'} dataAos={'zoom-out'} name={t('browse_all')} outline={true} classname={'!max-w-[300px]  mx-auto mt-[50px] '} />
                </div>
            </div>
        </main>
    );
};

export default page;
