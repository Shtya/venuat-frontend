import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import { ImgPassword } from '@/constants/imgs';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export default function Step3({loading, register, submit, errors }) {
  const t = useTranslations()

    return (
        <div>
            <div data-aos='fade-up' className='h1 font-semibold  text-center '>
                {t('createNewPassword')}
            </div>

            <div data-aos='fade-up' className='h3 text-secondry3 text-center '>
                {t('passwordHint')}
            </div>

            <Image data-aos='fade-up' className='w-full h-[150px] object-contain my-[20px] ' src={'/assets/imgs/lock.png'} width={300} height={140} alt='' />
            <Input dataAos="fade-up" KEY={"newPassword"} register={register("newPassword")} error={errors?.newPassword} cnInput="!border-[#E1E6EF] !border-[1px] " classname="mt-[20px] "   icon={ImgPassword} type={"password"} label={t("newPassword")} place={t("enterPassword")} />
            <Input dataAos="fade-up" KEY={"confirmPassword"} register={register("confirmPassword")} error={errors?.confirmPassword} cnInput="!border-[#E1E6EF] !border-[1px] " classname="mt-[20px] "   icon={ImgPassword} type={"password"} label={t("reEnterPassword")} place={t("confirmNewPassword")} />

            <Button dataAos='fade-up' isLoading={loading} onClick={submit} name={t('createPassword')} classname='mt-[40px]' />
        </div>
    );
}
