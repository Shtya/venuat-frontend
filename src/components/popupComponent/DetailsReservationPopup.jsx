import React, { useEffect, useState } from 'react';
import SAR from '../atoms/SAR';
import { useLocale, useTranslations } from 'next-intl';
import { ImgMunis, ImgPlus } from '@/constants/imgs';
import Image from 'next/image';
import { Percent } from 'lucide-react';

const BookingDetails = ({ data, loading, open }) => {
  const t = useTranslations();
  const locale = useLocale();
  const [Services, setServices] = useState(null);
  const [Equipments, setEquipments] = useState(null);
  const [ServicesPrice, setServicesPrice] = useState(0);
  const [EquipmentsPrice, setEquipmentsPrice] = useState(0);

  useEffect(() => {
    if (data) {
      if (data?.package) {
        setServices(data?.package?.services?.filter(ele => ele?.price > 0));
        setEquipments(data?.package?.equipments?.filter(ele => ele?.price > 0));
      } else {
        setServices(data?.venue?.venueServices);
        setEquipments(data?.venue?.venueEquipments);
      }
    }
  }, [loading, data]);

  useEffect(() => {
    if (data) {
      const totalServicePrice = Services?.length > 0 && Services?.reduce((acc, curr) => acc + (curr?.price * curr?.count), 0);
      setServicesPrice(totalServicePrice);

      const totalEquipmentPrice = Equipments?.length > 0 && Equipments?.reduce((acc, curr) => acc + (curr?.price * curr?.count), 0);
      setEquipmentsPrice(totalEquipmentPrice);
    }
  }, [Services, Equipments, data]);


  const style = {
    head: 'grid grid-cols-3  gap-[10px] my-[10px]',
    body: 'grid grid-cols-3 justify-center gap-[10px] my-[10px]',
};
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-primary1 mb-6">{t("details-reservation1")}</h2>

      {/* Basic Information */}
      <div className="mb-6">
        <Shap2 title1={t("details-reservation2")} title2={data?.check_in} />
        <Shap2 title1={t("details-reservation3")} title2={data?.check_out} />
        {ServicesPrice && <Shap2 title1={t("details-reservation4")} title2={<SAR cn={"text-lg"} price={ServicesPrice} />} />}
        {EquipmentsPrice && <Shap2 title1={t("details-reservation5")} title2={<SAR cn={"text-lg"} price={EquipmentsPrice} />} />}
        <Shap2 title1={t("details-reservation6")} title2={<SAR cn={"text-lg"} price={data?.venue?.price} />} />
        <Shap2 title1={t("details-reservation7")} title2={<span className='font-bold text-xl text-primary1 flex items-center gap-2'>15 <Percent size={20} /></span>} />
        <Shap2 title1={t("details-reservation8")} title2={<SAR cn={"text-lg"} price={data?.total_price} />} />
      </div>

      {/* Venue Details */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-primary1 mt-8 mb-4">{t("details-reservation9")}</h3>
        <Shap2 title1={t("details-reservation10")} title2={data?.venue?.name?.[locale]} />
        <Shap2 title1={t("details-reservation11")} title2={data?.venue?.contact_person} />
        <Shap2 title1={t("details-reservation12")} title2={data?.venue?.email} />
        <Shap2 title1={t("details-reservation13")} title2={data?.venue?.phone} />
      </div>

      {/* Venue Services */}
      {Services?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-primary1 mt-8 mb-4">{t("details-reservation14")}</h3>
          {Services.map((e, i) => (
            <Amount key={i} style={style.body} disabled={true} name={e?.service?.name?.[locale]} price={e.price} count={e.count} />
          ))}
        </div>
      )}

      {/* Venue Equipments */}
      {Equipments?.length > 0 && (
        <div className="mb-6  ">
          <h3 className="text-2xl font-bold text-primary1 mt-8 mb-4">{t("details-reservation15")}</h3>
          {Equipments.map((e, i) => (
            <Amount key={i} style={style.body} disabled={true} name={e?.equipment?.name?.[locale]} price={e.price} count={e.count} />
          ))}
        </div>
      )}
    </div>
  );
};

function Shap2({ title1, title2 }) {
  return (
    <div className="flex items-center justify-between py-[10px] border-b border-gray-200">
      <span className="text-lg font-semibold text-gray-700">{title1}</span>
      <span className="!text-lg font-medium text-gray-800">{title2}</span>
    </div>
  );
}

function Amount({ disabled, style , name, price, count }) {
  return (
    <div className={`${style} border-b border-gray-200 py-[10px]`}>
      <div className="text-lg font-semibold text-gray-700 capitalize ">{name}</div>

      <div className="flex items-center justify-center gap-4">
        <button
          disabled={disabled}
          className="disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300 disabled:opacity-50 flex-none w-8 h-8 cursor-pointer hover:bg-primary3 duration-300 border border-gray-300 rounded-full flex items-center justify-center"
        >
          <Image className="w-4" src={ImgPlus} alt="" width={20} height={20} />
        </button>
        <span className="text-lg text-center min-w-[30px]">{count}</span>
        <button
          disabled={count == 0 ? true : disabled}
          className="disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300 disabled:opacity-50 flex-none w-8 h-8 cursor-pointer hover:bg-primary3 duration-300 border border-gray-300 rounded-full flex items-center justify-center"
        >
          <Image className="w-4" src={ImgMunis} alt="" width={20} height={20} />
        </button>
      </div>

      <div className="h3 font-[600]  text-primary1 max-w-[70px] text-nowrap w-full ltr:ml-auto rtl:mr-auto rtl:!text-right ">
        <SAR cnAll={"rtl:justify-end "} cn={"text-lg font-semibold "}  price={count * price} />
      </div>
    </div>
  );
}

export default BookingDetails;