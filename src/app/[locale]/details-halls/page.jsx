import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import Section1 from '@/components/page/home/Section1';
import Section2 from '@/components/page/home/Section2';
import FAQs from '@/components/molecules/FAQ/FAQs';
import TextArea from '@/components/page/home/TextArea';
import Card from '@/components/molecules/card/Card';
import { choosePackage, hallsYouMayLike , FAQsData  } from '@/Dummy/dummy.js';
import Button from '@/components/atoms/button/Button';
import AskSomeThing from '@/components/molecules/FAQ/AskSomeThing';

const page = () => {
  const t = useTranslations();
  

  return (
    <main className='home container max-lg:pt-[50px] '>
      <Breadcrumbs
        data={[
          { name: 'available_halls', value: '/' },
          { name: 'hall_details', value: '' },
        ]}
      />

      <Section1 />
      <Section2 />

      <div data-aos="fade-up" className='h1 font-[700] my-[30px] '> {t('choose_location_package')} </div>
      <Card data={choosePackage} />

      <div data-aos="fade-up" className='h1 font-[700] my-[30px] '> {t('halls_you_may_like')} </div>
      <Card  id={"similar_halls"} data={hallsYouMayLike} />
      <Button dataAos="fade-up" name={t('browse_all')} outline={true} classname={'!max-w-[300px]  mx-auto mt-[50px] '} />

      <TextArea />

      <div className=' max-xl:max-w-[800px] max-xl:mx-auto grid grid-cols-[1fr,450px] max-xl:grid-cols-1 gap-[30px] ' >
        <FAQs cn={"py-0"} data={FAQsData} />
        <AskSomeThing />
      </div>
    </main>
  );
};

export default page;
