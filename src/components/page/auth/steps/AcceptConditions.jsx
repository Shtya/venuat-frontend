import TextArea from '../../home/TextArea';
import { useLocale, useTranslations } from 'next-intl';
import Checkbox from '@/components/atoms/checkbox/Checkbox';
import Button from '@/components/atoms/button/Button';

import { onEnter } from '@/helper/onEnter';
import React, { useEffect, useState } from 'react';
import { hookSetting } from '@/hooks/hookSettings';
import { base } from '@/config/Axios';

export default function AcceptConditions({ previousStep, watch, loading: loadingPolicesSend, submit, KEY = 'accetpCondition', setValue }) {
  const t = useTranslations();
  const locale = useLocale()

  const { data, loading } = hookSetting();
  onEnter(submit);

  const watchKey = watch?.(KEY);
  const [next, setnext] = useState(true);
  useEffect(() => {
    setnext(!watchKey);
    if (next) {
      setValue('acceptTerms', next);
    }
  }, [watchKey]);

  useEffect(() => {
    const ele = document.getElementById('layoutAuth');
    if (ele) {
      ele.style.maxWidth = '900px';
    }
  }, []);

  const handleDownloadPdf = () => {
    if(locale == "en" && data?.settings?.contractPdfUrl_en){
      const fileUrl = `${base}${data.settings.contractPdfUrl_en}`;
      window.open(fileUrl, '_blank', 'noopener');
    }
    if (locale == "ar" && data?.settings?.contractPdfUrl) {
      const fileUrl = `${base}${data.settings.contractPdfUrl}`;
      window.open(fileUrl, '_blank', 'noopener');
    }
  };

  return (
    <div data-aos="fade-up">
      <TextArea policy={data?.settings?.policies} loading={loading} classname={'mt-0 !mb-[50px]  '} title={t('titleCondition')} desc={t('descCondition')} />

      <div className="flex items-center gap-2 mt-4">
        <Checkbox watch={watch} cn="!mt-0" cnLabel={'text-secondry1 !font-[600] !h3'} setValue={setValue} KEY={KEY} />
        {/* {data?.settings?.contractPdfUrl && ( */}
          <button type="button" onClick={handleDownloadPdf} className="cursor-pointer text-base font-[500] text-gray-700 underline  hover:text-blue-800">
            {t('acceptCondition')}
          </button>
        {/* )} */}
      </div>

      {/* <Checkbox  watch={watch} href={"/terms-and-conditions"} cn='!mt-0' cnLabel={"text-secondry1 !font-[600] !h3  "}  setValue={setValue}  KEY={KEY} label={t("acceptCondition")} /> */}

      <Button isLoading={loadingPolicesSend} disabled={next} width=" mx-auto max-w-[400px] w-full" onClick={submit} classname="mt-[50px] " name={t('containue')} />
      <Button width=" mx-auto max-w-[400px] w-full" onClick={previousStep} classname="mt-[10px] " outline={true} name={t('return')} />
    </div>
  );
}
