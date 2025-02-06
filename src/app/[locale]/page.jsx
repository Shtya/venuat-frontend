"use client"
import { useTranslations } from 'next-intl';
import Card from '@/components/molecules/card/Card';
import CardSlider from '@/components/molecules/card/CardSlider';
import { choosePackage, tabsHome, mostPlace, FilterPageData  } from '@/Dummy/dummy.js';
import Button from '@/components/atoms/button/Button';
import Hero from '@/components/page/home/Hero.jsx';
import Tabs from "@/components/atoms/tabs/Tabs"
import CardGrid2_1 from "@/components/molecules/card/CardGrid2_1"
import Arrow from "@/components/molecules/swiper/Arrow"
import { useState } from 'react';

const page = () => {
  const t = useTranslations();


  const [indextab , setindextab  ] = useState(1)


  return (
    <main className='home'>
      <Hero />

      <div className='my-[100px] ' >
        <div className="container">

          <div  data-aos="fade-up" className="h1 mb-[20px] text-center "> {t("chooseVenue")} </div>
          <Tabs setindextab={setindextab} data={tabsHome} classname={"my-[30px] mb-[50px] "} />
          <Card indextab={indextab}  data={choosePackage} />

          <div data-aos="fade-up" className="h4 mt-[100px] text-center"> {t("mostPlace")} </div>
          <div data-aos="fade-up" className="h1 mb-[40px] text-center text-primary1 "> {t("recentHighlights")} </div>
          <CardGrid2_1 data={mostPlace}  />
          <Button dataAos="fade-up" href={"/available-halls"} name={t('browse_all')} outline={true} classname={'!max-w-[300px]  mx-auto mt-[50px] '} /> 
        

          <div data-aos="fade-up" className='flex items-center justify-between  mt-[100px] mb-[40px]' >
            <div  className="h1  text-primary1 "> {t("bestRate")} </div>
            <Arrow />
          </div>
          <CardSlider data={FilterPageData} />
          <Button href={"/available-halls"} dataAos={"fade-up"} name={t('browse_all')} outline={true} classname={'!max-w-[300px]  mx-auto mt-[50px] '} /> 

        
        
        </div>
      </div>
    </main>
  );
};

export default page;
