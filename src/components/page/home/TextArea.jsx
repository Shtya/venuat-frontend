import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

export default function TextArea({ classname, policy, loading, title, desc }) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div data-aos="fade-up" className={`my-[100px] max-w-[900px] ${classname} `}>
      {title && <div  className="text-center text-secondry1s font-[700] mb-[10px] h1">{title}</div>}
      {desc && <div  className="text-center mb-[40px] h4 text-secondry3">{desc}</div>}

      <div id="accessibility"  className="h2 font-[700] mb-[10px]">{t("accessibility")}</div>
      <div  className="h3 text-secondry3">{t("accessibility_description")}</div>

      <div id="policies"  className="h2 font-[700] mt-[40px] mb-[10px]">{t("policies")}</div>

      <div className="flex flex-col gap-[20px]">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} >
                <div className="h-6 w-2/3 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-10 mt-[10px] w-full bg-gray-300 rounded animate-pulse"></div>
              </div>
            ))
          :  policy?.length > 0 ? ( policy?.map((e, i) => (
              <div key={e.id} >
                <div className="h2 font-[700] mt-[20px]">
                  {i + 1} - {e?.name?.[locale]}
                </div>
                <div className="h3 text-secondry3">{e?.description?.[locale]}</div>
              </div>
            )))
			: <h1 className='mt-[10px] capitalize text-[#999] text-2xl '> {t("notfoundpolicy")} </h1>
		
		}
      </div>
    </div>
  );
}
