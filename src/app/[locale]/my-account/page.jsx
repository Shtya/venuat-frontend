"use client"
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import Sidebar from '@/components/atoms/Sidebar';
import MyInformation from '@/components/page/profile/MyInformation';
import HallReservation from '@/components/page/profile/HallReservation';
import MyQuestion from '@/components/page/profile/MyQuestion';

const page = () => {
  const t = useTranslations();
  const [currentComponent , setcurrentComponent] =useState(1)

  const handleCurrentPage = (number)=>{
    setcurrentComponent(number)
    const url = new URL(window.location);
    url.searchParams.set("page", number);
    window.history.pushState({}, "", url);
  }


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPageFromUrl = urlParams.get("page");

    if (currentPageFromUrl) {
      setcurrentComponent(parseInt(currentPageFromUrl));
    }
  }, []);


  return (
    <main className=' max-lg:pt-[50px] min-h-[100vh] container'>
      <Breadcrumbs data={[ { name: 'profile', value: '' } ]}  />

      <div className='grid grid-cols-[250px,1fr] gap-[30px] max-sm:grid-cols-1 ' >
        <Sidebar currentComponent={currentComponent} handleCurrentPage={handleCurrentPage} />

        {currentComponent == 1 && <MyInformation /> }
        {currentComponent == 2 && <HallReservation /> }
        {currentComponent == 3 && <MyQuestion /> }
      </div>
    </main>
  );
};

export default page;
