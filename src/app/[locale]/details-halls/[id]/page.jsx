"use client"
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import Section1 from '@/components/page/home/Section1';
import Section2 from '@/components/page/home/Section2';
import FAQs from '@/components/molecules/FAQ/FAQs';
import TextArea from '@/components/page/home/TextArea';
import Card from '@/components/molecules/card/Card';
import Button from '@/components/atoms/button/Button';
import AskSomeThing from '@/components/molecules/FAQ/AskSomeThing';
import  { useDetailsHalls}  from '@/hooks/useDetailsHalls';
import CardPackage from '@/components/molecules/card/CardPackage';
import Arrow from '@/components/molecules/swiper/Arrow';

const Page = ({params}) => {
  const t = useTranslations();

  const {venue, loading, policy , loadingPolicy , faqs ,loadingfaqs , Package  } = useDetailsHalls({id : params.id})
  

  return (
    <main className='home container max-lg:pt-[50px] '>
      <Breadcrumbs
        data={[
          { name: 'available_halls', value: '/available-halls' },
          { name: 'hall_details', value: '' },
        ]}
      />

      <Section1 venue={venue?.venue} loading={loading} />
      <Section2 venue={venue?.venue} loading={loading} /> 

        <div  className={` ${Package?.length > 0 && "!flex"} hidden items-center justify-between  mt-[100px] mb-[40px]`}>
            <div data-aos="fade-up" className='h1 font-[700] my-[30px] '> {t('choose_location_package')} </div>
            <Arrow />
        </div>
      
      <CardPackage data={venue?.venue} Package={Package} loading={loading} />

      <div data-aos="fade-up" className='h1 font-[700] my-[30px] '> {t('halls_you_may_like')} </div>
      <Card  id={"similar_halls"} data={venue?.similarVenues} isLoading={loading} />
      <Button href={"/available-halls"} dataAos="fade-up" name={t('browse_all')} outline={true} classname={'!max-w-[300px]  mx-auto mt-[50px] '} />
      {policy?.length > 0 && <TextArea policy={policy} loading={loadingPolicy} />}

      <div className=' max-xl:max-w-[800px] max-xl:mx-auto grid grid-cols-[1fr,450px] max-xl:grid-cols-1 gap-[30px] ' >
        <FAQs cn={"!py-0"} title={"faqstitle"} data={faqs} loading={loadingfaqs} />
        <AskSomeThing id={params.id} />
      </div>
    </main>
  );
};

export default Page;
