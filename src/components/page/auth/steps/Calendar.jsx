"use client"
import Button from "@/components/atoms/button/Button";
import { onEnter } from "@/helper/onEnter";
import { useTranslations } from "next-intl";
import React from "react";
import MyScheduler from "./MyScheduler";

const Timeline = ({step , setstep}) => {


  const t = useTranslations();

  const handleGoToNextStep = () => {
      setstep(step + 1);
  };

  onEnter(handleGoToNextStep);

  const handleReturn = e => {
      setstep(step - 1);
  };

  return (
    <div className="timeline-container">
      {/* Calendar Grid */}
      <MyScheduler />

      {/* <Button width=" mx-auto max-w-[400px] w-full" dataAos='fade-up' onClick={handleGoToNextStep} classname='mt-[50px] ' name={t("containue")} />
      <Button width=" mx-auto max-w-[400px] w-full" dataAos='fade-up' onClick={handleReturn} classname='mt-[10px] ' outline={true} name={t("return")} /> */}
      
    </div>
  );
};

export default Timeline;
