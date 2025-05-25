"use client"
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import Sidebar from '@/components/atoms/Sidebar';
import MyInformation from '@/components/page/profile/MyInformation';
import HallReservation from '@/components/page/profile/HallReservation';
import MyQuestion from '@/components/page/profile/MyQuestion';
import { hookMyAccount } from '@/hooks/hookMyAccount';

const page = () => {
  const {faqs , loadingfaqs , loadingInfo , loadingPassword , user ,  register , errors , getValues, setValue , SubmitStep , watch , getMe , loading, error } = hookMyAccount()
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
    <main className=' max-lg:pt-[50px] min-h-[100vh] container '>
      <Breadcrumbs data={[ { name: 'profile', value: '' } ]}  />

      <div className='grid grid-cols-[230px,1fr] gap-[20px] max-[750px]:grid-cols-1 ' >
        <Sidebar getMe={getMe} loading={loading} currentComponent={currentComponent} handleCurrentPage={handleCurrentPage} />

        {currentComponent == 1 && <MyInformation user={user} loadingInfo={loadingInfo} loadingPassword={loadingPassword} SubmitStep={SubmitStep} register={register} errors={errors} getValues={getValues} setValue={setValue} /> }
        {currentComponent == 2 && <HallReservation   /> }
        {currentComponent == 3 && <MyQuestion faqs={faqs} loadingfaqs={loadingfaqs} /> }
      </div>
    </main>
  );
};

export default page;
